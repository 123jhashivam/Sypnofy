const STYLES = {
  confirmed: 'bg-accent-light text-accent-dark',
  'checked-in': 'bg-brand-100 text-brand-800',
  'checked-out': 'bg-slate-100 text-slate-500',
  cancelled: 'bg-danger-light text-danger',
  verified: 'bg-accent-light text-accent-dark',
  pending: 'bg-warn-light text-amber-700',
  'manual review': 'bg-warn-light text-amber-700',
  failed: 'bg-danger-light text-danger',
  paid: 'bg-accent-light text-accent-dark',
  unpaid: 'bg-danger-light text-danger',
  partial: 'bg-warn-light text-amber-700',
  active: 'bg-accent-light text-accent-dark',
  inactive: 'bg-slate-100 text-slate-500',
}

export default function StatusBadge({ status }) {
  const key = status.toLowerCase()
  const style = STYLES[key] || 'bg-slate-100 text-slate-500'
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${style}`}>
      {status}
    </span>
  )
}