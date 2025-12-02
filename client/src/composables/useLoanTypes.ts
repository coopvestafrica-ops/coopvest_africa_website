/**
 * Loan Types Composable
 * Manages loan type state, fetching, and calculations
 */

import { ref, computed, onMounted } from 'vue'
import { useApi } from './useApi'
import type { LoanTypeInfo, ApiResponse } from '@shared/types.flutter'

export function useLoanTypes() {
  const { request } = useApi()

  // State
  const loanTypes = ref<LoanTypeInfo[]>([])
  const selectedLoanType = ref<LoanTypeInfo | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const activeLoanTypes = computed(() => 
    loanTypes.value.filter((lt: LoanTypeInfo) => lt.isActive)
  )

  const loanTypesByDuration = computed(() => {
    const grouped: Record<number, LoanTypeInfo[]> = {}
    activeLoanTypes.value.forEach((lt: LoanTypeInfo) => {
      if (!grouped[lt.durationMonths]) {
        grouped[lt.durationMonths] = []
      }
      grouped[lt.durationMonths].push(lt)
    })
    return grouped
  })

  const loanTypesByAmount = computed(() => {
    return activeLoanTypes.value.sort((a: LoanTypeInfo, b: LoanTypeInfo) => 
      a.minimumAmount - b.minimumAmount
    )
  })

  /**
   * Fetch all loan types from API
   */
  const fetchLoanTypes = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await request<LoanTypeInfo[]>('/api/loan-types', {
        method: 'GET'
      })

      if (response?.data) {
        loanTypes.value = response.data as LoanTypeInfo[]
      }
    } catch (err: any) {
      error.value = err?.message || 'Failed to fetch loan types'
      console.error('Error fetching loan types:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get loan type by ID
   */
  const getLoanTypeById = (id: number | string): LoanTypeInfo | undefined => {
    return loanTypes.value.find((lt: LoanTypeInfo) => lt.id === id)
  }

  /**
   * Get loan type by name
   */
  const getLoanTypeByName = (name: string): LoanTypeInfo | undefined => {
    return loanTypes.value.find((lt: LoanTypeInfo) => lt.name.toLowerCase() === name.toLowerCase())
  }
  /**
   * Select a loan type
   */
  const selectLoanType = (loanTypeId: number | string) => {
    const selected = getLoanTypeById(loanTypeId)
    if (selected) {
      selectedLoanType.value = selected
      return true
    }
    return false
  }

  /**
   * Calculate monthly payment for a loan type
   * Using EMI formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
   */
  const calculateMonthlyPayment = (
    amount: number,
    loanTypeId: number | string,
    tenureMonths?: number
  ): number => {
    const loanType = getLoanTypeById(loanTypeId)
    if (!loanType) return 0

    const tenure = tenureMonths || loanType.durationMonths
    const monthlyRate = loanType.interestRate / 12 / 100

    if (monthlyRate === 0) {
      return amount / tenure
    }

    const power = Math.pow(1 + monthlyRate, tenure)
    return (amount * monthlyRate * power) / (power - 1)
  }

  /**
   * Calculate total interest for a loan
   */
  const calculateTotalInterest = (
    amount: number,
    loanTypeId: number | string,
    tenureMonths?: number
  ): number => {
    const monthlyPayment = calculateMonthlyPayment(amount, loanTypeId, tenureMonths)
    const loanType = getLoanTypeById(loanTypeId)
    if (!loanType) return 0

    const tenure = tenureMonths || loanType.durationMonths
    const totalPayment = monthlyPayment * tenure
    return totalPayment - amount
  }

  /**
   * Calculate total amount to be paid
   */
  const calculateTotalPayment = (
    amount: number,
    loanTypeId: number | string,
    tenureMonths?: number
  ): number => {
    const loanType = getLoanTypeById(loanTypeId)
    if (!loanType) return amount

    const totalInterest = calculateTotalInterest(amount, loanTypeId, tenureMonths)
    const processingFee = (amount * loanType.processingFeePercentage) / 100
    return amount + totalInterest + processingFee
  }

  /**
   * Calculate processing fee
   */
  const calculateProcessingFee = (
    amount: number,
    loanTypeId: number | string
  ): number => {
    const loanType = getLoanTypeById(loanTypeId)
    if (!loanType) return 0
    return (amount * loanType.processingFeePercentage) / 100
  }

  /**
   * Check if user is eligible for a loan type
   */
  const isEligible = (
    monthlySalary: number,
    employmentMonths: number,
    loanTypeId: number | string
  ): boolean => {
    const loanType = getLoanTypeById(loanTypeId)
    if (!loanType) return false

    // Check salary requirement
    if (loanType.minimumSalary && monthlySalary < loanType.minimumSalary) {
      return false
    }

    // Check employment duration requirement
    if (loanType.minimumEmploymentMonths && employmentMonths < loanType.minimumEmploymentMonths) {
      return false
    }

    return true
  }

  /**
   * Get eligibility reasons (for user feedback)
   */
  const getEligibilityReasons = (
    monthlySalary: number,
    employmentMonths: number,
    loanTypeId: number | string
  ): string[] => {
    const loanType = getLoanTypeById(loanTypeId)
    if (!loanType) return []

    const reasons: string[] = []

    if (loanType.minimumSalary && monthlySalary < loanType.minimumSalary) {
      reasons.push(
        `Minimum salary required: ₦${loanType.minimumSalary.toLocaleString()} (Your salary: ₦${monthlySalary.toLocaleString()})`
      )
    }

    if (loanType.minimumEmploymentMonths && employmentMonths < loanType.minimumEmploymentMonths) {
      reasons.push(
        `Minimum employment duration: ${loanType.minimumEmploymentMonths} months (Your employment: ${employmentMonths} months)`
      )
    }

    if (loanType.requiresGuarantor) {
      reasons.push('This loan type requires at least one guarantor')
    }

    return reasons
  }

  /**
   * Generate payment schedule
   */
  const generatePaymentSchedule = (
    amount: number,
    loanTypeId: number | string,
    tenureMonths?: number
  ) => {
    const loanType = getLoanTypeById(loanTypeId)
    if (!loanType) return []

    const tenure = tenureMonths || loanType.durationMonths
    const monthlyPayment = calculateMonthlyPayment(amount, loanTypeId, tenure)
    const schedule = []

    let remainingBalance = amount
    const startDate = new Date()

    for (let i = 1; i <= tenure; i++) {
      const paymentDate = new Date(startDate)
      paymentDate.setMonth(paymentDate.getMonth() + i)

      const principalPayment = monthlyPayment / (1 + (loanType.interestRate / 100))
      const interestPayment = monthlyPayment - principalPayment
      remainingBalance -= principalPayment

      schedule.push({
        month: i,
        paymentDate: paymentDate.toISOString().split('T')[0],
        monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
        principalPayment: parseFloat(principalPayment.toFixed(2)),
        interestPayment: parseFloat(interestPayment.toFixed(2)),
        remainingBalance: parseFloat(Math.max(0, remainingBalance).toFixed(2))
      })
    }

    return schedule
  }

  /**
   * Format currency
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount)
  }

  /**
   * Load loan types on composable mount
   */
  onMounted(() => {
    fetchLoanTypes()
  })

  return {
    // State
    loanTypes,
    selectedLoanType,
    isLoading,
    error,

    // Computed
    activeLoanTypes,
    loanTypesByDuration,
    loanTypesByAmount,

    // Methods
    fetchLoanTypes,
    getLoanTypeById,
    getLoanTypeByName,
    selectLoanType,
    calculateMonthlyPayment,
    calculateTotalInterest,
    calculateTotalPayment,
    calculateProcessingFee,
    isEligible,
    getEligibilityReasons,
    generatePaymentSchedule,
    formatCurrency
  }
}
