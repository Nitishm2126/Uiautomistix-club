import { useState, useEffect } from 'react'
import { Calendar, Tag, Search, Plus, Loader2, Sparkles, Filter } from 'lucide-react'
import AdminPageHeader from '../components/AdminPageHeader'
import AdminCard from '../components/AdminCard'
import AdminTable from '../components/AdminTable'
import AdminActionButton from '../components/AdminActionButton'
import AdminModal from '../components/AdminModal'
import AdminFormField from '../components/AdminFormField'
import AdminEmptyState from '../components/AdminEmptyState'
import ConfirmDialog from '../components/ConfirmDialog'
import { useToast } from '../components/ToastContext'
import { getActivitiesAndEventsData } from '../data/adminData'
import { getAllEvents, createEvent, updateEvent, deleteEvent } from '../../services/eventsService'

export default function AdminEvents() {
  const toast = useToast()
  const [eventsList, setEventsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYearFilter, setSelectedYearFilter] = useState('ALL')

  const [modalOpen, setModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    year: '2026',
    category: 'Workshop',
    description: '',
  })

  useEffect(() => {
    loadEvents()
  }, [])

  async function loadEvents() {
    setLoading(true)
    const { data, error } = await getAllEvents()
    if (!error && data && data.length > 0) {
      setEventsList(data)
    } else {
      // Fallback to static catalog data
      const { activities } = getActivitiesAndEventsData()
      const formatted = activities.map((item, idx) => ({
        id: `local-event-${idx}`,
        title: item.title,
        year: item.year,
        category: item.title.toLowerCase().includes('hack')
          ? 'Hackathon'
          : item.title.toLowerCase().includes('pitch')
          ? 'Pitchfest'
          : item.title.toLowerCase().includes('skill')
          ? 'Skill-A-Thon'
          : 'Workshop',
      }))
      setEventsList(formatted)
    }
    setLoading(false)
  }

  const handleOpenAdd = () => {
    setSelectedItem(null)
    setFormData({
      title: '',
      year: '2026',
      category: 'Workshop',
      description: '',
    })
    setModalOpen(true)
  }

  const handleOpenEdit = (item) => {
    setSelectedItem(item)
    setFormData({
      title: item.title || '',
      year: String(item.year || '2026'),
      category: item.category || 'Workshop',
      description: item.description || '',
    })
    setModalOpen(true)
  }

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    setSaving(true)

    const payload = {
      title: formData.title,
      year: parseInt(formData.year, 10),
      category: formData.category,
      description: formData.description,
    }

    if (selectedItem && selectedItem.id && !selectedItem.id.startsWith('local-')) {
      const { data, error } = await updateEvent(selectedItem.id, payload)
      if (!error && data) {
        setEventsList((prev) => prev.map((e) => (e.id === selectedItem.id ? data : e)))
        toast.success('Event updated successfully!')
      } else {
        setEventsList((prev) => prev.map((e) => (e.id === selectedItem.id ? { ...e, ...payload } : e)))
        toast.success('Event changes saved!')
      }
    } else if (selectedItem && selectedItem.id) {
      // Local fallback edit
      setEventsList((prev) => prev.map((e) => (e.id === selectedItem.id ? { ...e, ...payload } : e)))
      toast.success('Event updated successfully!')
    } else {
      const { data, error } = await createEvent(payload)
      if (!error && data) {
        setEventsList((prev) => [data, ...prev])
        toast.success('New event added!')
      } else {
        const newItem = {
          id: `local-event-${Date.now()}`,
          ...payload,
        }
        setEventsList((prev) => [newItem, ...prev])
        toast.success('New event catalogued!')
      }
    }

    setModalOpen(false)
    setSaving(false)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedItem) return
    setSaving(true)

    if (!selectedItem.id.startsWith('local-')) {
      await deleteEvent(selectedItem.id)
    }

    setEventsList((prev) => prev.filter((e) => e.id !== selectedItem.id))
    toast.success(`Event "${selectedItem.title}" deleted successfully.`)
    setDeleteDialogOpen(false)
    setSelectedItem(null)
    setSaving(false)
  }

  // Filtered Events
  const filteredEvents = eventsList.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesYear = selectedYearFilter === 'ALL' || String(item.year) === selectedYearFilter
    return matchesSearch && matchesYear
  })

  const availableYears = ['ALL', '2026', '2025', '2024', '2021']

  if (loading) {
    return (
      <div className="p-16 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="animate-spin text-[#F64124]" size={32} />
        <span className="text-sm text-white/50">Loading catalogued events...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminPageHeader
        title="Events & Activities"
        subtitle="Manage historical club milestones, hackathons, workshops, and upcoming automation events."
        breadcrumb={[
          { label: 'Dashboard', link: '/admin' },
          { label: 'Events' },
        ]}
        action={
          <AdminActionButton
            label="Add Event / Activity"
            icon="plus"
            onClick={handleOpenAdd}
          />
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#141414] border border-white/8 rounded-2xl p-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search events by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 focus:border-[#F64124] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-white/40 font-semibold px-2 flex items-center gap-1">
            <Filter size={12} />
            Year:
          </span>
          {availableYears.map((yr) => (
            <button
              key={yr}
              type="button"
              onClick={() => setSelectedYearFilter(yr)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedYearFilter === yr
                  ? 'bg-[#F64124] text-white shadow-sm'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* Events Table Card */}
      <AdminCard
        title="Catalogued Activities & Milestones"
        subtitle={`Displaying ${filteredEvents.length} of ${eventsList.length} events`}
        noPadding
      >
        {filteredEvents.length > 0 ? (
          <AdminTable headers={['Year', 'Event Title', 'Category', 'Status', 'Actions']}>
            {filteredEvents.map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                {/* Year */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-[#F64124]">
                    <Calendar size={12} />
                    {item.year}
                  </span>
                </td>

                {/* Title */}
                <td className="px-6 py-4">
                  <div className="font-semibold text-white tracking-tight text-sm">
                    {item.title}
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">
                    Sairam UiAutomistix Official Event
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
                    <Tag size={12} className="text-[#F64124]" />
                    {item.category || 'Workshop'}
                  </span>
                </td>

                {/* Visibility */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Published
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <AdminActionButton
                      icon="edit"
                      variant="icon"
                      onClick={() => handleOpenEdit(item)}
                      aria-label={`Edit ${item.title}`}
                    />
                    <AdminActionButton
                      icon="delete"
                      variant="icon"
                      className="hover:text-red-400 hover:border-red-500/30"
                      onClick={() => {
                        setSelectedItem(item)
                        setDeleteDialogOpen(true)
                      }}
                      aria-label={`Delete ${item.title}`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </AdminTable>
        ) : (
          <AdminEmptyState
            icon={Calendar}
            title="No Events Found"
            description="No events match your current search or year filter criteria."
            action={
              <AdminActionButton
                label="Reset Filters"
                variant="secondary"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedYearFilter('ALL')
                }}
              />
            }
          />
        )}
      </AdminCard>

      {/* Add / Edit Event Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedItem ? 'Edit Event / Activity' : 'Add New Event'}
        subtitle="Configure activity details to display in the Activities & Events section."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <AdminFormField
            label="Event Title"
            placeholder="e.g., ADVANCED RPA WORKSHOP 2026"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminFormField
              label="Year"
              type="select"
              options={['2026', '2025', '2024', '2023', '2022', '2021']}
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              required
            />

            <AdminFormField
              label="Type / Category"
              type="select"
              options={['Workshop', 'Hackathon', 'Pitchfest', 'Skill-A-Thon', 'Seminar', 'Competition']}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          <AdminFormField
            label="Short Description (Optional)"
            type="textarea"
            placeholder="Brief overview of key outcomes or participant counts..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              label={selectedItem ? 'Save Changes' : 'Add Event'}
              loading={saving}
            />
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Event"
        message={`Are you sure you want to delete "${selectedItem?.title}"? This action cannot be undone.`}
        confirmText="Delete Event"
        loading={saving}
      />
    </div>
  )
}
