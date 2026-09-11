import {
  LayoutDashboard, Building2, BedDouble, ScanFace, DoorOpen,
  ShieldCheck, Globe2, Plug, Users, ClipboardList, Wallet, Settings,
} from 'lucide-react'

export const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [{ label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Properties', to: '/dashboard/properties', icon: Building2 },
      { label: 'Bookings', to: '/dashboard/bookings', icon: BedDouble },
      { label: 'Guest KYC', to: '/dashboard/kyc', icon: ScanFace },
      { label: 'Check-in / Check-out', to: '/dashboard/checkin', icon: DoorOpen },
    ],
  },
  {
    label: 'Compliance',
    items: [
      { label: 'Foreign Guests', to: '/dashboard/foreign-guests', icon: Globe2 },
      { label: 'Audit Logs', to: '/dashboard/audit', icon: ShieldCheck },
      { label: 'Reports', to: '/dashboard/reports', icon: ClipboardList },
    ],
  },
  {
    label: 'Platform',
    items: [
      { label: 'Integrations', to: '/dashboard/integrations', icon: Plug },
      { label: 'Users & Roles', to: '/dashboard/users', icon: Users },
      { label: 'Billing', to: '/dashboard/billing', icon: Wallet },
      { label: 'Settings', to: '/dashboard/settings', icon: Settings },
    ],
  },
]