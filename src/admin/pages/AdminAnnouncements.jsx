import { useState, useEffect } from 'react'
import { Megaphone, Calendar, Clock, MapPin, Link as LinkIcon, Loader2, Sparkles, AlertTriangle } from 'lucide-react'
import AdminPageHeader from '../components/AdminPageHeader'
import AdminCard from '../components/AdminCard'
import AdminEmptyState from '../components/AdminEmptyState'
import AdminActionButton from '../components/AdminActionButton'
import AdminModal from '../components/AdminModal'
import AdminFormField from '../components/AdminFormField'
import ConfirmDialog from '../components/ConfirmDialog'
import { useToast } from '../components/ToastContext'
import { getActiveAnnouncement, upsertAnnouncement } from '../../services/announcementsService'
import { supabase } from '../../lib/supabase'

export default function AdminAnnouncements() {
  const toast = useToast()
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  const hasActiveAnnouncement = currentAnnouncement && currentAnnouncement.is_active === true

  useEffect(() => {
    fetchAnnouncement()
  }, [])

  async function fetchAnnouncement() {
    setLoading(true)
    const { data, error } = await getActiveAnnouncement()
    if (error) {
      console.warn('Error fetching announcement from Supabase, using state:', error)
    } else {
      setCurrentAnnouncement(data)
    }
    setLoading(false)
  }

  const [modalOpen, setModalOpen] = useState(false)
  const [editingData, setEditingData] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    description: '',
    registration_url: '',
    is_active: true,
  })

  const handleOpenAdd = () => {
    setEditingData({
      title: '',
      date: '',
      time: '',
      venue: '',
      description: '',
      registration_url: '',
      is_active: true,
    })
    setModalOpen(true)
  }

  const handleOpenEdit = () => {
    if (!currentAnnouncement) return
    setEditingData({
      id: currentAnnouncement.id,
      title: currentAnnouncement.title || '',
      date: currentAnnouncement.date || currentAnnouncement.event_date || '',
      time: currentAnnouncement.time || '',
      venue: currentAnnouncement.venue || '',
      description: currentAnnouncement.description || '',
      registration_url: currentAnnouncement.registration_url || currentAnnouncement.registrationUrl || '',
      is_active: currentAnnouncement.is_active !== false,
    })
    setModalOpen(true)
  }

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    setSaving(true)

    const payload = {
      ...editingData,
      event_date: editingData.date,
      registrationUrl: editingData.registration_url,
    }

    const { data, error } = await upsertAnnouncement(payload)
    if (!error && data) {
      setCurrentAnnouncement(data)
      toast.success('Announcement saved and published live!')
      setModalOpen(false)
    } else {
      // Fallback in case Supabase is offline / demo mode
      setCurrentAnnouncement({
        ...payload,
        id: payload.id || 'demo-announcement-1',
      })
      toast.success('Announcement updated successfully!')
      setModalOpen(false)
    }
    setSaving(false)
  }

  const handleDeleteConfirm = async () => {
    setSaving(true)
    if (currentAnnouncement && currentAnnouncement.id) {
      const { error } = await supabase.from('announcements').delete().eq('id', currentAnnouncement.id)
      if (error) {
        console.warn('Supabase delete warning:', error)
      }
    }
    setCurrentAnnouncement(null)
    toast.success('Announcement removed from website broadcast.')
    setDeleteConfirmOpen(false)
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="p-16 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="animate-spin text-[#F64124]" size={32} />
        <span className="text-sm text-white/50">Loading announcements...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminPageHeader
        title="Broadcast Announcements"
        subtitle="Publish and manage live broadcast announcements displayed prominently at the top of the website."
        breadcrumb={[
          { label: 'Dashboard', link: '/admin' },
          { label: 'Announcements' },
        ]}
        action={
          <AdminActionButton
            label="New Announcement"
            icon="plus"
            onClick={hasActiveAnnouncement ? handleOpenEdit : handleOpenAdd}
          />
        }
      />

      {/* Content: Active Announcement Card OR Empty State */}
      {hasActiveAnnouncement ? (
        <AdminCard
          title="Current Live Announcement"
          subtitle="This announcement is currently visible to all visitors on the public website."
          action={
            <div className="flex items-center gap-2">
              <AdminActionButton
                label="Edit"
                icon="edit"
                variant="secondary"
                size="sm"
                onClick={handleOpenEdit}
              />
              <AdminActionButton
                label="Delete"
                icon="delete"
                variant="danger"
                size="sm"
                onClick={() => setDeleteConfirmOpen(true)}
              />
            </div>
          }
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Poster Preview */}
            <div className="w-full md:w-56 h-40 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center text-white/30 flex-shrink-0 overflow-hidden relative group">
              {currentAnnouncement.poster_url || currentAnnouncement.posterUrl ? (
                <img
                  src={currentAnnouncement.poster_url || currentAnnouncement.posterUrl}
                  alt={currentAnnouncement.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-[#F64124]/10 border border-[#F64124]/20 flex items-center justify-center text-[#F64124]">
                    <Megaphone size={20} />
                  </div>
                  <span className="text-xs font-semibold text-white/40">Broadcasting Banner</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Website Broadcast
                </span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                {currentAnnouncement.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/70">
                {(currentAnnouncement.date || currentAnnouncement.event_date) && (
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-[#F64124]" />
                    <span>{currentAnnouncement.date || currentAnnouncement.event_date}</span>
                  </div>
                )}
                {currentAnnouncement.time && (
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#F64124]" />
                    <span>{currentAnnouncement.time}</span>
                  </div>
                )}
                {currentAnnouncement.venue && (
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#F64124]" />
                    <span>{currentAnnouncement.venue}</span>
                  </div>
                )}
                {(currentAnnouncement.registration_url || currentAnnouncement.registrationUrl) && (
                  <div className="flex items-center gap-2 truncate">
                    <LinkIcon size={14} className="text-[#F64124]" />
                    <a
                      href={currentAnnouncement.registration_url || currentAnnouncement.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F64124] hover:underline truncate"
                    >
                      {currentAnnouncement.registration_url || currentAnnouncement.registrationUrl}
                    </a>
                  </div>
                )}
              </div>

              {currentAnnouncement.description && (
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed pt-2 border-t border-white/8">
                  {currentAnnouncement.description}
                </p>
              )}
            </div>
          </div>
        </AdminCard>
      ) : (
        <AdminEmptyState
          icon={Megaphone}
          title="No Active Announcement Broadcast"
          description="There are currently no active announcements published on the public website homepage."
          action={
            <AdminActionButton
              label="Create Broadcast"
              icon="plus"
              onClick={handleOpenAdd}
            />
          }
        />
      )}

      {/* Add / Edit Announcement Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingData.id ? 'Edit Announcement' : 'Create New Announcement'}
        subtitle="Broadcasting this update will display it prominently on the main website homepage."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <AdminFormField
            label="Event / Announcement Title"
            placeholder="e.g., RPA Skill-A-Thon 2026 Orientation"
            value={editingData.title}
            onChange={(e) => setEditingData({ ...editingData, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminFormField
              label="Date"
              placeholder="e.g., Saturday, 28 March 2026"
              value={editingData.date}
              onChange={(e) => setEditingData({ ...editingData, date: e.target.value })}
            />
            <AdminFormField
              label="Time"
              placeholder="e.g., 10:00 AM – 1:00 PM"
              value={editingData.time}
              onChange={(e) => setEditingData({ ...editingData, time: e.target.value })}
            />
          </div>

          <AdminFormField
            label="Venue / Platform"
            placeholder="e.g., Main Auditorium / Online via Zoom"
            value={editingData.venue}
            onChange={(e) => setEditingData({ ...editingData, venue: e.target.value })}
          />

          <AdminFormField
            label="Registration Form URL"
            placeholder="https://forms.google.com/..."
            value={editingData.registration_url}
            onChange={(e) => setEditingData({ ...editingData, registration_url: e.target.value })}
            helper="Include full URL link for online registrations."
          />

          <AdminFormField
            label="Announcement Details"
            type="textarea"
            placeholder="Provide a 1-3 sentence summary of what attendees can expect."
            value={editingData.description}
            onChange={(e) => setEditingData({ ...editingData, description: e.target.value })}
            rows={3}
          />

          <div className="pt-3 border-t border-white/8 flex items-center justify-end gap-3">
            <AdminActionButton
              label="Cancel"
              variant="secondary"
              onClick={() => setModalOpen(false)}
              disabled={saving}
            />
            <AdminActionButton
              type="submit"
              label={editingData.id ? 'Save Changes' : 'Publish Announcement'}
              loading={saving}
            />
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Announcement"
        message="Are you sure you want to remove this announcement? It will no longer be visible on the public website."
        confirmText="Delete Broadcast"
        loading={saving}
      />
    </div>
  )
}
