import { useState, useEffect } from 'react'
import { GraduationCap, Users, Loader2, Sparkles } from 'lucide-react'
import AdminPageHeader from '../components/AdminPageHeader'
import AdminCard from '../components/AdminCard'
import AdminTable from '../components/AdminTable'
import AdminActionButton from '../components/AdminActionButton'
import AdminModal from '../components/AdminModal'
import AdminFormField from '../components/AdminFormField'
import ConfirmDialog from '../components/ConfirmDialog'
import { useToast } from '../components/ToastContext'
import { getMagicTeamData } from '../data/adminData'
import {
  getAllMagicMembers,
  createMagicMember,
  updateMagicMember,
  deleteMagicMember,
} from '../../services/magicService'

export default function AdminMagicTeam() {
  const toast = useToast()
  const [existingMembers, setExistingMembers] = useState([])
  const [prospectiveMembers, setProspectiveMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [tier, setTier] = useState('existing') // 'existing' | 'prospective'

  const [formData, setFormData] = useState({
    name: '',
    role: 'Mastermind',
    year: '3rd Year',
    department: 'AIDS',
    imageUrl: '/assets/team/magic-avatar.svg',
  })

  useEffect(() => {
    loadMembers()
  }, [])

  async function loadMembers() {
    setLoading(true)
    const { data, error } = await getAllMagicMembers()
    if (!error && data && data.length > 0) {
      setExistingMembers(data.filter((m) => m.year?.includes('3rd') || m.tier === 'existing'))
      setProspectiveMembers(data.filter((m) => m.year?.includes('2nd') || m.tier === 'prospective'))
    } else {
      const fallback = getMagicTeamData()
      setExistingMembers(fallback.existing || [])
      setProspectiveMembers(fallback.prospective || [])
    }
    setLoading(false)
  }

  const handleOpenAdd = (targetTier = 'existing') => {
    setSelectedMember(null)
    setTier(targetTier)
    setFormData({
      name: '',
      role: 'Mastermind',
      year: targetTier === 'existing' ? '3rd Year' : '2nd Year',
      department: 'AIDS',
      imageUrl: '/assets/team/magic-avatar.svg',
    })
    setModalOpen(true)
  }

  const handleOpenEdit = (member, memberTier) => {
    setSelectedMember(member)
    setTier(memberTier)
    setFormData({
      name: member.name || '',
      role: member.role || 'Mastermind',
      year: member.year || (memberTier === 'existing' ? '3rd Year' : '2nd Year'),
      department: member.department || 'AIDS',
      imageUrl: member.imageUrl || member.image_url || '/assets/team/magic-avatar.svg',
    })
    setModalOpen(true)
  }

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    setSaving(true)

    const payload = {
      name: formData.name,
      role: formData.role,
      year: formData.year,
      department: formData.department,
      imageUrl: formData.imageUrl,
      image_url: formData.imageUrl,
      tier,
    }

    if (selectedMember && selectedMember.id && typeof selectedMember.id !== 'number') {
      const { data, error } = await updateMagicMember(selectedMember.id, payload)
      if (!error && data) {
        if (tier === 'existing') {
          setExistingMembers((prev) => prev.map((m) => (m.id === selectedMember.id ? data : m)))
        } else {
          setProspectiveMembers((prev) => prev.map((m) => (m.id === selectedMember.id ? data : m)))
        }
        toast.success('MAGIC team member updated!')
      } else {
        updateLocalState(selectedMember.id, payload)
        toast.success('Member updated!')
      }
    } else if (selectedMember && selectedMember.id) {
      updateLocalState(selectedMember.id, payload)
      toast.success('Member updated!')
    } else {
      const { data, error } = await createMagicMember(payload)
      if (!error && data) {
        if (tier === 'existing') {
          setExistingMembers((prev) => [...prev, data])
        } else {
          setProspectiveMembers((prev) => [...prev, data])
        }
        toast.success('New MAGIC member added!')
      } else {
        const newMember = {
          id: `magic-local-${Date.now()}`,
          ...payload,
        }
        if (tier === 'existing') {
          setExistingMembers((prev) => [...prev, newMember])
        } else {
          setProspectiveMembers((prev) => [...prev, newMember])
        }
        toast.success('New MAGIC member added!')
      }
    }

    setModalOpen(false)
    setSaving(false)
  }

  const updateLocalState = (id, payload) => {
    if (tier === 'existing') {
      setExistingMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...payload } : m)))
    } else {
      setProspectiveMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...payload } : m)))
    }
  }

  const handleDeleteConfirm = async () => {
    if (!selectedMember) return
    setSaving(true)

    if (typeof selectedMember.id === 'string' && !selectedMember.id.startsWith('magic-local-')) {
      await deleteMagicMember(selectedMember.id)
    }

    setExistingMembers((prev) => prev.filter((m) => m.id !== selectedMember.id))
    setProspectiveMembers((prev) => prev.filter((m) => m.id !== selectedMember.id))

    toast.success(`Member "${selectedMember.name}" removed from MAGIC roster.`)
    setDeleteDialogOpen(false)
    setSelectedMember(null)
    setSaving(false)
  }

  const renderMemberTable = (membersList, memberTier) => (
    <AdminTable headers={['Avatar', 'Role', 'Name', 'Year & Dept', 'Tier', 'Actions']}>
      {membersList.map((m) => (
        <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
          {/* Avatar */}
          <td className="px-6 py-4">
            <div className="w-10 h-10 rounded-full bg-[#F64124]/10 border border-[#F64124]/30 overflow-hidden flex items-center justify-center flex-shrink-0">
              <img
                src={m.imageUrl || m.image_url || '/assets/team/magic-avatar.svg'}
                alt={m.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/assets/team/magic-avatar.svg'
                }}
              />
            </div>
          </td>

          {/* Role */}
          <td className="px-6 py-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F64124]/10 border border-[#F64124]/20 text-[#F64124]">
              {m.role}
            </span>
          </td>

          {/* Name */}
          <td className="px-6 py-4">
            <div className="font-bold text-white tracking-tight text-sm">
              {m.name}
            </div>
          </td>

          {/* Year & Dept */}
          <td className="px-6 py-4">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <GraduationCap size={14} className="text-white/40" />
              <span>{m.year}</span>
              <span>·</span>
              <span className="font-semibold text-white/80">{m.department}</span>
            </div>
          </td>

          {/* Tier */}
          <td className="px-6 py-4">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/5 border border-white/10 text-white/70">
              {memberTier === 'existing' ? '3rd Year Core' : '2nd Year Prospective'}
            </span>
          </td>

          {/* Actions */}
          <td className="px-6 py-4">
            <div className="flex items-center gap-2">
              <AdminActionButton
                icon="edit"
                variant="icon"
                onClick={() => handleOpenEdit(m, memberTier)}
                aria-label={`Edit ${m.name}`}
              />
              <AdminActionButton
                icon="delete"
                variant="icon"
                className="hover:text-red-400 hover:border-red-500/30"
                onClick={() => {
                  setSelectedMember(m)
                  setDeleteDialogOpen(true)
                }}
                aria-label={`Delete ${m.name}`}
              />
            </div>
          </td>
        </tr>
      ))}
    </AdminTable>
  )

  if (loading) {
    return (
      <div className="p-16 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="animate-spin text-[#F64124]" size={32} />
        <span className="text-sm text-white/50">Loading MAGIC team roster...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <AdminPageHeader
        title="MAGIC Team Management"
        subtitle="Manage executive positions across the MAGIC framework (Mastermind · Advocate · Guide · Influencer · Communicator)."
        breadcrumb={[
          { label: 'Dashboard', link: '/admin' },
          { label: 'MAGIC Team' },
        ]}
        action={
          <AdminActionButton
            label="Add Member"
            icon="plus"
            onClick={() => handleOpenAdd('existing')}
          />
        }
      />

      {/* Existing Members Card */}
      <AdminCard
        title="Existing Executive Members"
        subtitle="3rd Year Core Leadership Roster"
        action={
          <AdminActionButton
            label="Add 3rd Year Core"
            size="sm"
            variant="secondary"
            icon="plus"
            onClick={() => handleOpenAdd('existing')}
          />
        }
        noPadding
      >
        {renderMemberTable(existingMembers, 'existing')}
      </AdminCard>

      {/* Prospective Members Card */}
      <AdminCard
        title="Prospective Executive Members"
        subtitle="2nd Year Transition Leadership Team"
        action={
          <AdminActionButton
            label="Add 2nd Year Prospective"
            size="sm"
            variant="secondary"
            icon="plus"
            onClick={() => handleOpenAdd('prospective')}
          />
        }
        noPadding
      >
        {renderMemberTable(prospectiveMembers, 'prospective')}
      </AdminCard>

      {/* Add / Edit Member Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedMember ? `Edit ${selectedMember.name}` : `Add MAGIC Member (${tier})`}
        subtitle="Configure member role designation and academic details."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <AdminFormField
            label="Full Name"
            placeholder="e.g., Lokesh S S"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminFormField
              label="MAGIC Role"
              type="select"
              options={['Mastermind', 'Advocate', 'Guide', 'Influencer', 'Communicator']}
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />

            <AdminFormField
              label="Year of Study"
              type="select"
              options={['2nd Year', '3rd Year', '4th Year']}
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              required
            />
          </div>

          <AdminFormField
            label="Department"
            placeholder="e.g., AIDS, CSE, ECE, IT, AIML, IoT"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
          />

          <AdminFormField
            label="Photo File Path"
            placeholder="/assets/team/magic-avatar.svg"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            helper="Use relative path /assets/team/ or external URL."
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
              label={selectedMember ? 'Save Changes' : 'Add Member'}
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
        title="Delete Member"
        message={`Are you sure you want to remove "${selectedMember?.name}" from the MAGIC team roster?`}
        confirmText="Delete Member"
        loading={saving}
      />
    </div>
  )
}
