// Skeleton shown while a panel page fetches from the Sheets backend (1–2s).
export default function AdminPanelLoading() {
  return (
    <div className="max-w-6xl animate-pulse" aria-busy="true" aria-label="Loading">
      <div className="mb-6">
        <div className="h-5 w-40 bg-slate-200 rounded" />
        <div className="h-3.5 w-64 bg-slate-200/70 rounded mt-2.5" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-24 bg-slate-200 rounded" />
              <div className="w-9 h-9 rounded-lg bg-slate-100" />
            </div>
            <div className="h-8 w-14 bg-slate-200 rounded" />
            <div className="h-3 w-32 bg-slate-100 rounded" />
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <div className="h-4 w-44 bg-slate-200 rounded" />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="px-5 py-4 border-b border-slate-100 last:border-0 flex items-center gap-3">
            <div className="flex-1">
              <div className="h-3.5 w-36 bg-slate-200 rounded" />
              <div className="h-3 w-48 bg-slate-100 rounded mt-2" />
            </div>
            <div className="h-5 w-16 bg-slate-100 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
