import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Loader2, X } from 'lucide-react'
import StatusBadge from '../StatusBadge'
import { getAllBookings, createBooking } from '../../api/bookingApi'

const STATUS_FILTERS = ['All', 'Confirmed', 'Checked-in', 'Checked-out', 'Cancelled']

const EMPTY_FORM = {
  guestName: '',
  room: '',
  guestsCount: 1,
  checkIn: '',
  checkOut: '',
  source: 'Direct',
  bookingStatus: 'Confirmed',
  kycStatus: 'Pending',
  paymentStatus: 'Unpaid',
}

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)

  const loadBookings = () => {
    setLoading(true)
    getAllBookings()
      .then((res) => {
        setBookings(res.data)
        setError(null)
      })
      .catch((err) => {
        console.error(err)
        setError('Could not load bookings. Is the backend running?')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadBookings()
  }, [])

  const filtered = bookings.filter((b) => {
    const matchesQuery = `${b.guestName} ${b.room}`.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = statusFilter === 'All' || b.bookingStatus === statusFilter
    return matchesQuery && matchesStatus
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFormError(null)
    try {
      await createBooking({
        ...form,
        guestsCount: form.guestsCount ? Number(form.guestsCount) : 1,
      })
      setShowModal(false)
      setForm(EMPTY_FORM)
      loadBookings()
    } catch (err) {
      console.error(err)
      setFormError(err.response?.data?.message || 'Could not create booking. Please check the details and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Bookings</h1>
          <p className="text-sm text-slate-500">{bookings.length} bookings across all rooms</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-800 transition-colors"
        >
          <Plus size={16} />
          New booking
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2.5 sm:flex-1 sm:max-w-sm">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search guest, room..."
            className="outline-none text-sm w-full placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter size={16} className="text-slate-400 shrink-0" />
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors shrink-0 ${
                statusFilter === s
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400 py-12">
          <Loader2 size={18} className="animate-spin" />
          Loading bookings...
        </div>
      )}

      {!loading && error && (
        <div className="text-center text-sm text-red-600 bg-red-50 rounded-xl py-8 px-4">{error}</div>
      )}

      {!loading && !error && (
        <div className="bg-white rounded-xl shadow border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th className="px-4 py-3">Guest</th>
                  <th className="px-4 py-3">Room</th>
                  <th className="px-4 py-3">Stay</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">KYC</th>
                  <th className="px-4 py-3">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-700">{b.guestName}</p>
                      <p className="text-xs text-slate-400">{b.guestsCount} guest{b.guestsCount > 1 ? 's' : ''}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{b.room}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{b.checkIn} → {b.checkOut}</td>
                    <td className="px-4 py-3 text-slate-600">{b.source}</td>
                    <td className="px-4 py-3"><StatusBadge status={b.bookingStatus} /></td>
                    <td className="px-4 py-3"><StatusBadge status={b.kycStatus} /></td>
                    <td className="px-4 py-3"><StatusBadge status={b.paymentStatus} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center text-sm text-slate-400 py-8">No bookings match your filters.</div>
            )}
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800 text-lg">New booking</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Guest name <span className="text-red-500">*</span>
                </label>
                <input
                  name="guestName" required value={form.guestName} onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Room <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="room" required value={form.room} onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Guests</label>
                  <input
                    name="guestsCount" type="number" min="1" value={form.guestsCount} onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Check-in <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="checkIn" type="date" required value={form.checkIn} onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Check-out <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="checkOut" type="date" required value={form.checkOut} onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Source</label>
                <select
                  name="source" value={form.source} onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                >
                  <option>Direct</option>
                  <option>Booking.com</option>
                  <option>MakeMyTrip</option>
                  <option>Agoda</option>
                  <option>Walk-in</option>
                </select>
              </div>

              {formError && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{formError}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit" disabled={submitting}
                  className="flex-1 rounded-lg bg-slate-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-800 disabled:opacity-60 transition-colors"
                >
                  {submitting ? 'Saving...' : 'Create booking'}
                </button>
                <button
                  type="button" onClick={() => setShowModal(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-slate-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}