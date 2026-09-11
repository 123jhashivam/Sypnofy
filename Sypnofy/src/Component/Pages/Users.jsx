import { useState } from 'react'
import { UserPlus, Search } from 'lucide-react'
import StatusBadge from "../StatusBadge";

const ROLES = [
  { name: 'Organization Admin', scope: 'All properties', desc: 'Full access — billing, users, integrations, all properties' },
  { name: 'Property Admin', scope: 'Single property', desc: 'Manage bookings, KYC, staff and reports for one property' },
  { name: 'Front Desk / Receptionist', scope: 'Single property', desc: 'Check-in, check-out, guest KYC, bookings' },
  { name: 'Compliance Officer', scope: 'All properties', desc: 'Foreign guest reporting, audit logs, manual review' },
  { name: 'Auditor', scope: 'All properties', desc: 'Read-only access to audit logs and reports' },
]

const USERS = [
  { id: 'USR-0041', name: 'Shivam Jain', email: 'shivam@staykyc.com', role: 'Organization Admin', property: 'All properties', status: 'Active' },
  { id: 'USR-0042', name: 'Priya Nair', email: 'priya@staykyc.com', role: 'Compliance Officer', property: 'All properties', status: 'Active' },
  { id: 'USR-0043', name: 'Rahul Verma', email: 'rahul@staykyc.com', role: 'Property Admin', property: 'Taj Residency, Jaipur', status: 'Active' },
  { id: 'USR-0044', name: 'Anita Desai', email: 'anita@staykyc.com', role: 'Front Desk / Receptionist', property: 'Taj Residency, Jaipur', status: 'Active' },
  { id: 'USR-0045', name: 'Karan Patel', email: 'karan@staykyc.com', role: 'Auditor', property: 'All properties', status: 'Inactive' },
]

export default function Users() {
  const [query, setQuery] = useState('')

  const filtered = USERS.filter((u) =>
    `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Users &amp; Roles</h1>
          <p className="text-sm text-slate-500">RBAC with organization and property-level scope</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-brand-800 transition-colors">
          <UserPlus size={16} />
          Invite user
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {ROLES.map((r) => (
          <div key={r.name} className="bg-white rounded-xl shadow-card border border-slate-100 p-4">
            <div className="flex items-center justify-between mb-1.5 gap-2">
              <p className="font-semibold text-slate-800 text-sm">{r.name}</p>
              <span className="text-[11px] font-semibold text-brand-800 bg-brand-100 rounded-full px-2 py-0.5 shrink-0">{r.scope}</span>
            </div>
            <p className="text-xs text-slate-400">{r.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2.5 sm:max-w-sm">
        <Search size={16} className="text-slate-400 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search name, email, role..."
          className="outline-none text-sm w-full placeholder:text-slate-400"
        />
      </div>

      <div className="space-y-3 md:hidden">
        {filtered.map((u) => (
          <div key={u.id} className="bg-white rounded-xl shadow-card border border-slate-100 p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 text-sm">{u.name}</p>
                <p className="text-xs text-slate-400 truncate">{u.email}</p>
              </div>
              <StatusBadge status={u.status} />
            </div>
            <p className="text-xs text-slate-500">{u.role}</p>
            <p className="text-xs text-slate-400">{u.property}</p>
            <button className="mt-2 text-xs font-semibold text-brand-800 hover:underline">Edit</button>
          </div>
        ))}
      </div>

      <div className="hidden md:block bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Property scope</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-brand-50/40">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-700">{u.name}</p>
                    <p className="text-xs text-slate-400">{u.email}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{u.role}</td>
                  <td className="px-4 py-3 text-slate-600">{u.property}</td>
                  <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                  <td className="px-4 py-3">
                    <button className="text-xs font-semibold text-brand-800 hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-sm text-slate-400 py-12">No users match your search.</div>
      )}
    </div>
  )
}