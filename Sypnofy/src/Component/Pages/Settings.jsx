import { useState } from 'react'
import { Settings as SettingsIcon, Building2, Bell, ShieldCheck } from 'lucide-react'

const TABS = [
  { id: 'general', label: 'General', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: ShieldCheck },
]

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent'

export default function Settings() {
  const [tab, setTab] = useState('general')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <SettingsIcon size={20} className="text-brand-900" />
          Settings
        </h1>
        <p className="text-sm text-slate-500">Property details, notification channels and security controls</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <div className="flex lg:flex-col gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                tab === t.id ? 'bg-brand-900 text-white' : 'text-slate-600 hover:bg-white hover:shadow-card'
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-card border border-slate-100 p-6">
          {tab === 'general' && (
            <div className="space-y-5 max-w-lg">
              <h2 className="font-semibold text-slate-800">Property details</h2>
              <Field label="Property name">
                <input defaultValue="Taj Residency" className={inputClass} />
              </Field>
              <Field label="Legal entity / hotel brand">
                <input defaultValue="Taj Hotels" className={inputClass} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="GSTIN">
                  <input defaultValue="08AAACT2727Q1ZW" className={inputClass} />
                </Field>
                <Field label="PAN">
                  <input defaultValue="AAACT2727Q" className={inputClass} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Check-in time">
                  <input type="time" defaultValue="12:00" className={inputClass} />
                </Field>
                <Field label="Check-out time">
                  <input type="time" defaultValue="11:00" className={inputClass} />
                </Field>
              </div>
              <Field label="Property timezone">
                <select className={inputClass} defaultValue="Asia/Kolkata">
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                </select>
              </Field>
              <Field label="Emergency contact">
                <input defaultValue="+91 98290 00000" className={inputClass} />
              </Field>
              <button className="rounded-lg bg-brand-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-brand-800">
                Save changes
              </button>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="space-y-5 max-w-lg">
              <h2 className="font-semibold text-slate-800">Notification channels</h2>
              <p className="text-sm text-slate-500">Choose how guests and staff receive KYC links, alerts and receipts.</p>
              {[
                { label: 'SMS', desc: 'OTP and KYC link delivery', checked: true },
                { label: 'WhatsApp', desc: 'KYC links, check-in and receipt messages', checked: true },
                { label: 'Email', desc: 'Receipts, reports and compliance alerts', checked: true },
                { label: 'In-app', desc: 'Dashboard notification bell', checked: true },
                { label: 'Webhook', desc: 'Push events to your own system', checked: false },
              ].map((ch) => (
                <label key={ch.label} className="flex items-start gap-3 rounded-lg border border-slate-200 px-4 py-3 cursor-pointer">
                  <input type="checkbox" defaultChecked={ch.checked} className="mt-1 accent-accent" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">{ch.label}</p>
                    <p className="text-xs text-slate-400">{ch.desc}</p>
                  </div>
                </label>
              ))}
              <button className="rounded-lg bg-brand-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-brand-800">
                Save changes
              </button>
            </div>
          )}

          {tab === 'security' && (
            <div className="space-y-5 max-w-lg">
              <h2 className="font-semibold text-slate-800">Security</h2>
              <label className="flex items-start gap-3 rounded-lg border border-slate-200 px-4 py-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-1 accent-accent" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Require multi-factor authentication (MFA)</p>
                  <p className="text-xs text-slate-400">Applies to all users on this organization</p>
                </div>
              </label>

              <Field label="Session timeout">
                <select className={inputClass} defaultValue="30">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </Field>

              <Field label="Data retention — foreign guest records">
                <select className={inputClass} defaultValue="12">
                  <option value="12">1 year (minimum per Immigration &amp; Foreigners Rules, 2025)</option>
                  <option value="24">2 years</option>
                </select>
              </Field>

              <button className="rounded-lg bg-brand-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-brand-800">
                Save changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}