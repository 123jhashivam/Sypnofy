import { NavLink } from 'react-router-dom'
import { ShieldCheck, ChevronsLeft, ChevronsRight, X } from 'lucide-react'
import { NAV_SECTIONS } from '../data/nav'

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  return (
    <>
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 flex flex-col bg-brand-950 text-white
          transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          ${collapsed ? 'lg:w-[76px]' : 'lg:w-[260px]'}
          w-[260px]
        `}
      >
        <div className="flex items-center justify-between gap-2 px-4 h-16 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-brand-800 border border-accent/40 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} className="text-accent" strokeWidth={2.5} />
            </div>
            {(!collapsed || mobileOpen) && (
              <span className="font-extrabold text-lg tracking-tight lowercase">
                sypnofy
              </span>
            )}
          </div>
          <button onClick={onMobileClose} className="lg:hidden text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto sidebar-scroll py-4 px-3 space-y-6">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              {(!collapsed || mobileOpen) && (
                <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                  {section.label}
                </p>
              )}
              <ul className="space-y-1">
                {section.items.map(({ label, to, icon: Icon }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={to === '/dashboard'}
                      onClick={onMobileClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-accent/15 text-accent border-l-2 border-accent -ml-[2px] pl-[14px]'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`
                      }
                      title={collapsed && !mobileOpen ? label : undefined}
                    >
                      <Icon size={18} className="shrink-0" />
                      {(!collapsed || mobileOpen) && <span>{label}</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <button
          onClick={onToggle}
          className="hidden lg:flex items-center gap-2 px-4 h-12 border-t border-white/10 text-white/60 hover:text-white text-sm shrink-0"
        >
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </aside>
    </>
  )
}