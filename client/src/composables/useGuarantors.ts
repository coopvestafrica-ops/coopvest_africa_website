import { ref, computed } from 'vue'
import { useApi } from './useApi'
import type { ApiResponse } from './useApi'

export interface Guarantor {
  id: string
  loan_id: string
  guarantor_user_id?: string
  guarantor_user?: {
    id: string
    first_name: string
    last_name: string
    email: string
    phone?: string
  }
  relationship: 'friend' | 'family' | 'colleague' | 'business_partner'
  relationship_label: string
  verification_status: 'pending' | 'verified' | 'rejected' | 'expired'
  verification_status_label: string
  verification_badge_color: string
  confirmation_status: 'pending' | 'accepted' | 'declined' | 'revoked'
  confirmation_status_label: string
  confirmation_badge_color: string
  employment_verification_required: boolean
  employment_verification_completed: boolean
  is_active: boolean
  is_verified: boolean
  is_confirmed: boolean
  liability_amount?: number
  documents_count: number
  invitation_sent_at?: string
  invitation_accepted_at?: string
  created_at: string
  updated_at: string
}

export interface GuarantorInvitation {
  id: string
  loan_id: string
  guarantor_email: string
  status: 'pending' | 'accepted' | 'declined' | 'expired'
  sent_at: string
  accepted_at?: string
  declined_at?: string
  expires_at: string
}

export interface VerificationDocument {
  id: string
  guarantor_id: string
  document_type: string
  file_name: string
  file_size: number
  status: 'pending' | 'verified' | 'rejected'
  rejection_reason?: string
  uploaded_at: string
  reviewed_at?: string
}

