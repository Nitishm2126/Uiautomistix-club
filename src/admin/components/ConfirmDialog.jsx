import AdminModal from './AdminModal'
import AdminActionButton from './AdminActionButton'

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed? This action cannot be undone.',
  confirmText = 'Delete',
  confirmVariant = 'danger',
  loading = false
}) {
  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="440px"
    >
      <div className="admin-confirm-body">
        <div className="admin-confirm-icon-wrapper">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <p className="admin-confirm-message">{message}</p>
      </div>

      <div className="admin-modal-actions">
        <AdminActionButton
          variant="secondary"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </AdminActionButton>
        <AdminActionButton
          variant={confirmVariant}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </AdminActionButton>
      </div>
    </AdminModal>
  )
}
