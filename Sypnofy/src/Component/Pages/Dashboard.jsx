import {
  DoorOpen, ClipboardCheck, ShieldCheck, AlertTriangle, LogOut, Globe2, Bell,
} from 'lucide-react'
import KpiCard from '../KpiCard'

const KPIS = [
  { label: "Today's Check-ins", value: 84, icon: DoorOpen, tone: 'brand' },
  { label: 'KYC Pending', value: 9, icon: ClipboardCheck, tone: 'warn' },
  { label: 'KYC Verified', value: 71, icon: ShieldCheck, tone: 'accent' },
  { label: 'Manual Review', value: 4, icon: AlertTriangle, tone: 'warn' },
  { label: 'Check-outs', value: 63, icon: LogOut, tone: 'brand' },
  { label: 'Foreign Guests', value: 12, icon: Globe2, tone: 'accent' },
  { label: 'Compliance Alerts', value: 1, icon: Bell, tone: 'warn' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Property Dashboard</h1>
        <p className="text-sm text-slate-500">Taj Residency, Jaipur — Wednesday, 12 Aug 2026</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {KPIS.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-card border border-slate-100 p-5">
          <h2 className="font-semibold text-slate-800 mb-4">Check-ins by day</h2>
          <div className="h-56 rounded-lg bg-brand-50 flex items-center justify-center text-sm text-slate-400">
            Chart placeholder — wire up recharts here
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card border border-slate-100 p-5">
          <h2 className="font-semibold text-slate-800 mb-4">Quick actions</h2>
          <div className="space-y-2">
            {['Send KYC link', 'Scan guest QR', 'New booking', 'Manual review queue'].map((a) => (
              <button
                key={a}
                className="w-full text-left rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 hover:border-accent hover:text-accent-dark hover:bg-accent-light transition-colors"
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}