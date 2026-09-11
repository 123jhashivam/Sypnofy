import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Globe2, Send, CheckCircle2, XCircle, LogOut, AlertTriangle, Loader2, Plus } from 'lucide-react'
import KpiCard from "../KpiCard";
import StatusBadge from "../StatusBadge";
import { getForeignGuests } from "../../api/guestApi";

export default function ForeignGuests() {
  const [guests, setGuests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getForeignGuests()
      .then((res) => setGuests(res.data))
      .catch((err) => {
        console.error(err)
        setError('Could not load foreign guests. Is the backend running?')
      })
      .finally(() => setLoading(false))
  }, [])

  // KPIs computed live from real data instead of hardcoded numbers
  const kpis = [
    { label: 'Foreign guests', value: guests.length, icon: Globe2, tone: 'brand' },
    { label: 'Pending submissions', value: guests.filter((g) => g.complianceReportStatus === 'Pending').length, icon: Send, tone: 'warn' },
    { label: 'Submitted', value: guests.filter((g) => g.complianceReportStatus === 'Submitted').length, icon: CheckCircle2, tone: 'accent' },
    { label: 'Submission failures', value: guests.filter((g) => g.complianceReportStatus === 'Failed').length, icon: XCircle, tone: 'brand' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Globe2 size={20} className="text-brand-900" />
            Foreign Guest Compliance
          </h1>
          <p className="text-sm text-slate-500">
            Form III submission — 24-hour arrival/departure reporting per the Immigration &amp; Foreigners Rules, 2025
          </p>
        </div>
        <Link
           to="/dashboard/foreign-booking"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-brand-800 transition-colors shrink-0"
        >
          <Plus size={16} />
          New foreign booking
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400 py-12">
          <Loader2 size={18} className="animate-spin" />
          Loading foreign guests...
        </div>
      )}

      {!loading && error && (
        <div className="text-center text-sm text-danger bg-danger-light rounded-xl py-8 px-4">{error}</div>
      )}

      {!loading && !error && (
        <>
          {/* Mobile: stacked cards */}
          <div className="space-y-3 md:hidden">
            <h2 className="font-semibold text-slate-800 text-sm px-1">Guest status &amp; submission history</h2>
            {guests.map((g) => (
              <div key={g.id} className="bg-white rounded-xl shadow-card border border-slate-100 p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-700 text-sm">{g.name}</p>
                    <p className="text-xs text-slate-400">{g.nationality}</p>
                  </div>
                  <StatusBadge status={g.complianceReportStatus || 'Pending'} />
                </div>
                {g.visaValidFrom && g.visaValidUntil && (
                  <p className="text-xs text-slate-500">{g.visaValidFrom} → {g.visaValidUntil}</p>
                )}
                {g.complianceReportStatus !== 'Submitted' && (
                  <button className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-dark hover:underline">
                    <Send size={13} />
                    Submit now
                  </button>
                )}
              </div>
            ))}
            {guests.length === 0 && (
              <div className="text-center text-sm text-slate-400 py-8">No foreign guests yet.</div>
            )}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800 text-sm">Guest status &amp; submission history</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <th className="px-4 py-3">Guest</th>
                    <th className="px-4 py-3">Nationality</th>
                    <th className="px-4 py-3">Passport</th>
                    <th className="px-4 py-3">Visa validity</th>
                    <th className="px-4 py-3">Report</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {guests.map((g) => (
                    <tr key={g.id} className="hover:bg-brand-50/40">
                      <td className="px-4 py-3 font-medium text-slate-700">{g.name}</td>
                      <td className="px-4 py-3 text-slate-600">{g.nationality || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{g.passportNumber || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {g.visaValidFrom && g.visaValidUntil ? `${g.visaValidFrom} → ${g.visaValidUntil}` : '—'}
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={g.complianceReportStatus || 'Pending'} /></td>
                      <td className="px-4 py-3">
                        {g.complianceReportStatus !== 'Submitted' && (
                          <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-dark hover:underline">
                            <Send size={13} />
                            Submit now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {guests.length === 0 && (
                <div className="text-center text-sm text-slate-400 py-8">No foreign guests yet.</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}