import { useState } from 'react'
import { Globe2, ShieldCheck, Info } from 'lucide-react'

const inputClass =
  'w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent'

function Field({ label, required, children, span }) {
  return (
    <div className={span ? 'sm:col-span-2' : ''}>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {children}
    </div>
  )
}

export default function ForeignBooking() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-brand-50">
      <header className="bg-brand-950 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-brand-800 border border-accent/40 flex items-center justify-center shrink-0">
            <ShieldCheck size={20} className="text-accent" strokeWidth={2.5} />
          </div>
          <span className="font-extrabold text-lg tracking-tight lowercase">sypnofy</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Globe2 size={20} className="text-brand-900" />
            Foreign Guest Booking
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Capture passport and visa details at booking so Form III / C-Form compliance can be
            submitted within the 24-hour window required by the Immigration &amp; Foreigners Rules, 2025.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-xl shadow-card border border-slate-100 p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-accent-light text-accent-dark flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={24} />
            </div>
            <h2 className="font-semibold text-slate-800 mb-1">Booking created</h2>
            <p className="text-sm text-slate-500 mb-5">
              A KYC link has been sent to the guest. Compliance submission is queued and will be sent
              automatically once the stay begins.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="rounded-lg bg-brand-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-brand-800"
            >
              Create another booking
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-xl shadow-card border border-slate-100 p-5 sm:p-6">
              <h2 className="font-semibold text-slate-800 mb-4">Guest identity</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full name (as per passport)" required span>
                  <input required className={inputClass} placeholder="e.g. James Alexander Wu" />
                </Field>
                <Field label="Nationality" required>
                  <input required className={inputClass} placeholder="e.g. United States" />
                </Field>
                <Field label="Date of birth" required>
                  <input required type="date" className={inputClass} />
                </Field>
                <Field label="Passport number" required>
                  <input required className={inputClass} placeholder="e.g. N1234567" />
                </Field>
                <Field label="Passport expiry" required>
                  <input required type="date" className={inputClass} />
                </Field>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-card border border-slate-100 p-5 sm:p-6">
              <h2 className="font-semibold text-slate-800 mb-4">Visa details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Visa type" required>
                  <select required defaultValue="" className={inputClass}>
                    <option value="" disabled>Select visa type</option>
                    <option>Tourist</option>
                    <option>Business</option>
                    <option>Employment</option>
                    <option>Conference</option>
                    <option>e-Visa</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field label="Visa number" required>
                  <input required className={inputClass} placeholder="e.g. IN2026081234" />
                </Field>
                <Field label="Visa valid from">
                  <input type="date" className={inputClass} />
                </Field>
                <Field label="Visa valid until">
                  <input type="date" className={inputClass} />
                </Field>
                <Field label="Place of arrival in India" span>
                  <input className={inputClass} placeholder="e.g. Indira Gandhi International Airport, Delhi" />
                </Field>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-card border border-slate-100 p-5 sm:p-6">
              <h2 className="font-semibold text-slate-800 mb-4">Stay details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Check-in date" required>
                  <input required type="date" className={inputClass} />
                </Field>
                <Field label="Check-out date" required>
                  <input required type="date" className={inputClass} />
                </Field>
                <Field label="Room type">
                  <select className={inputClass} defaultValue="Deluxe">
                    <option>Standard</option>
                    <option>Deluxe</option>
                    <option>Suite</option>
                  </select>
                </Field>
                <Field label="Number of guests">
                  <input type="number" min="1" defaultValue="1" className={inputClass} />
                </Field>
                <Field label="Purpose of visit" span>
                  <input className={inputClass} placeholder="e.g. Tourism, conference, business meeting" />
                </Field>
                <Field label="Contact number" required>
                  <input required type="tel" className={inputClass} placeholder="+1 555 000 0000" />
                </Field>
                <Field label="Email">
                  <input type="email" className={inputClass} placeholder="guest@example.com" />
                </Field>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-card border border-slate-100 p-5 sm:p-6">
              <h2 className="font-semibold text-slate-800 mb-4">Compliance &amp; consent</h2>
              <label className="flex items-start gap-3 rounded-lg border border-slate-200 px-4 py-3 cursor-pointer mb-3">
                <input required type="checkbox" className="mt-1 accent-accent" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Guest consents to identity verification and Form III submission</p>
                  <p className="text-xs text-slate-400">Required for foreign national arrival/departure reporting to local authorities</p>
                </div>
              </label>
              <div className="flex items-start gap-2 text-xs text-slate-400 bg-brand-50 rounded-lg px-3 py-2.5">
                <Info size={14} className="shrink-0 mt-0.5" />
                <span>
                  Submission is due within 24 hours of check-in. This booking will appear on the
                  Foreign Guest Compliance dashboard once created.
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="rounded-lg bg-brand-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-800 transition-colors"
              >
                Create booking &amp; send KYC link
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:border-brand-300"
              >
                Save as draft
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}