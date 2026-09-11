import { useEffect, useState } from 'react'
import { DoorOpen, LogOut, CheckCircle2, Circle, Loader2 } from 'lucide-react'
import StatusBadge from "../StatusBadge"; // apna actual relative path check kar lena
import {
  getArrivals,
  getDepartures,
  updateArrivalStep,
  updateDepartureStep,
  completeCheckIn,
  completeCheckOut,
} from "../../lib/checkin"; // apna actual relative path check kar lena

function StepPill({ label, done, onClick, busy }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
        done ? 'text-accent-dark' : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      {done ? <CheckCircle2 size={14} /> : <Circle size={14} />}
      {label}
    </button>
  )
}

export default function CheckIn() {
  const [tab, setTab] = useState('arrivals')
  const [arrivals, setArrivals] = useState([])
  const [departures, setDepartures] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState(null); // booking id currently being updated

  async function loadData() {
    setLoading(true)
    setError('')
    try {
      const [a, d] = await Promise.all([getArrivals(), getDepartures()])
      setArrivals(a)
      setDepartures(d)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  async function handleToggleArrivalStep(booking, stepKey) {
    setBusyId(booking.id)
    try {
      await updateArrivalStep(booking.id, stepKey, !booking.steps[stepKey])
      await loadData()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId(null)
    }
  }

  async function handleToggleDepartureStep(booking, stepKey) {
    setBusyId(booking.id)
    try {
      await updateDepartureStep(booking.id, stepKey, !booking.steps[stepKey])
      await loadData()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId(null)
    }
  }

  async function handleCompleteCheckIn(bookingId) {
    setBusyId(bookingId)
    try {
      await completeCheckIn(bookingId)
      await loadData()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId(null)
    }
  }

  async function handleCompleteCheckOut(bookingId) {
    setBusyId(bookingId)
    try {
      await completeCheckOut(bookingId)
      await loadData()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Check-in / Check-out</h1>
        <p className="text-sm text-slate-500">Today's arrivals and departures</p>
      </div>

      {error && (
        <div className="rounded-lg bg-danger-light text-danger text-sm px-4 py-3">
          {error}
        </div>
      )}

      <div className="inline-flex rounded-lg bg-white border border-slate-200 p-1">
        <button
          onClick={() => setTab('arrivals')}
          className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
            tab === 'arrivals' ? 'bg-brand-900 text-white' : 'text-slate-500 hover:text-brand-900'
          }`}
        >
          <DoorOpen size={16} />
          Arrivals ({arrivals.length})
        </button>
        <button
          onClick={() => setTab('departures')}
          className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
            tab === 'departures' ? 'bg-brand-900 text-white' : 'text-slate-500 hover:text-brand-900'
          }`}
        >
          <LogOut size={16} />
          Departures ({departures.length})
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Loader2 size={16} className="animate-spin" /> Loading…
        </div>
      ) : (
        <>
          {tab === 'arrivals' && (
            <div className="space-y-3">
              {arrivals.length === 0 && (
                <p className="text-sm text-slate-400">No arrivals right now.</p>
              )}
              {arrivals.map((a) => (
                <div key={a.id} className="bg-white rounded-xl shadow-card border border-slate-100 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-slate-800">{a.guest}</p>
                      <StatusBadge status={a.kyc} />
                    </div>
                    <p className="text-xs text-slate-400">{a.booking} &middot; Room {a.room} &middot; ETA {a.time}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <StepPill label="Pre-check-in" done={a.steps.preCheckin} busy={busyId === a.id} onClick={() => handleToggleArrivalStep(a, 'preCheckin')} />
                    <StepPill label="Consent" done={a.steps.consent} busy={busyId === a.id} onClick={() => handleToggleArrivalStep(a, 'consent')} />
                    <StepPill label="KYC" done={a.steps.kyc} busy={busyId === a.id} onClick={() => handleToggleArrivalStep(a, 'kyc')} />
                    <StepPill label="Room assigned" done={a.steps.roomAssigned} busy={busyId === a.id} onClick={() => handleToggleArrivalStep(a, 'roomAssigned')} />
                  </div>

                  <button
                    disabled={!Object.values(a.steps).every(Boolean) || busyId === a.id}
                    onClick={() => handleCompleteCheckIn(a.id)}
                    className="shrink-0 rounded-lg bg-brand-900 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {busyId === a.id ? 'Working…' : 'Complete check-in'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === 'departures' && (
            <div className="space-y-3">
              {departures.length === 0 && (
                <p className="text-sm text-slate-400">No departures right now.</p>
              )}
              {departures.map((d) => (
                <div key={d.id} className="bg-white rounded-xl shadow-card border border-slate-100 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-slate-800">{d.guest}</p>
                      {d.foreign && <StatusBadge status="Pending" />}
                    </div>
                    <p className="text-xs text-slate-400">{d.booking} &middot; Room {d.room} &middot; Checkout by {d.time}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <StepPill label="Checkout timestamp" done={d.steps.checkoutTime} busy={busyId === d.id} onClick={() => handleToggleDepartureStep(d, 'checkoutTime')} />
                    <StepPill label="Room status" done={d.steps.roomStatus} busy={busyId === d.id} onClick={() => handleToggleDepartureStep(d, 'roomStatus')} />
                    {d.foreign && (
                      <StepPill label="Foreign departure" done={d.steps.foreignDeparture} busy={busyId === d.id} onClick={() => handleToggleDepartureStep(d, 'foreignDeparture')} />
                    )}
                    <StepPill label="Compliance submitted" done={d.steps.compliance} busy={busyId === d.id} onClick={() => handleToggleDepartureStep(d, 'compliance')} />
                    <StepPill label="Receipt sent" done={d.steps.receipt} busy={busyId === d.id} onClick={() => handleToggleDepartureStep(d, 'receipt')} />
                  </div>

                  <button
                    disabled={!Object.values(d.steps).every(Boolean) || busyId === d.id}
                    onClick={() => handleCompleteCheckOut(d.id)}
                    className="shrink-0 rounded-lg bg-brand-900 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {busyId === d.id ? 'Working…' : 'Complete check-out'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
