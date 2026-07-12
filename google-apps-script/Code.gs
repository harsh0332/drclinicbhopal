/**
 * ============================================================================
 * BABY STEPS – Newborn & Child Clinic — Google Sheets Backend (Apps Script)
 * ============================================================================
 *
 * This script turns one private Google Sheet into a tiny JSON API used by the
 * clinic website's admin panel. It is protected by a shared secret.
 *
 * ----------------------------------------------------------------------------
 * DEPLOY INSTRUCTIONS (one-time, ~5 minutes)
 * ----------------------------------------------------------------------------
 * 1.  Go to https://sheets.new and create a new Google Sheet.
 *     Name it e.g. "Baby Steps Clinic – Data". Keep it PRIVATE (do not share).
 *
 * 2.  In the Sheet: Extensions → Apps Script. Delete any code in the editor
 *     and paste this ENTIRE file. Save (Cmd/Ctrl+S), name the project
 *     e.g. "Baby Steps Backend".
 *
 * 3.  Set the secret:
 *     - In the Apps Script editor, open Project Settings (gear icon, left bar).
 *     - Scroll to "Script properties" → "Add script property".
 *     - Property name:  SECRET
 *     - Value: the same random string you put in SHEETS_SECRET in the
 *       website's .env.local file. (Long random string, not a word.)
 *
 * 4.  Create the tabs: back in the editor, select the function "setup" in the
 *     toolbar dropdown and click ▶ Run. Approve the permission prompts
 *     (it only touches this spreadsheet). Check the Sheet — you should now
 *     see tabs: Appointments, WalkIns, Children, Vaccinations with headers.
 *
 * 5.  Deploy: Deploy (top-right) → New deployment → gear icon → "Web app".
 *     - Description: v1
 *     - Execute as: **Me** (your account)
 *     - Who has access: **Anyone**   ← required so the website server can
 *       call it. Data stays safe: every request must include the SECRET,
 *       and the Sheet itself remains private.
 *     - Click Deploy, approve access, and COPY the "Web app URL"
 *       (ends in /exec). Paste it as SHEETS_WEBAPP_URL in .env.local.
 *
 * 6.  Test in a browser (replace YOUR_SECRET):
 *       <web app url>?secret=YOUR_SECRET&action=ping
 *     You should see: {"ok":true,"pong":true}
 *
 * NOTE: if you later EDIT this script you must publish again via
 * Deploy → Manage deployments → (pencil) → Version: New version → Deploy.
 * The URL stays the same.
 * ============================================================================
 */

// Tab names and their header rows. setup() creates these; the API only
// accepts tabs listed here (whitelist).
var TABS = {
  Appointments: [
    "id",
    "created_at",
    "name",
    "phone",
    "child_age",
    "preferred_time",
    "status",
    "notes"
  ],
  WalkIns: [
    "id",
    "created_at",
    "name",
    "phone",
    "child_age",
    "reason",
    "doctor",
    "status",
    "notes"
  ],
  Children: [
    "id",
    "created_at",
    "child_name",
    "dob",
    "gender",
    "parent_name",
    "phone",
    "notes"
  ],
  Vaccinations: [
    "id",
    "created_at",
    "child_id",
    "child_name",
    "vaccine",
    "due_date",
    "given_date",
    "status",
    "notes"
  ]
};

/**
 * One-off setup: creates the 4 tabs with correct headers if they don't exist.
 * Safe to re-run — never deletes data, only adds missing tabs/headers.
 * Run manually from the Apps Script editor (select "setup" → Run).
 */
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  Object.keys(TABS).forEach(function (tabName) {
    var headers = TABS[tabName];
    var sheet = ss.getSheetByName(tabName);

    if (!sheet) {
      sheet = ss.insertSheet(tabName);
    }

    // Write headers into row 1 if the first cell is empty (new/blank tab).
    var firstCell = sheet.getRange(1, 1).getValue();
    if (firstCell === "" || firstCell === null) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    // Cosmetics: bold + frozen header row.
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  });

  // Remove the default empty "Sheet1" if it's still around and unused.
  var defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet && defaultSheet.getLastRow() === 0 && ss.getSheets().length > Object.keys(TABS).length) {
    ss.deleteSheet(defaultSheet);
  }

  Logger.log("Setup complete. Tabs ready: " + Object.keys(TABS).join(", "));
}

