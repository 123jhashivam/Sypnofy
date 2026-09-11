import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, MapPin, Clock, Building2, Loader2, X } from 'lucide-react'
import StatusBadge from "../StatusBadge";
import { getAllProperties, createProperty } from '../../api/propertyApi'

const EMPTY_FORM = {
  name: '',
  city: '',
  brand: '',
  gstin: '',
  rooms: '',
  checkInTime: '12:00',
  checkOutTime: '11:00',
}

export default function Properties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)

  const loadProperties = () => {
    setLoading(true)
    getAllProperties()
      .then((res) => {
        setProperties(res.data)
        setError(null)
      })
      .catch((err) => {
        console.error(err)
        setError('Could not load properties. Is the backend running?')
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    loadProperties()
  }, [])

  const filtered = properties.filter((p) =>
    `${p.name} ${p.city} ${p.brand}`.toLowerCase().includes(query.toLowerCase())
  )

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFormError(null)
    try {
      await createProperty({
        ...form,
        rooms: form.rooms ? Number(form.rooms) : 0,
      })
      setShowModal(false)
      setForm(EMPTY_FORM)
      loadProperties()
    } catch (err) {
      console.error(err)
      setFormError(err.response?.data?.message || 'Could not create property. Please check the details and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Properties</h1>
          <p className="text-sm text-slate-500">{properties.length} properties under this organization</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-brand-800 transition-colors"
        >
          <Plus size={16} />
          Add property
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2.5 max-w-sm">
        <Search size={16} className="text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search property, city, brand..."
          className="outline-none text-sm w-full placeholder:text-slate-400"
        />
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400 py-12">
          <Loader2 size={18} className="animate-spin" />
          Loading properties...
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="text-center text-sm text-danger bg-danger-light rounded-xl py-8 px-4">{error}</div>
      )}

      {/* Property cards */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <Link
                to={`/dashboard/properties/${p.id}`}
              key={p.id}
              className="bg-white rounded-xl shadow-card border border-slate-100 p-5 hover:border-accent/40 transition-colors cursor-pointer block"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-brand-100 text-brand-900 flex items-center justify-center">
                  <Building2 size={18} />
                </div>
                <StatusBadge status={p.status} />
              </div>

              <h3 className="font-semibold text-slate-800">{p.name}</h3>
              <p className="text-xs text-slate-400 mb-3">{p.brand}</p>

              <div className="space-y-1.5 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-slate-400 shrink-0" />
                  <span>{p.city}, {p.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-slate-400 shrink-0" />
                  <span>Check-in {p.checkInTime} &middot; Check-out {p.checkOutTime}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">GSTIN: {p.gstin}</span>
                <span className="font-semibold text-brand-900">{p.rooms} rooms</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center text-sm text-slate-400 py-12">No properties match your search.</div>
      )}

      {/* Add Property modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl shadow-card w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800 text-lg">Add property</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Property name <span className="text-danger">*</span>
                </label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="e.g. Taj Residency"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  name="city"
                  required
                  value={form.city}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="e.g. Jaipur"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Brand</label>
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="e.g. Taj Hotels"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">GSTIN</label>
                  <input
                    name="gstin"
                    value={form.gstin}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Rooms</label>
                  <input
                    name="rooms"
                    type="number"
                    min="0"
                    value={form.rooms}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Check-in</label>
                  <input
                    name="checkInTime"
                    type="time"
                    value={form.checkInTime}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Check-out</label>
                  <input
                    name="checkOutTime"
                    type="time"
                    value={form.checkOutTime}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              {formError && (
                <p className="text-sm text-danger bg-danger-light rounded-lg px-3 py-2">{formError}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-lg bg-brand-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-brand-800 disabled:opacity-60 transition-colors"
                >
                  {submitting ? 'Saving...' : 'Save property'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-brand-300"
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

