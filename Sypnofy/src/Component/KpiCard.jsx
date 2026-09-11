export default function KpiCard({ label, value, icon: Icon, tone = 'brand' }) {
  const tones = {
    brand: 'bg-brand-900 text-white',
    accent: 'bg-accent text-white',
    warn: 'bg-warn text-white',
  }

  return (
    <div className="rounded-xl bg-white shadow-card border border-slate-100 p-4 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${tones[tone]}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="text-xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  )
}