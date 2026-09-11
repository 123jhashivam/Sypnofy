export default function PlaceholderPage({ title }) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-800">{title}</h1>
      <div className="rounded-xl bg-white shadow-card border border-slate-100 p-10 flex flex-col items-center justify-center text-center">
        <p className="text-slate-500 text-sm max-w-md">
          {title} module is under construction. Build this screen next — the
          layout, sidebar and theme are already wired up.
        </p>
      </div>
    </div>
  )
}