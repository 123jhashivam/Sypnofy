import { useState } from 'react'
import { Search, Filter, ShieldAlert, Download } from 'lucide-react'
import StatusBadge from "../StatusBadge";

const EVENTS = [
  { id: 'EVT-98213', actor: 'shivam@staykyc.com', action: 'KYC verification approved', resource: 'GST-5521 / BK-10231', result: 'Success', ip: '103.21.244.10', time: '12 Aug, 9:16 AM' },
  { id: 'EVT-98214', actor: 'system', action: 'Aadhaar offline e-KYC callback received', resource: 'GST-5522', result: 'Success', ip: '—', time: '12 Aug, 8:51 AM' },
  { id: 'EVT-98215', actor: 'priya@staykyc.com', action: 'Manual review — flagged duplicate document', resource: 'GST-5524 / BK-10235', result: 'Flagged', ip: '103.21.244.18', time: '12 Aug, 10:04 AM' },
  { id: 'EVT-98216', actor: 'shivam@staykyc.com', action: 'Guest consent withdrawn', resource: 'GST-5525', result: 'Success', ip: '103.21.244.10', time: '10 Aug, 6:41 PM' },
  { id: 'EVT-98217', actor: 'admin@staykyc.com', action: 'User role changed to Property Admin', resource: 'USR-0042', result: 'Success', ip: '49.36.88.201', time: '10 Aug, 3:12 PM' },
  { id: 'EVT-98218', actor: 'system', action: 'Foreign guest Form III submission failed', resource: 'GST-5530', result: 'Failed', ip: '—', time: '09 Aug, 11:58 PM' },
]

const RESULT_FILTERS = ['All', 'Success', 'Flagged', 'Failed']

export default function AuditLogs() {
  const [query, setQuery] = useState('')
  const [resultFilter, setResultFilter] = useState('All')

  const filtered = EVENTS.filter((e) => {
    const matchesQuery = `${e.actor} ${e.action} ${e.resource}`.toLowerCase().includes(query.toLowerCase())
    const matchesResult = resultFilter === 'All' || e.result === resultFilter
    return matchesQuery && matchesResult
  })

  const resultBadge = (result) => (result === 'Success' ? 'Verified' : result === 'Flagged' ? 'Manual review' : 'Failed')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldAlert size={20} className="text-brand-900" />
            Audit Logs
          </h1>
          <p className="text-sm text-slate-500">Tamper-evident record of every sensitive action on this property</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-300">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2.5 sm:flex-1 sm:max-w-sm">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search actor, action, resource..."
            className="outline-none text-sm w-full placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-3 px-3 sm:mx-0 sm:px-0">
          <Filter size={16} className="text-slate-400 shrink-0" />
          {RESULT_FILTERS.map((r) => (
            <button
              key={r}
              onClick={() => setResultFilter(r)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors shrink-0 ${
                resultFilter === r ? 'bg-brand-900 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:border-brand-300'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="space-y-3 md:hidden">
        {filtered.map((e) => (
          <div key={e.id} className="bg-white rounded-xl shadow-card border border-slate-100 p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <p className="font-medium text-slate-800 text-sm">{e.action}</p>
                <p className="text-xs text-slate-400">{e.id}</p>
              </div>
              <StatusBadge status={resultBadge(e.result)} />
            </div>
            <p className="text-xs text-slate-500">Actor: {e.actor}</p>
            <p className="text-xs text-slate-500">Resource: {e.resource}</p>
            <p className="text-xs text-slate-400 mt-1">{e.time}</p>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Actor</th>
                <th className="px-4 py-3">Resource</th>
                <th className="px-4 py-3">IP address</th>
                <th className="px-4 py-3">Result</th>
                <th className="px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-brand-50/40">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-700">{e.action}</p>
                    <p className="text-xs text-slate-400">{e.id}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{e.actor}</td>
                  <td className="px-4 py-3 text-slate-600">{e.resource}</td>
                  <td className="px-4 py-3 text-slate-500">{e.ip}</td>
                  <td className="px-4 py-3"><StatusBadge status={resultBadge(e.result)} /></td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{e.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-sm text-slate-400 py-12">No events match your filters.</div>
      )}
    </div>
  )
}