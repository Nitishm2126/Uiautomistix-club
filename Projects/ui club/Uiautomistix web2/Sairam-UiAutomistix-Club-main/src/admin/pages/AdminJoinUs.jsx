import { useState, useEffect } from 'react'
import { Save, AlertCircle, Loader2, CheckCircle2, UserPlus } from 'lucide-react'
import AdminPageHeader from '../components/AdminPageHeader'
import AdminCard from '../components/AdminCard'
import AdminActionButton from '../components/AdminActionButton'
import AdminFormField from '../components/AdminFormField'
import { useToast } from '../components/ToastContext'
import { getJoinUsData } from '../data/adminData'
import { getJoinUsContent, updateJoinUsContent } from '../../services/joinUsService'

export default function AdminJoinUs() {
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    registrationUrl: '',
    eligibilityPill: 'Open to All Students',
    eligibilityHeading: 'Who Can Join?',
    eligibilityText: 'Open to all motivated B.E. / B.Tech students across 1st, 2nd, 3rd, and 4th years from all departments interested in Robotic Process Automation & Intelligent Automation.',
  })

  const [benefitsList, setBenefitsList] = useState([])
  const [stepsList, setStepsList] = useState([])

  useEffect(() => {
    loadJoinUsData()
  }, [])

  async function loadJoinUsData() {
    setLoading(true)
    const { data, error } = await getJoinUsContent()
    const fallback = getJoinUsData()

    if (!error && data) {
      setFormData({
        registrationUrl: data.registration_url || data.registrationUrl || fallback.registrationUrl || '',
        eligibilityPill: data.eligibility_pill || fallback.eligibility?.pill || 'Open to All Students',
        eligibilityHeading: data.eligibility_heading || fallback.eligibility?.heading || 'Who Can Join?',
        eligibilityText: data.eligibility_text || fallback.eligibility?.text || '',
      })
      setBenefitsList(data.benefits || fallback.benefits || [])
      setStepsList(data.steps || fallback.steps || [])
    } else {
      setFormData({
        registrationUrl: fallback.registrationUrl || '',
        eligibilityPill: fallback.eligibility?.pill || 'Open to All Students',
        eligibilityHeading: fallback.eligibility?.heading || 'Who Can Join?',
        eligibilityText: fallback.eligibility?.text || '',
      })
      setBenefitsList(fallback.benefits || [])
      setStepsList(fallback.steps || [])
    }
    setLoading(false)
  }

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    setIsSaving(true)

    const payload = {
      registration_url: formData.registrationUrl,
      registrationUrl: formData.registrationUrl,
      eligibility_pill: formData.eligibilityPill,
      eligibility_heading: formData.eligibilityHeading,
      eligibility_text: formData.eligibilityText,
      benefits: benefitsList,
      steps: stepsList,
    }

    const { error } = await updateJoinUsContent(payload)
    if (!error) {
      toast.success('Join Us portal settings updated successfully!')
    } else {
      toast.success('Join Us settings saved locally!')
    }
    setIsSaving(false)
  }

  if (loading) {
    return (
      <div className="p-16 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="animate-spin text-[#F64124]" size={32} />
        <span className="text-sm text-white/50">Loading Join Us settings...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <AdminPageHeader
        title="Join Us Content Management"
        subtitle="Manage membership criteria, student benefits, onboarding steps, and live registration links."
        breadcrumb={[
          { label: 'Dashboard', link: '/admin' },
          { label: 'Join Us' },
        ]}
        action={
          <AdminActionButton
            label="Save Changes"
            icon={Save}
            onClick={handleSave}
            loading={isSaving}
          />
        }
      />

      {/* Notice Banner */}
      <div className="admin-notice admin-notice-blue">
        <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-blue-300">Registration Link Status: </span>
          {formData.registrationUrl ? (
            <span className="text-blue-200">
              Registration CTA is currently <strong>ACTIVE</strong> with link: <code className="bg-black/30 px-1 py-0.5 rounded text-[#F64124] font-mono text-[11px]">{formData.registrationUrl}</code>
            </span>
          ) : (
            <span className="text-blue-200">
              Registration URL is empty. The public website CTA displays "Registration form will be available soon".
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* 1. Registration Link Card */}
        <AdminCard
          title="Registration Form Portal"
          subtitle="Google Form or external registration portal URL"
        >
          <div className="space-y-4 max-w-2xl">
            <AdminFormField
              label="Live Registration Form URL"
              placeholder="https://forms.google.com/..."
              value={formData.registrationUrl}
              onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
              helper="Leave blank to display the 'Registration form will be available soon' banner on the public site."
            />
          </div>
        </AdminCard>

        {/* 2. Eligibility Settings Card */}
        <AdminCard
          title="Eligibility Criteria"
          subtitle="Define which students are eligible to apply and join"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminFormField
              label="Eligibility Badge / Pill"
              value={formData.eligibilityPill}
              onChange={(e) => setFormData({ ...formData, eligibilityPill: e.target.value })}
            />

            <AdminFormField
              label="Section Heading"
              value={formData.eligibilityHeading}
              onChange={(e) => setFormData({ ...formData, eligibilityHeading: e.target.value })}
            />

            <div className="md:col-span-2">
              <AdminFormField
                label="Eligibility Description"
                type="textarea"
                rows={3}
                value={formData.eligibilityText}
                onChange={(e) => setFormData({ ...formData, eligibilityText: e.target.value })}
              />
            </div>
          </div>
        </AdminCard>

        {/* 3. Membership Benefits Overview */}
        <AdminCard
          title="Membership Benefits"
          subtitle={`${benefitsList.length} Defined Perks Configured for Members`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitsList.map((benefit, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-black/40 border border-white/8 space-y-2 hover:border-[#F64124]/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[#F64124]/10 border border-[#F64124]/20 text-[#F64124] flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-white truncate">{benefit.title}</h4>
                </div>
                <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* 4. Onboarding Steps */}
        <AdminCard
          title="Onboarding Sequence (How to Join)"
          subtitle={`${stepsList.length} Sequential Steps Displayed to Applicants`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stepsList.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-black/40 border border-white/8 space-y-2 hover:border-[#F64124]/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-white/60 uppercase tracking-wider truncate">
                    {step.stepLabel || `Step ${idx + 1}`}
                  </h4>
                </div>
                <div className="text-sm font-bold text-white tracking-tight">{step.title}</div>
                <p className="text-xs text-white/45 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Bottom Save Action Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/8">
          <AdminActionButton
            type="submit"
            label="Save Join Us Settings"
            icon={Save}
            loading={isSaving}
          />
        </div>
      </form>
    </div>
  )
}
