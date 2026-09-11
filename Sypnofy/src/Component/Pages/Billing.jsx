import { Wallet, Download, CreditCard } from 'lucide-react'
import StatusBadge from "../StatusBadge";

const USAGE = [
  { label: 'KYC verifications', used: 1284, included: 1500, unit: 'verifications' },
  { label: 'Foreign guest Form III submissions', used: 96, included: 200, unit: 'submissions' },
  { label: 'WhatsApp / SMS notifications', used: 3620, included: 5000, unit: 'messages' },
]

const INVOICES = [
  { id: 'INV-2026-07', period: 'Jul 2026', amount: '₹24,500', status: 'Paid' },
  { id: 'INV-2026-06', period: 'Jun 2026', amount: '₹22,100', status: 'Paid' },
  { id: 'INV-2026-05', period: 'May 2026', amount: '₹19,800', status: 'Paid' },
  { id: 'INV-2026-08', period: 'Aug 2026 (current)', amount: '₹—', status: 'Pending' },
]

function UsageBar({ used, included, unit, label }) {
  const pct = Math.min(100, Math.round((used / included) * 100))
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 gap-2">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-xs text-slate-400 shrink-0">{used.toLocaleString()} / {included.toLocaleString()} {unit}</p>
      </div>
      <div className="h-2 rounded-full bg-brand-50 overflow-hidden">
        <div className={`h-full rounded-full ${pct > 90 ? 'bg-warn' : 'bg-accent'}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function Billing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Wallet size={20} className="text-brand-900" />
          Billing
        </h1>
        <p className="text-sm text-slate-500">Usage-based pricing — not tied to a single identity provider</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-card border border-slate-100 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-1 gap-2">
            <h2 className="font-semibold text-slate-800">Growth plan</h2>
            <span className="text-xs font-semibold text-accent-dark bg-accent-light rounded-full px-2.5 py-1 shrink-0">Active</span>
          </div>
          <p className="text-sm text-slate-500 mb-4">₹15,000 base / month + usage above included quota</p>

          <div className="space-y-4">
            {USAGE.map((u) => (
              <UsageBar key={u.label} {...u} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card border border-slate-100 p-4 sm:p-5">
          <h2 className="font-semibold text-slate-800 mb-4">Payment method</h2>
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-3">
            <CreditCard size={20} className="text-brand-900 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-700">HDFC Bank •••• 4821</p>
              <p className="text-xs text-slate-400">Expires 09/28</p>
            </div>
          </div>
          <button className="mt-3 text-xs font-semibold text-brand-800 hover:underline">Update payment method</button>
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        <h2 className="font-semibold text-slate-800 text-sm px-1">Invoices</h2>
        {INVOICES.map((inv) => (
          <div key={inv.id} className="bg-white rounded-xl shadow-card border border-slate-100 p-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-medium text-slate-700 text-sm">{inv.id}</p>
              <p className="text-xs text-slate-400">{inv.period} &middot; {inv.amount}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <StatusBadge status={inv.status} />
              {inv.status === 'Paid' && (
                <button className="text-brand-800 hover:text-brand-900">
                  <Download size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-brand-50">
          <h2 className="font-semibold text-slate-800 text-sm">Invoices</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3">Invoice</th>
                <th className="px-5 py-3">Period</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-brand-50/40">
                  <td className="px-5 py-3 font-medium text-slate-700">{inv.id}</td>
                  <td className="px-5 py-3 text-slate-600">{inv.period}</td>
                  <td className="px-5 py-3 text-slate-600">{inv.amount}</td>
                  <td className="px-5 py-3"><StatusBadge status={inv.status} /></td>
                  <td className="px-5 py-3">
                    {inv.status === 'Paid' && (
                      <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-800 hover:underline">
                        <Download size={13} />
                        Download
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}