export function useGuarantors() {
  const { get, post, del } = useApi()

  // State
  const guarantors = ref<Guarantor[]>([])
  const currentGuarantor = ref<Guarantor | null>(null)
  const pendingRequests = ref<Guarantor[]>([])
  const myObligations = ref<Guarantor[]>([])
  const verificationDocuments = ref<VerificationDocument[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const activeGuarantors = computed(() =>
    guarantors.value.filter(g => g.is_active)
  )

  const pendingGuarantors = computed(() =>
    guarantors.value.filter(g => g.confirmation_status === 'pending')
  )

  const acceptedGuarantors = computed(() =>
    guarantors.value.filter(g => g.is_confirmed)
  )

  const verifiedGuarantors = computed(() =>
    guarantors.value.filter(g => g.is_verified)
  )

  // Methods
  /**
   * Fetch all guarantors for a loan
   */
  async function fetchLoanGuarantors(loanId: string) {
    loading.value = true
    error.value = null

    try {
      const response: ApiResponse<Guarantor[]> = await get<Guarantor[]>(`/loans/${loanId}/guarantors`)
      if (response.data) {
        guarantors.value = response.data
      } else {
        guarantors.value = []
      }
      return guarantors.value
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Failed to fetch guarantors'
      guarantors.value = []
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Get a specific guarantor
   */
  async function fetchGuarantor(id: string) {
    loading.value = true
    error.value = null

    try {
      const response: ApiResponse<Guarantor> = await get<Guarantor>(`/guarantors/${id}`)
      if (response.data) {
        currentGuarantor.value = response.data
      }
      return currentGuarantor.value
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Failed to fetch guarantor'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Invite a guarantor
   */
  async function inviteGuarantor(loanId: string, data: {
    guarantor_email: string
    relationship: 'friend' | 'family' | 'colleague' | 'business_partner'
    employment_verification_required?: boolean
    liability_amount?: number
  }) {
    loading.value = true
    error.value = null

    try {
      const response: ApiResponse<Guarantor> = await post<Guarantor>(`/loans/${loanId}/guarantors/invite`, data)
      if (response.data) {
        guarantors.value.push(response.data)
        return response.data
      }
      return null
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Failed to invite guarantor'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Accept guarantor invitation via QR token
   */
  async function acceptInvitation(token: string, email: string) {
    loading.value = true
    error.value = null

    try {
      const response: ApiResponse<Guarantor> = await post<Guarantor>(`/guarantor-invitations/${token}/accept`, {
        guarantor_email: email,
      })

      if (response.data) {
        currentGuarantor.value = response.data
        return response.data
      }
      return null
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Failed to accept invitation'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Decline guarantor invitation via QR token
   */
  async function declineInvitation(token: string) {
    loading.value = true
    error.value = null

    try {
      const response: ApiResponse<Guarantor> = await post<Guarantor>(`/guarantor-invitations/${token}/decline`, {})
      if (response.data) {
        currentGuarantor.value = response.data
        return response.data
      }
      return null
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Failed to decline invitation'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Get current user's pending guarantor requests
   */
  async function fetchMyPendingRequests() {
    loading.value = true
    error.value = null

    try {
      const response: ApiResponse<Guarantor[]> = await get<Guarantor[]>('/guarantor/pending-requests')
      if (response.data) {
        pendingRequests.value = response.data
      } else {
        pendingRequests.value = []
      }
      return pendingRequests.value
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Failed to fetch pending requests'
      pendingRequests.value = []
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Get current user's guarantor obligations
   */
  async function fetchMyObligations() {
    loading.value = true
    error.value = null

    try {
      const response: ApiResponse<Guarantor[]> = await get<Guarantor[]>('/guarantor/my-obligations')
      if (response.data) {
        myObligations.value = response.data
      } else {
        myObligations.value = []
      }
      return myObligations.value
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Failed to fetch obligations'
      myObligations.value = []
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Upload verification document
   */
  async function uploadVerificationDocument(
    guarantorId: string,
    documentType: string,
    file: File
  ) {
    loading.value = true
    error.value = null

    try {
      const formData = new FormData()
      formData.append('document_type', documentType)
      formData.append('document', file)

      // post without generic because FormData body handling may differ
      const response = await post(`/guarantors/${guarantorId}/documents`, formData)
      if (response.data) {
        verificationDocuments.value.push(response.data as VerificationDocument)
        return response.data as VerificationDocument
      }
      return null
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Failed to upload document'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch verification documents for a guarantor
   */
  async function fetchVerificationDocuments(guarantorId: string) {
    loading.value = true
    error.value = null

    try {
      const response: ApiResponse<VerificationDocument[]> = await get<VerificationDocument[]>(`/guarantors/${guarantorId}/documents`)
      if (response.data) {
        verificationDocuments.value = response.data
      } else {
        verificationDocuments.value = []
      }
      return verificationDocuments.value
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Failed to fetch documents'
      verificationDocuments.value = []
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Get QR code for a guarantor
   */
  async function fetchQRCode(guarantorId: string) {
    loading.value = true
    error.value = null

    try {
      const response = await get(`/guarantors/${guarantorId}/qr-code`)
      return response.data
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Failed to fetch QR code'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Remove guarantor from loan
   */
  async function removeGuarantor(loanId: string, guarantorId: string) {
    loading.value = true
    error.value = null

    try {
      await del(`/loans/${loanId}/guarantors/${guarantorId}`)
      guarantors.value = guarantors.value.filter(g => g.id !== guarantorId)
      return true
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Failed to remove guarantor'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Verify guarantor (admin only)
   */
  async function verifyGuarantor(guarantorId: string, status: 'verified' | 'rejected', reason?: string) {
    loading.value = true
    error.value = null

    try {
      const data: any = { status }
      if (status === 'rejected' && reason) {
        Object.assign(data, { rejection_reason: reason })
      }

      const response: ApiResponse<Guarantor> = await post<Guarantor>(`/guarantors/${guarantorId}/verify`, data)

      if (response.data) {
        const idx = guarantors.value.findIndex(g => g.id === guarantorId)
        if (idx !== -1) {
          guarantors.value[idx] = response.data
        }

        if (currentGuarantor.value?.id === guarantorId) {
          currentGuarantor.value = response.data
        }

        return response.data
      }
      return null
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Failed to verify guarantor'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Get relationship label
   */
  function getRelationshipLabel(relationship: string): string {
    return {
      friend: 'Friend',
      family: 'Family Member',
      colleague: 'Colleague',
      business_partner: 'Business Partner',
    }[relationship] || relationship
  }

  /**
   * Get status badge color
   */
  function getStatusBadgeColor(status: string): string {
    return {
      accepted: 'success',
      declined: 'danger',
      pending: 'warning',
      revoked: 'secondary',
      verified: 'success',
      rejected: 'danger',
      expired: 'warning',
    }[status] || 'info'
  }

  /**
   * Check if guarantor can be edited
   */
  function canEdit(guarantor: Guarantor): boolean {
    return guarantor.confirmation_status === 'pending'
  }

  /**
   * Check if guarantor can be removed
   */
  function canRemove(guarantor: Guarantor): boolean {
    return guarantor.confirmation_status !== 'accepted'
  }

  /**
   * Format currency
   */
  function formatCurrency(amount: number | null | undefined): string {
    if (!amount) return '₦0.00'
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount)
  }

  /**
   * Clear state
   */
  function clearState() {
    guarantors.value = []
    currentGuarantor.value = null
    pendingRequests.value = []
    myObligations.value = []
    verificationDocuments.value = []
    error.value = null
  }

  return {
    // State
    guarantors,
    currentGuarantor,
    pendingRequests,
    myObligations,
    verificationDocuments,
    loading,
    error,
    
    // Computed
    activeGuarantors,
    pendingGuarantors,
    acceptedGuarantors,
    verifiedGuarantors,
    
    // Methods
    fetchLoanGuarantors,
    fetchGuarantor,
    inviteGuarantor,
    acceptInvitation,
    declineInvitation,
    fetchMyPendingRequests,
    fetchMyObligations,
    uploadVerificationDocument,
    fetchVerificationDocuments,
    fetchQRCode,
    removeGuarantor,
    verifyGuarantor,
    getRelationshipLabel,
    getStatusBadgeColor,
    canEdit,
    canRemove,
    formatCurrency,
    clearState,
  }
}

