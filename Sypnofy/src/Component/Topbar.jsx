import { useEffect, useState } from 'react'
import { Search, Bell, ChevronDown, Menu } from 'lucide-react'
import { getMe } from '../lib/auth' // apna actual path check kar lena

const ROLE_LABELS = {
  USER: 'Property Admin',
  ADMIN: 'Admin',
  SUPERADMIN: 'Super Admin',
}

export default function Topbar({ onMenuClick }) {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    getMe()
      .then(setProfile)
      .catch(() => {})
  }, [])

  const fullName = profile ? `${profile.firstName} ${profile.lastName}` : 'Loading…'
  const initials = profile
    ? `${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`.toUpperCase()
    : '..'
  const roleLabel = profile ? (ROLE_LABELS[profile.role] || profile.role) : ''
  const propertyLabel = profile?.hotelName
    ? `${profile.hotelName}, ${profile.city}`
    : 'No property yet'

  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-3 sm:px-6 gap-2 sm:gap-4">
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden shrink-0 text-slate-500 hover:text-brand-900 p-1.5 -ml-1.5"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <button className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-slate-200 px-2.5 sm:px-3 py-2 text-sm font-medium hover:bg-slate-50 min-w-0">
          <span className="hidden sm:inline text-slate-500 shrink-0">Property:</span>
          <span className="text-brand-900 font-semibold truncate max-w-[110px] sm:max-w-none">
            {propertyLabel}
          </span>
          <ChevronDown size={16} className="text-slate-400 shrink-0" />
        </button>
      </div>

      <div className="flex-1 max-w-md hidden md:flex items-center gap-2 bg-brand-50 rounded-lg px-3 py-2 min-w-0">
        <Search size={16} className="text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search guest, booking ID, PMS ref..."
          className="bg-transparent outline-none text-sm w-full placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-accent-light text-accent-dark text-xs font-semibold px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          KYC success 98.7%
        </span>

        <button className="relative text-slate-500 hover:text-brand-900">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-brand-900 text-white flex items-center justify-center text-sm font-semibold shrink-0">
            {initials}
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-semibold text-slate-800">{fullName}</p>
            <p className="text-xs text-slate-400">{roleLabel}</p>
          </div>
        </div>
      </div>
    </header>
  )
}