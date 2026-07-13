// Client-side helper: smooth-scroll to the homepage appointment form.
//
// Why this exists (and why plain anchors kept failing): the form is the LAST
// section of the homepage, below ten dynamically-imported sections whose
// placeholder heights differ from their real heights, plus every section uses
// `content-visibility: auto` with an estimated intrinsic size. A one-shot
// scroll lands correctly and is then pushed off-target as those sections
// hydrate and the page reflows. So after scrolling we keep "settling" the
// position for a short window: once scrolling stops, any drift caused by
// late layout shifts is corrected with an instant re-pin — unless the user
// has started scrolling themselves.

export const APPOINTMENT_SECTION_ID = "appointment";

// Settling keeps going while corrections are still happening (each re-pin
// extends the deadline) and only ends after the position has been verified
// stable twice in a row — with a hard cap as the safety valve.
const QUIET_WINDOW_MS = 2000;
const HARD_CAP_MS = 8000;
const TICK_MS = 180;
const DRIFT_TOLERANCE_PX = 6;
const STABLE_TICKS_NEEDED = 2;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Pin the viewport to the target WITHOUT animation. globals.css sets
 * `html { scroll-behavior: smooth }`, which turns behavior:"auto" scrolls
 * into smooth animations too — so corrections must use "instant" (which
 * bypasses the CSS) or every re-pin becomes another long animation.
 */
function pinInstantly(target: HTMLElement, expectedTop: number) {
  const top = window.scrollY + target.getBoundingClientRect().top - expectedTop;
  window.scrollTo({ top, behavior: "instant" });
}

function expectedTopOf(target: HTMLElement): number {
  return parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
}

/** True on devices where focusing an input would pop up a keyboard. */
function isTouchOnly(): boolean {
  return !window.matchMedia("(hover: hover)").matches;
}

/**
 * Scroll to the appointment form and hold position while lazy sections above
 * it finish loading. Returns false if the form isn't on the current page
 * (caller should navigate to /#appointment instead).
 */
export function scrollToAppointment(): boolean {
  const target = document.getElementById(APPOINTMENT_SECTION_ID);
  if (!target) return false;

  const reduced = prefersReducedMotion();
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });

  const startedAt = Date.now();
  let deadline = Date.now() + QUIET_WINDOW_MS;
  let lastY = -1;
  let stableTicks = 0;
  let cancelled = false;
  let timer: number | undefined;

  // If the user takes over (wheel/touch/keys), stop correcting immediately.
  const cancel = () => {
    cancelled = true;
    if (timer !== undefined) window.clearTimeout(timer);
    removeListeners();
  };
  const userEvents: Array<keyof WindowEventMap> = ["wheel", "touchstart", "keydown"];
  const removeListeners = () =>
    userEvents.forEach((ev) => window.removeEventListener(ev, cancel));
  userEvents.forEach((ev) => window.addEventListener(ev, cancel, { passive: true }));

  const settle = () => {
    if (cancelled) return;

    const y = window.scrollY;
    const stillScrolling = y !== lastY;
    lastY = y;

    if (!stillScrolling) {
      // Scroll animation is done — correct any drift from late layout shifts.
      // scroll-margin-top on the section is what scrollIntoView aligns to, so
      // a settled position means rect.top ≈ that margin.
      const expectedTop = expectedTopOf(target);
      const drift = Math.abs(target.getBoundingClientRect().top - expectedTop);
      if (drift > DRIFT_TOLERANCE_PX) {
        pinInstantly(target, expectedTop);
        stableTicks = 0;
        // A correction means the page is still shifting — extend the watch.
        deadline = Date.now() + QUIET_WINDOW_MS;
      } else {
        stableTicks += 1;
        if (stableTicks >= STABLE_TICKS_NEEDED) {
          removeListeners();
          highlightArrival(target);
          return;
        }
      }
    } else {
      stableTicks = 0;
      // Actively scrolling (our smooth animation) — keep the deadline ahead.
      deadline = Math.max(deadline, Date.now() + QUIET_WINDOW_MS / 2);
    }

    if (Date.now() > deadline || Date.now() - startedAt > HARD_CAP_MS) {
      // Time's up — one last pin so we never abandon mid-page.
      const expectedTop = expectedTopOf(target);
      if (Math.abs(target.getBoundingClientRect().top - expectedTop) > DRIFT_TOLERANCE_PX) {
        pinInstantly(target, expectedTop);
      }
      removeListeners();
      highlightArrival(target);
      return;
    }

    timer = window.setTimeout(settle, TICK_MS);
  };
  timer = window.setTimeout(settle, reduced ? 60 : 300);

  return true;
}

/** Subtle arrival cue: brief ring on the form card + focus the first field. */
function highlightArrival(section: HTMLElement) {
  // Focus helps keyboard/desktop users; skipped on touch (would open keyboard).
  if (!isTouchOnly()) {
    const firstField = section.querySelector<HTMLInputElement>("#form-name");
    firstField?.focus({ preventScroll: true });
  }

  const card = section.querySelector<HTMLElement>("form")?.closest("div");
  const el = card || section;
  const prevTransition = el.style.transition;
  const prevShadow = el.style.boxShadow;
  el.style.transition = "box-shadow 300ms ease";
  el.style.boxShadow = "0 0 0 4px rgba(46, 108, 246, 0.28)";
  window.setTimeout(() => {
    el.style.boxShadow = prevShadow;
    window.setTimeout(() => {
      el.style.transition = prevTransition;
    }, 350);
  }, 1300);
}
