import { useState, useEffect } from 'react'
import { Download, ClipboardList, TrendingUp, Users, ShieldCheck, Loader2 } from 'lucide-react'
import KpiCard from '../KpiCard'
import { getReportSummary } from '../../api/reportApi'

const REPORT_GROUPS = [
  {
    label: 'Business KPIs',
    icon: TrendingUp,
    reports: [
      { name: 'Revenue by booking source', desc: 'Direct vs OTA split, commission impact' },
      { name: 'Occupancy & ADR trend', desc: 'Daily occupancy and average daily rate' },
      { name: 'Property-wise performance', desc: 'Bookings, revenue and KYC rate per property' },
    ],
  },
  {
    label: 'Product KPIs',
    icon: Users,
    reports: [
      { name: 'KYC completion funnel', desc: 'Link sent → opened → verified drop-off' },
      { name: 'Check-in time to completion', desc: 'Average time from arrival to room handover' },
      { name: 'Guest satisfaction (post-stay)', desc: 'Feedback link response summary' },
    ],
  },
  {
    label: 'Compliance KPIs',
    icon: ShieldCheck,
    reports: [
      { name: 'Foreign guest Form III timeliness', desc: '24-hour submission SLA adherence' },
      { name: 'Manual review turnaround', desc: 'Time from flag to reviewer decision' },
      { name: 'Consent & data retention audit', desc: 'DPDP-aligned consent coverage report' },
    ],
  },
]

export default function Reports() {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getReportSummary()
      .then((res) => setSummary(res.data))
      .catch((err) => {
        console.error(err)
        setError('Could not load live summary. Is the backend running?')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <ClipboardList size={20} className="text-brand-900" />
          Reports
        </h1>
        <p className="text-sm text-slate-500">Business, product and compliance reporting for this organization</p>
      </div>

      {/* Live summary — real counts from the database */}
      {loading && (
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400 py-8">
          <Loader2 size={18} className="animate-spin" />
          Loading summary...
        </div>
      )}

      {!loading && error && (
        <div className="text-center text-sm text-danger bg-danger-light rounded-xl py-6 px-4">{error}</div>
      )}

      {!loading && summary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <KpiCard label="Properties" value={summary.totalProperties} icon={TrendingUp} tone="brand" />
          <KpiCard label="Total bookings" value={summary.totalBookings} icon={ClipboardList} tone="brand" />
          <KpiCard label="Verified guests" value={summary.verifiedGuests} icon={ShieldCheck} tone="accent" />
          <KpiCard label="Foreign guests" value={summary.foreignGuests} icon={Users} tone="warn" />
        </div>
      )}

      {/* Static report catalog — export actions to be wired up later */}
      <div className="space-y-6">
        {REPORT_GROUPS.map((group) => (
          <div key={group.label} className="bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-brand-50">
              <group.icon size={16} className="text-brand-900" />
              <h2 className="font-semibold text-slate-800 text-sm">{group.label}</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {group.reports.map((r) => (
                <div key={r.name} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <p className="font-medium text-slate-700 text-sm">{r.name}</p>
                    <p className="text-xs text-slate-400">{r.desc}</p>
                  </div>
                  <button className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-accent hover:text-accent-dark hover:bg-accent-light transition-colors">
                    <Download size={13} />
                    Export
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}