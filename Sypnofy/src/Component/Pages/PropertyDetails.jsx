import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Building2, MapPin, Clock, Phone, ShieldCheck,
  Loader2, Pencil, Trash2, X,
} from 'lucide-react'
import StatusBadge from "../StatusBadge";
import { getPropertyById, updateProperty, deleteProperty } from '../../api/propertyApi'

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-slate-700">{value || '—'}</p>
    </div>
  )
}

export default function PropertyDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [showEdit, setShowEdit] = useState(false)
  const [form, setForm] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const loadProperty = () => {
    setLoading(true)
    getPropertyById(id)
      .then((res) => {
        setProperty(res.data)
        setForm(res.data)
        setError(null)
      })
      .catch((err) => {
        console.error(err)
        setError('Could not load this property. It may have been deleted.')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadProperty()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFormError(null)
    try {
      await updateProperty(id, { ...form, rooms: form.rooms ? Number(form.rooms) : 0 })
      setShowEdit(false)
      loadProperty()
    } catch (err) {
      console.error(err)
      setFormError(err.response?.data?.message || 'Could not save changes. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteProperty(id)
      navigate('/dashboard/properties')
    } catch (err) {
      console.error(err)
      setDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-sm text-slate-400 py-20">
        <Loader2 size={18} className="animate-spin" />
        Loading property...
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <button onClick={() => navigate('/properties')} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-900">
          <ArrowLeft size={16} />
          Back to properties
        </button>
        <div className="text-center text-sm text-danger bg-danger-light rounded-xl py-8 px-4">{error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/dashboard/properties')} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-900">
        <ArrowLeft size={16} />
        Back to properties
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-brand-100 text-brand-900 flex items-center justify-center shrink-0">
            <Building2 size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-800">{property.name}</h1>
              <StatusBadge status={property.status} />
            </div>
            <p className="text-sm text-slate-500">{property.brand}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowEdit(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-300"
          >
            <Pencil size={15} />
            Edit
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-danger/30 bg-white px-4 py-2.5 text-sm font-semibold text-danger hover:bg-danger-light"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-card border border-slate-100 p-6 space-y-6">
          <div>
            <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin size={16} className="text-brand-900" />
              Location
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Address" value={property.address} />
              <Field label="City" value={property.city} />
              <Field label="State" value={property.state} />
              <Field label="PIN" value={property.pin} />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <ShieldCheck size={16} className="text-brand-900" />
              Legal &amp; compliance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Legal entity" value={property.legalEntity} />
              <Field label="GSTIN" value={property.gstin} />
              <Field label="PAN" value={property.pan} />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Phone size={16} className="text-brand-900" />
              Contact
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Contact number" value={property.contactNumber} />
              <Field label="Emergency contact" value={property.emergencyContact} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card border border-slate-100 p-6 space-y-4">
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <Clock size={16} className="text-brand-900" />
            Operations
          </h2>
          <Field label="Check-in time" value={property.checkInTime} />
          <Field label="Check-out time" value={property.checkOutTime} />
          <Field label="Timezone" value={property.timezone} />
          <Field label="Rooms" value={property.rooms} />
        </div>
      </div>

      {showEdit && form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl shadow-card w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800 text-lg">Edit property</h2>
              <button onClick={() => setShowEdit(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Property name <span className="text-danger">*</span>
                </label>
                <input
                  name="name" required value={form.name} onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  name="city" required value={form.city} onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Brand</label>
                <input
                  name="brand" value={form.brand || ''} onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">GSTIN</label>
                  <input
                    name="gstin" value={form.gstin || ''} onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Rooms</label>
                  <input
                    name="rooms" type="number" min="0" value={form.rooms || ''} onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                <select
                  name="status" value={form.status} onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              {formError && (
                <p className="text-sm text-danger bg-danger-light rounded-lg px-3 py-2">{formError}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit" disabled={submitting}
                  className="flex-1 rounded-lg bg-brand-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-brand-800 disabled:opacity-60"
                >
                  {submitting ? 'Saving...' : 'Save changes'}
                </button>
                <button
                  type="button" onClick={() => setShowEdit(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-brand-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl shadow-card w-full max-w-sm p-6 text-center">
            <h2 className="font-semibold text-slate-800 mb-2">Delete this property?</h2>
            <p className="text-sm text-slate-500 mb-5">
              This will permanently remove <span className="font-medium text-slate-700">{property.name}</span>. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete} disabled={deleting}
                className="flex-1 rounded-lg bg-danger text-white px-4 py-2.5 text-sm font-semibold hover:bg-danger/90 disabled:opacity-60"
              >
                {deleting ? 'Deleting...' : 'Yes, delete'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-brand-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}