import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import PublicWebsite from './pages/PublicWebsite'
import AdminLayout from './admin/layouts/AdminLayout'
import DashboardHome from './admin/pages/DashboardHome'
import AdminAnnouncements from './admin/pages/AdminAnnouncements'
import AdminEvents from './admin/pages/AdminEvents'
import AdminMagicTeam from './admin/pages/AdminMagicTeam'
import AdminScopeTeam from './admin/pages/AdminScopeTeam'
import AdminJoinUs from './admin/pages/AdminJoinUs'
import AdminContact from './admin/pages/AdminContact'
import AdminLogin from './admin/pages/AdminLogin'
import { AuthProvider, useAuth } from './admin/components/AuthProvider'

/**
 * Protected Route Wrapper
 * Checks for a valid session before allowing access to child routes.
 * Redirects to /admin/login if unauthenticated.
 */
function ProtectedRoute() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#F64124] animate-spin" />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

/**
 * App.jsx — Phase 16
 *
 * Routing Architecture:
 * - /                     -> Live Public Club Website (all 11 sections)
 * - /admin/login          -> Admin Authentication Page
 * 
 * Protected Routes (require auth):
 * - /admin                -> Admin Dashboard Home (summary metrics, quick actions)
 * - /admin/announcements  -> Announcement broadcast manager
 * - /admin/events         -> Activities & Events milestone manager
 * - /admin/team/magic     -> MAGIC leadership manager
 * - /admin/team/scope     -> SCOPE roles manager
 * - /admin/join-us        -> Membership & registration form manager
 * - /admin/contact        -> Contact & college details manager
 */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Live Public Website - Unprotected */}
          <Route path="/" element={<PublicWebsite />} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Portal */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="team/magic" element={<AdminMagicTeam />} />
              <Route path="team/scope" element={<AdminScopeTeam />} />
              <Route path="join-us" element={<AdminJoinUs />} />
              <Route path="contact" element={<AdminContact />} />
            </Route>
          </Route>

          {/* Fallback to Public Landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