/** GET entry point — supports ?action=ping (health check) and ?action=list. */
function doGet(e) {
  return handleRequest(e, null);
}

/** POST entry point — main API. Body is JSON. */
function doPost(e) {
  var body = null;
  try {
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }
  } catch (err) {
    return jsonResponse({ ok: false, error: "Invalid JSON body" });
  }
  return handleRequest(e, body);
}

/**
 * Shared request handler. Params can come from the POST JSON body or,
 * for GET, from query string parameters.
 */
function handleRequest(e, body) {
  var params = body || (e && e.parameter) || {};

  // --- 1. Secret check (reject everything without the correct secret) ---
  var expected = PropertiesService.getScriptProperties().getProperty("SECRET");
  if (!expected) {
    return jsonResponse({ ok: false, error: "Server not configured: set SECRET in Script properties" });
  }
  if (!params.secret || String(params.secret) !== String(expected)) {
    return jsonResponse({ ok: false, error: "Unauthorized" });
  }

  var action = params.action;

  try {
    if (action === "ping") {
      return jsonResponse({ ok: true, pong: true });
    }
    if (action === "list") {
      return jsonResponse(listRows(params.tab));
    }
    if (action === "append") {
      return jsonResponse(appendRow(params.tab, params.row));
    }
    if (action === "update") {
      return jsonResponse(updateRow(params.tab, params.id, params.patch));
    }
    return jsonResponse({ ok: false, error: "Unknown action: " + action });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

/** Returns the sheet for a whitelisted tab or throws. */
function getSheetOrThrow(tabName) {
  if (!tabName || !TABS.hasOwnProperty(tabName)) {
    throw new Error("Unknown tab: " + tabName + ". Allowed: " + Object.keys(TABS).join(", "));
  }
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tabName);
  if (!sheet) {
    throw new Error("Tab '" + tabName + "' not found. Run setup() first.");
  }
  return sheet;
}

/** action=list — read all data rows of a tab as objects keyed by header. */
function listRows(tabName) {
  var sheet = getSheetOrThrow(tabName);
  var headers = TABS[tabName];
  var lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return { ok: true, rows: [] };
  }

  var values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  var rows = values.map(function (rowValues) {
    var obj = {};
    headers.forEach(function (header, i) {
      var v = rowValues[i];
      // Normalize Dates to ISO strings so JSON output is predictable.
      obj[header] = v instanceof Date ? v.toISOString() : v;
    });
    return obj;
  });

  return { ok: true, rows: rows };
}

/**
 * action=append — add one row. `row` is an object keyed by header names.
 * `id` and `created_at` are generated server-side and returned.
 */
function appendRow(tabName, row) {
  if (!row || typeof row !== "object") {
    throw new Error("Missing 'row' object");
  }
  var sheet = getSheetOrThrow(tabName);
  var headers = TABS[tabName];

  var id = Utilities.getUuid();
  var createdAt = new Date().toISOString();

  var newRow = headers.map(function (header) {
    if (header === "id") return id;
    if (header === "created_at") return row.created_at || createdAt;
    return row.hasOwnProperty(header) ? row[header] : "";
  });

  sheet.appendRow(newRow);
  return { ok: true, id: id };
}

/**
 * action=update — patch an existing row found by its `id`.
 * `patch` is an object with the columns to change (id/created_at immutable).
 */
function updateRow(tabName, id, patch) {
  if (!id) throw new Error("Missing 'id'");
  if (!patch || typeof patch !== "object") throw new Error("Missing 'patch' object");

  var sheet = getSheetOrThrow(tabName);
  var headers = TABS[tabName];
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) throw new Error("Row not found: " + id);

  var idColumn = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (var i = 0; i < idColumn.length; i++) {
    if (String(idColumn[i][0]) === String(id)) {
      var rowIndex = i + 2; // account for header row + 0-index
      headers.forEach(function (header, col) {
        if (header === "id" || header === "created_at") return;
        if (patch.hasOwnProperty(header)) {
          sheet.getRange(rowIndex, col + 1).setValue(patch[header]);
        }
      });
      return { ok: true, id: id };
    }
  }
  throw new Error("Row not found: " + id);
}

/** Wrap any object as a JSON HTTP response. */
function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
