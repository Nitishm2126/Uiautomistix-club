import { useState, useEffect } from 'react'
import { Eye, Image as ImageIcon, Loader2, Filter, Search } from 'lucide-react'
import AdminPageHeader from '../components/AdminPageHeader'
import AdminActionButton from '../components/AdminActionButton'
import AdminModal from '../components/AdminModal'
import AdminFormField from '../components/AdminFormField'
import AdminEmptyState from '../components/AdminEmptyState'
import ConfirmDialog from '../components/ConfirmDialog'
import { useToast } from '../components/ToastContext'
import { getGalleryData } from '../data/adminData'
import {
  getAllGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from '../../services/galleryService'

export default function AdminGallery() {
  const toast = useToast()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  const [modalOpen, setModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    category: 'Events',
    imageUrl: '',
  })

  useEffect(() => {
    loadGallery()
  }, [])

  async function loadGallery() {
    setLoading(true)
    const { data, error } = await getAllGalleryImages()
    if (!error && data && data.length > 0) {
      setImages(data)
    } else {
      const fallback = getGalleryData()
      setImages(fallback)
    }
    setLoading(false)
  }

  const handleOpenAdd = () => {
    setSelectedItem(null)
    setFormData({
      title: '',
      category: 'Events',
      imageUrl: '',
    })
    setModalOpen(true)
  }

  const handleOpenEdit = (img) => {
    setSelectedItem(img)
    setFormData({
      title: img.title || '',
      category: img.category || 'Events',
      imageUrl: img.imageUrl || img.image_url || '',
    })
    setModalOpen(true)
  }

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    setSaving(true)

    const payload = {
      title: formData.title,
      category: formData.category,
      imageUrl: formData.imageUrl,
      image_url: formData.imageUrl,
    }

    if (selectedItem && selectedItem.id && typeof selectedItem.id !== 'number') {
      const { data, error } = await updateGalleryImage(selectedItem.id, payload)
      if (!error && data) {
        setImages((prev) => prev.map((img) => (img.id === selectedItem.id ? data : img)))
        toast.success('Gallery item updated!')
      } else {
        setImages((prev) => prev.map((img) => (img.id === selectedItem.id ? { ...img, ...payload } : img)))
        toast.success('Gallery item saved!')
      }
    } else if (selectedItem && selectedItem.id) {
      setImages((prev) => prev.map((img) => (img.id === selectedItem.id ? { ...img, ...payload } : img)))
      toast.success('Gallery item updated!')
    } else {
      const { data, error } = await createGalleryImage(payload)
      if (!error && data) {
        setImages((prev) => [data, ...prev])
        toast.success('New photo published to gallery!')
      } else {
        const newItem = {
          id: `gallery-local-${Date.now()}`,
          ...payload,
        }
        setImages((prev) => [newItem, ...prev])
        toast.success('New photo added to gallery!')
      }
    }

    setModalOpen(false)
    setSaving(false)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedItem) return
    setSaving(true)

    if (typeof selectedItem.id === 'string' && !selectedItem.id.startsWith('gallery-local-')) {
      await deleteGalleryImage(selectedItem.id)
    }

    setImages((prev) => prev.filter((img) => img.id !== selectedItem.id))
    toast.success(`Photo "${selectedItem.title}" removed from gallery.`)
    setDeleteDialogOpen(false)
    setSelectedItem(null)
    setSaving(false)
  }

  const categories = ['ALL', 'Events', 'Workshops', 'Team', 'Competitions']

  const filteredImages = images.filter((img) => {
    if (selectedCategory === 'ALL') return true
    return img.category?.toLowerCase() === selectedCategory.toLowerCase()
  })

  if (loading) {
    return (
      <div className="p-16 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="animate-spin text-[#F64124]" size={32} />
        <span className="text-sm text-white/50">Loading gallery showcase...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminPageHeader
        title="Gallery Showcase"
        subtitle="Manage club event photographs, workshop captures, and showcase moments displayed in the public Gallery."
        breadcrumb={[
          { label: 'Dashboard', link: '/admin' },
          { label: 'Gallery' },
        ]}
        action={
          <AdminActionButton
            label="Upload Image"
            icon="plus"
            onClick={handleOpenAdd}
          />
        }
      />

      {/* Category Filter Bar */}
      <div className="flex items-center justify-between gap-4 bg-[#141414] border border-white/8 rounded-2xl p-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-white/40 flex items-center gap-1">
            <Filter size={13} /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#F64124] text-white shadow-sm'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/8'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-white/40 font-medium hidden sm:inline">
          Total: {filteredImages.length} photos
        </span>
      </div>

      {/* Gallery Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredImages.map((item) => {
            const imgSrc = item.imageUrl || item.image_url
            return (
              <div
                key={item.id}
                className="group flex flex-col rounded-2xl bg-[#141414] border border-white/8 overflow-hidden hover:border-[#F64124]/40 transition-all duration-300 shadow-md"
              >
                {/* Image Box */}
                <div className="relative aspect-video w-full bg-black/60 overflow-hidden flex items-center justify-center">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.nextElementSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}

                  {/* Fallback image icon */}
                  <div className="hidden flex-col items-center justify-center gap-2 text-white/30 p-4">
                    <ImageIcon size={28} className="text-[#F64124]/60" />
                    <span className="text-[10px] uppercase font-semibold">Photo Asset</span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewImage(item)}
                      className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors backdrop-blur-sm"
                      title="View lightbox preview"
                    >
                      <Eye size={18} />
                    </button>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm border border-white/10 text-[#F64124]">
                      {item.category || 'Events'}
                    </span>
                  </div>
                </div>

                {/* Details & Actions */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-white/40 truncate mt-0.5 font-mono">
                      {imgSrc || 'No path specified'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-white/6">
                    <span className="text-[10px] text-white/30 uppercase font-semibold">
                      ID: {String(item.id).substring(0, 10)}
                    </span>

                    <div className="flex items-center gap-1">
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
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <AdminEmptyState
          icon={ImageIcon}
          title="No Gallery Photos Found"
          description="There are currently no photos matching the selected filter category."
          action={
            <AdminActionButton
              label="Reset Category Filter"
              variant="secondary"
              onClick={() => setSelectedCategory('ALL')}
            />
          }
        />
      )}

      {/* Add / Edit Image Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedItem ? 'Edit Gallery Photo' : 'Upload Gallery Photo'}
        subtitle="Manage photo title, category, and source file URL."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <AdminFormField
            label="Photo Title / Caption"
            placeholder="e.g., RPA Hands-On Lab Showcase 2026"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <AdminFormField
            label="Category"
            type="select"
            options={['Events', 'Workshops', 'Team', 'Competitions']}
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />

          <AdminFormField
            label="Image File Path or Web URL"
            placeholder="/assets/gallery/gallery-1.svg"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            helper="Enter local relative path or full HTTP image URL."
            required
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
              label={selectedItem ? 'Save Changes' : 'Publish Photo'}
              loading={saving}
            />
          </div>
        </form>
      </AdminModal>

      {/* Lightbox Preview Modal */}
      {previewImage && (
        <AdminModal
          isOpen={Boolean(previewImage)}
          onClose={() => setPreviewImage(null)}
          title={previewImage.title}
          subtitle={`Category: ${previewImage.category || 'Events'}`}
          maxWidth="max-w-2xl"
          footer={
            <AdminActionButton
              label="Close Preview"
              variant="secondary"
              onClick={() => setPreviewImage(null)}
            />
          }
        >
          <div className="rounded-xl overflow-hidden bg-black/80 border border-white/10 flex items-center justify-center p-2">
            <img
              src={previewImage.imageUrl || previewImage.image_url}
              alt={previewImage.title}
              className="max-h-[60vh] object-contain rounded-lg"
            />
          </div>
        </AdminModal>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Photo"
        message={`Are you sure you want to remove "${selectedItem?.title}" from the gallery showcase?`}
        confirmText="Delete Photo"
        loading={saving}
      />
    </div>
  )
}
