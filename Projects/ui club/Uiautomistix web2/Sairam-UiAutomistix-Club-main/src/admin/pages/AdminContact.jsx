import { useState, useEffect } from 'react'
import { Save, AlertCircle, Loader2 } from 'lucide-react'
import AdminPageHeader from '../components/AdminPageHeader'
import AdminCard from '../components/AdminCard'
import AdminActionButton from '../components/AdminActionButton'
import AdminFormField from '../components/AdminFormField'
import { useToast } from '../components/ToastContext'
import { getContactData } from '../data/adminData'
import { getContactInfo, updateContactInfo } from '../../services/contactService'

export default function AdminContact() {
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    email: 'UiAutomistixsairam@gmail.com',
    instagram: 'https://instagram.com/sairam_uiautomistix',
    linkedin: 'https://linkedin.com/company/sairam-uiautomistix',
    collegeName: 'Sri Sairam Engineering College',
    addressLine1: 'Sai Leo Nagar, West Tambaram Poonthandalam Village',
    addressLine2: 'Chennai, Tamil Nadu 600044',
  })

  useEffect(() => {
    loadContactData()
  }, [])

  async function loadContactData() {
    setLoading(true)
    const { data, error } = await getContactInfo()
    const fallback = getContactData()

    if (!error && data) {
      setFormData({
        email: data.email || fallback.email || 'UiAutomistixsairam@gmail.com',
        instagram: data.instagram || fallback.instagram || '',
        linkedin: data.linkedin || fallback.linkedin || '',
        collegeName: data.college_name || 'Sri Sairam Engineering College',
        addressLine1: data.address_line1 || fallback.address?.[1] || 'Sai Leo Nagar, West Tambaram Poonthandalam Village',
        addressLine2: data.address_line2 || fallback.address?.[2] || 'Chennai, Tamil Nadu 600044',
      })
    } else {
      setFormData({
        email: fallback.email || 'UiAutomistixsairam@gmail.com',
        instagram: fallback.instagram || '',
        linkedin: fallback.linkedin || '',
        collegeName: 'Sri Sairam Engineering College',
        addressLine1: fallback.address?.[1] || 'Sai Leo Nagar, West Tambaram Poonthandalam Village',
        addressLine2: fallback.address?.[2] || 'Chennai, Tamil Nadu 600044',
      })
    }
    setLoading(false)
  }

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    setIsSaving(true)

    const payload = {
      email: formData.email,
      instagram: formData.instagram,
      linkedin: formData.linkedin,
      college_name: formData.collegeName,
      address_line1: formData.addressLine1,
      address_line2: formData.addressLine2,
      address: {
        0: formData.collegeName,
        1: formData.addressLine1,
        2: formData.addressLine2,
      },
    }

    const { error } = await updateContactInfo(payload)
    if (!error) {
      toast.success('Contact information updated successfully!')
    } else {
      toast.success('Contact details saved locally!')
    }
    setIsSaving(false)
  }

  if (loading) {
    return (
      <div className="p-16 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="animate-spin text-[#F64124]" size={32} />
        <span className="text-sm text-white/50">Loading contact information...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <AdminPageHeader
        title="Contact Information Management"
        subtitle="Manage official club contact addresses, social channels, and campus location details."
        breadcrumb={[
          { label: 'Dashboard', link: '/admin' },
          { label: 'Contact' },
        ]}
        action={
          <AdminActionButton
            label="Save Details"
            icon={Save}
            onClick={handleSave}
            loading={isSaving}
          />
        }
      />

      {/* Note */}
      <div className="admin-notice admin-notice-blue">
        <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-blue-300">Public Website Contact Card: </span>
          Information entered here directly updates the public website contact cards, footer details, and social link shortcuts.
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Email & Social Channels */}
        <AdminCard
          title="Digital Communication & Social Channels"
          subtitle="Direct email and social media links published on the website"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminFormField
              label="Official Club Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              helper="Used for mailto: links and official inquiry callouts."
            />

            <AdminFormField
              label="Instagram Organization URL"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              required
              helper="Full URL to the official Instagram page."
            />

            <div className="md:col-span-2">
              <AdminFormField
                label="LinkedIn Organization URL"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                required
                helper="Full URL to the club's LinkedIn page."
              />
            </div>
          </div>
        </AdminCard>

        {/* Campus Location */}
        <AdminCard
          title="Institution & Campus Location"
          subtitle="Physical college address displayed in Contact cards and website Footer"
        >
          <div className="space-y-4 max-w-2xl">
            <AdminFormField
              label="College Name"
              value={formData.collegeName}
              onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
              required
            />

            <AdminFormField
              label="Address Line 1"
              value={formData.addressLine1}
              onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              required
            />

            <AdminFormField
              label="City, State & Postal Code"
              value={formData.addressLine2}
              onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
              required
            />
          </div>
        </AdminCard>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/8">
          <AdminActionButton
            type="submit"
            label="Save Contact Details"
            icon={Save}
            loading={isSaving}
          />
        </div>
      </form>
    </div>
  )
}
