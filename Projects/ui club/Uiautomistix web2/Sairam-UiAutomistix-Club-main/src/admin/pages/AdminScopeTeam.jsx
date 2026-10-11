import { useState, useEffect } from 'react'
import { ShieldCheck, UserX, AlertCircle, Loader2 } from 'lucide-react'
import AdminPageHeader from '../components/AdminPageHeader'
import AdminCard from '../components/AdminCard'
import AdminTable from '../components/AdminTable'
import AdminActionButton from '../components/AdminActionButton'
import AdminModal from '../components/AdminModal'
import AdminFormField from '../components/AdminFormField'
import { useToast } from '../components/ToastContext'
import { getScopeTeamData } from '../data/adminData'
import { getAllScopeMembers, updateScopeMember } from '../../services/scopeService'

export default function AdminScopeTeam() {
  const toast = useToast()
  const [scopeMembers, setScopeMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    department: '',
    imageUrl: '/assets/team/scope-avatar.svg',
  })

  useEffect(() => {
    loadScopeMembers()
  }, [])

  async function loadScopeMembers() {
    setLoading(true)
    const { data, error } = await getAllScopeMembers()
    if (!error && data && data.length > 0) {
      setScopeMembers(data)
    } else {
      const fallback = getScopeTeamData()
      setScopeMembers(fallback)
    }
    setLoading(false)
  }

  const handleEditRole = (member) => {
    setSelectedRole(member)
    setFormData({
      role: member.role || '',
      name: member.name === 'To be provided' ? '' : member.name || '',
      department: member.department === 'To be provided' ? '' : member.department || '',
      imageUrl: member.imageUrl || member.image_url || '/assets/team/scope-avatar.svg',
    })
    setModalOpen(true)
  }

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    setSaving(true)

    const payload = {
      role: formData.role,
      name: formData.name || 'To be provided',
      department: formData.department || 'To be provided',
      imageUrl: formData.imageUrl,
      image_url: formData.imageUrl,
    }

    if (selectedRole && selectedRole.id && typeof selectedRole.id !== 'number') {
      const { data, error } = await updateScopeMember(selectedRole.id, payload)
      if (!error && data) {
        setScopeMembers((prev) => prev.map((m) => (m.id === selectedRole.id ? data : m)))
        toast.success(`SCOPE ${formData.role} role updated!`)
      } else {
        setScopeMembers((prev) => prev.map((m) => (m.id === selectedRole.id ? { ...m, ...payload } : m)))
        toast.success(`SCOPE ${formData.role} role assignment saved!`)
      }
    } else if (selectedRole && selectedRole.id) {
      setScopeMembers((prev) => prev.map((m) => (m.id === selectedRole.id ? { ...m, ...payload } : m)))
      toast.success(`SCOPE ${formData.role} assignment updated!`)
    }

    setModalOpen(false)
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="p-16 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="animate-spin text-[#F64124]" size={32} />
        <span className="text-sm text-white/50">Loading SCOPE framework roles...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminPageHeader
        title="SCOPE Team Management"
        subtitle="Manage leadership positions across the SCOPE framework (Strategist · Captain · Organiser · Propagator · Executer)."
        breadcrumb={[
          { label: 'Dashboard', link: '/admin' },
          { label: 'SCOPE Team' },
        ]}
      />

      {/* Notice Callout */}
      <div className="admin-notice admin-notice-amber">
        <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-300">Notice: </span>
          SCOPE operational designations are fixed core framework positions. Assign official student leaders as designations are finalized.
        </div>
      </div>

      {/* SCOPE Table Card */}
      <AdminCard
        title="Official SCOPE Roles Architecture"
        subtitle="5 Core Operational Leadership Designations"
        noPadding
      >
        <AdminTable headers={['Avatar', 'Designation', 'Assigned Student Lead', 'Department', 'Status', 'Actions']}>
          {scopeMembers.map((member) => {
            const isAssigned = member.name && member.name !== 'To be provided' && member.name.trim() !== ''

            return (
              <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                {/* Avatar */}
                <td className="px-6 py-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-dashed border-white/20 overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img
                      src={member.imageUrl || member.image_url || '/assets/team/scope-avatar.svg'}
                      alt={member.role}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/team/scope-avatar.svg'
                      }}
                    />
                  </div>
                </td>

                {/* Designation */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F64124]/10 border border-[#F64124]/20 text-[#F64124]">
                    <ShieldCheck size={13} />
                    {member.role}
                  </span>
                </td>

                {/* Assigned Member */}
                <td className="px-6 py-4">
                  {isAssigned ? (
                    <span className="font-bold text-white text-sm">{member.name}</span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/40 italic">
                      <UserX size={13} /> Name pending assignment
                    </span>
                  )}
                </td>

                {/* Department */}
                <td className="px-6 py-4">
                  {isAssigned ? (
                    <span className="text-xs text-white/80 font-medium">{member.department}</span>
                  ) : (
                    <span className="text-xs text-white/30 italic">Not set</span>
                  )}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  {isAssigned ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      Assigned
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      Pending
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <AdminActionButton
                    label={isAssigned ? 'Edit' : 'Assign'}
                    icon={isAssigned ? 'edit' : 'plus'}
                    size="sm"
                    variant={isAssigned ? 'secondary' : 'primary'}
                    onClick={() => handleEditRole(member)}
                  />
                </td>
              </tr>
            )
          })}
        </AdminTable>
      </AdminCard>

      {/* Assign / Edit SCOPE Member Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Configure ${selectedRole?.role || 'SCOPE Position'}`}
        subtitle="Assign an official student lead and department to this SCOPE framework position."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <AdminFormField
            label="Designation (Fixed)"
            value={formData.role}
            disabled
            helper="SCOPE framework designations are fixed core leadership roles."
          />

          <AdminFormField
            label="Student Lead Name"
            placeholder="Enter student lead's full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <AdminFormField
            label="Department"
            placeholder="e.g., CSE, AIDS, ECE, IT, Mechanical"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
          />

          <AdminFormField
            label="Avatar / Photo File Path"
            placeholder="/assets/team/scope-avatar.svg"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            helper="Path to student photo in public/assets/ folder or external web URL."
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
              label="Save Assignment"
              loading={saving}
            />
          </div>
        </form>
      </AdminModal>
    </div>
  )
}
