import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import AdminTopbar from '../components/AdminTopbar'
import { ToastProvider } from '../components/ToastContext'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ToastProvider>
      <div className="admin-layout">
        {/* Sidebar: in-flow on desktop, fixed drawer on mobile */}
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main area: takes all remaining space after sidebar */}
        <div className="admin-main">
          <AdminTopbar onOpenSidebar={() => setSidebarOpen(true)} />
          <main className="admin-content">
            <Outlet />
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}

