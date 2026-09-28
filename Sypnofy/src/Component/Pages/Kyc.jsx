import { useEffect, useRef, useState } from 'react'
import { Search, Filter, ShieldCheck, Loader2, UserPlus } from 'lucide-react'
import StatusBadge from "../StatusBadge"; // apna actual relative path check kar lena
import KpiCard from "../KpiCard"; // apna actual relative path check kar lena
import { ClipboardCheck, XCircle, ScanFace } from 'lucide-react'
import { listKyc, startKyc, checkKycStatus } from "../../lib/kyc"; // apna actual relative path check kar lena
import VerifyCodeLookup from "../VerifyCodeLookup";

const STATUS_LABEL = {
  VERIFIED: 'Verified',
  PENDING: 'Pending',
  FAILED: 'Failed',
}

const STATUS_FILTERS = ['All', 'Verified', 'Pending', 'Failed']

function formatTime(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: 'numeric', minute: '2-digit' })
  } catch {
    return '—'
  }
}

export default function Kyc() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [guestName, setGuestName] = useState('')
  const [starting, setStarting] = useState(false)

  const pollingRef = useRef({}); // kycId -> interval id

  async function loadList() {
    setLoading(true)
    setError('')
    try {
      const data = await listKyc()
      setRecords(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function init() {
      setLoading(true)
      setError('')
      try {
        const data = await listKyc()
        setRecords(data)
        // Resume polling for any records still pending from before
        data
          .filter((r) => r.status === 'PENDING')
          .forEach((r) => pollStatus(r.id))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    init()
    return () => {
      Object.values(pollingRef.current).forEach(clearInterval)
    }
  }, [])

  function pollStatus(kycId) {
    if (pollingRef.current[kycId]) return // already polling this one

    pollingRef.current[kycId] = setInterval(async () => {
      try {
        const updated = await checkKycStatus(kycId)
        setRecords((prev) => prev.map((r) => (r.id === kycId ? updated : r)))

        if (updated.status !== 'PENDING') {
          clearInterval(pollingRef.current[kycId])
          delete pollingRef.current[kycId]
        }
      } catch (err) {
        clearInterval(pollingRef.current[kycId])
        delete pollingRef.current[kycId]
        setError(err.message)
      }
    }, 3000)
  }

 async function handleStartVerification(e) {
  e.preventDefault()
  if (!guestName.trim() || starting) return

  setStarting(true)
  setError('')
  try {
    const result = await startKyc({ guestName: guestName.trim() })
    setRecords((prev) => [result, ...prev])
    setGuestName('')

    if (result.authorizationUrl) {
      window.open(result.authorizationUrl, '_blank', 'noopener,noreferrer')
    }
    pollStatus(result.id)
  } catch (err) {
    setError(err.message)
  } finally {
    setStarting(false)
  }
}

  const verifiedCount = records.filter((r) => r.status === 'VERIFIED').length
  const pendingCount = records.filter((r) => r.status === 'PENDING').length
  const failedCount = records.filter((r) => r.status === 'FAILED').length

  const KPIS = [
    { label: 'Verified', value: verifiedCount, icon: ShieldCheck, tone: 'accent' },
    { label: 'Pending', value: pendingCount, icon: ClipboardCheck, tone: 'warn' },
    { label: 'Failed', value: failedCount, icon: XCircle, tone: 'brand' },
  ]

  const filtered = records.filter((r) => {
    const label = STATUS_LABEL[r.status] || r.status
    const matchesQuery = `${r.guestName} ${r.verifiedName ?? ''}`.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = statusFilter === 'All' || label === statusFilter
    return matchesQuery && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <ScanFace size={20} className="text-brand-900" />
          Guest KYC
        </h1>
        <p className="text-sm text-slate-500">Aadhaar verification via DigiLocker</p>
      </div>

      {error && (
        <div className="rounded-lg bg-danger-light text-danger text-sm px-4 py-3">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {KPIS.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>
      <VerifyCodeLookup />

      {/* Start a new verification */}
      <form onSubmit={handleStartVerification} className="bg-white rounded-xl shadow-card border border-slate-100 p-4 flex flex-col sm:flex-row gap-3 sm:items-end">
        <div className="flex-1">
          <label className="mb-1.5 block text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Guest name
          </label>
          <input
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            type="text"
            placeholder="e.g. Aarav Sharma"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500"
          />
        </div>
        <button
          type="submit"
          disabled={!guestName.trim() || starting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-brand-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
        >
          {starting ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
          {starting ? 'Starting…' : 'Start Aadhaar verification'}
        </button>
      </form>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2.5 sm:flex-1 sm:max-w-sm">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search guest..."
            className="outline-none text-sm w-full placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-3 px-3 sm:mx-0 sm:px-0">
          <Filter size={16} className="text-slate-400 shrink-0" />
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors shrink-0 ${
                statusFilter === s ? 'bg-brand-900 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:border-brand-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Loader2 size={16} className="animate-spin" /> Loading…
        </div>
      ) : (
        <>
          {/* Mobile: stacked cards */}
          <div className="space-y-3 md:hidden">
            {filtered.map((r) => (
              <div key={r.id} className="bg-white rounded-xl shadow-card border border-slate-100 p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-sm">{r.guestName}</p>
                    <p className="text-xs text-slate-400">KYC-{r.id} &middot; Aadhaar</p>
                  </div>
                  <StatusBadge status={STATUS_LABEL[r.status] || r.status} />
                </div>
                {r.status === 'VERIFIED' && (
                  <p className="text-xs text-slate-500">
                    {r.verifiedName} &middot; {r.maskedIdNumber} &middot; {formatTime(r.verifiedAt)}
                  </p>
                )}
                {r.status === 'FAILED' && (
                  <p className="text-xs text-danger">{r.failureReason}</p>
                )}
                {r.status === 'PENDING' && (
                  <p className="text-xs text-slate-400">Waiting for guest to complete DigiLocker consent…</p>
                )}
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <th className="px-4 py-3">Guest</th>
                    <th className="px-4 py-3">Verified name</th>
                    <th className="px-4 py-3">Aadhaar (masked)</th>
                    <th className="px-4 py-3">Started</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-brand-50/40">
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-700">{r.guestName}</p>
                        <p className="text-xs text-slate-400">KYC-{r.id}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{r.verifiedName || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{r.maskedIdNumber || '—'}</td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatTime(r.createdAt)}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={STATUS_LABEL[r.status] || r.status} />
                        {r.status === 'FAILED' && r.failureReason && (
                          <p className="text-xs text-danger mt-1">{r.failureReason}</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filtered.length === 0 && (
            <div className="text-center text-sm text-slate-400 py-12">No guests match your filters.</div>
          )}
        </>
      )}
    </div>
  )
}
