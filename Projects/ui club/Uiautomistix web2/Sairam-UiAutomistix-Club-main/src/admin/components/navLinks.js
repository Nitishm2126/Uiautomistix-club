import {
  LayoutDashboard,
  Megaphone,
  Calendar,
  Users,
  ShieldCheck,
  UserPlus,
  Mail,
} from 'lucide-react'

export const ADMIN_NAV_LINKS = [
  {
    label: 'Dashboard',
    path: '/admin',
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: 'Announcements',
    path: '/admin/announcements',
    icon: Megaphone,
  },
  {
    label: 'Events',
    path: '/admin/events',
    icon: Calendar,
  },
  {
    label: 'MAGIC Team',
    path: '/admin/team/magic',
    icon: Users,
  },
  {
    label: 'SCOPE Team',
    path: '/admin/team/scope',
    icon: ShieldCheck,
  },
  {
    label: 'Join Us',
    path: '/admin/join-us',
    icon: UserPlus,
  },
  {
    label: 'Contact',
    path: '/admin/contact',
    icon: Mail,
  },
]
