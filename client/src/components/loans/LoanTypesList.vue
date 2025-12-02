<template>
  <div class="loan-types-list-container">
    <!-- Header -->
    <div class="list-header">
      <div>
        <h2 class="list-title">Available Loan Types</h2>
        <p class="list-subtitle">Choose the loan type that best suits your needs</p>
      </div>
      <div class="header-info" v-if="activeLoanTypes.length">
        <span class="info-badge">{{ activeLoanTypes.length }} Loan Options</span>
      </div>
    </div>

    <!-- Loading State -->
    <div class="loading-state" v-if="isLoading">
      <div class="spinner"></div>
      <p>Loading loan types...</p>
    </div>

    <!-- Error State -->
    <div class="error-state" v-else-if="error">
      <p class="error-message">{{ error }}</p>
      <button class="retry-btn" @click="retryLoad">Try Again</button>
    </div>

    <!-- Filter & Sort Controls -->
    <div class="controls" v-else>
      <div class="filter-group">
        <label class="filter-label">Filter by Duration:</label>
        <select v-model="selectedDuration" class="filter-select">
          <option value="">All Durations</option>
          <option value="4">Quick (4 months)</option>
          <option value="6">Flexi (6 months)</option>
          <option value="12">Standard (12 months)</option>
          <option value="18">Extended (18 months)</option>
          <option value="24">Long-term (24 months)</option>
          <option value="36">Maximum (36 months)</option>
        </select>
      </div>

      <div class="filter-group">
        <label class="filter-label">Sort by:</label>
        <select v-model="sortBy" class="filter-select">
          <option value="interest">Interest Rate (Low to High)</option>
          <option value="amount">Loan Amount (Low to High)</option>
          <option value="duration">Duration (Short to Long)</option>
          <option value="popularity">Recommended</option>
        </select>
      </div>
    </div>

    <!-- Loan Types Grid -->
    <div class="loan-types-grid" v-if="!isLoading && !error">
      <LoanTypeCard
        v-for="loanType in filteredLoanTypes"
        :key="loanType.id"
        :loan-type="loanType"
        :selected="selectedLoanTypeId === loanType.id"
        :monthly-salary="userMonthlySalary"
        :employment-months="userEmploymentMonths"
        @select="handleSelectLoanType"
        @calculate="handleShowCalculator"
      />
    </div>

    <!-- Empty State -->
    <div class="empty-state" v-if="!isLoading && !error && activeLoanTypes.length === 0">
      <p>No loan types available at the moment</p>
    </div>

    <!-- Calculator Modal -->
    <div class="calculator-modal" v-if="showCalculatorModal && selectedLoanType">
      <div class="modal-overlay" @click="closeCalculator"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ selectedLoanType.name }} Calculator</h3>
          <button class="close-btn" @click="closeCalculator">✕</button>
        </div>
        <LoanCalculator
          :loan-type="selectedLoanType"
          @close="closeCalculator"
        />
      </div>
    </div>

    <!-- Selected Loan Info Panel -->
    <div class="selected-info" v-if="selectedLoanType && !showCalculatorModal">
      <div class="selected-header">
        <h3>Selected: {{ selectedLoanType.name }}</h3>
        <button class="clear-btn" @click="clearSelection">Clear</button>
      </div>
      <div class="selected-details">
        <div class="info-row">
          <span class="info-key">Interest Rate:</span>
          <span class="info-value">{{ selectedLoanType.interest_rate }}%</span>
        </div>
        <div class="info-row">
          <span class="info-key">Duration:</span>
          <span class="info-value">{{ selectedLoanType.duration_months }} months</span>
        </div>
        <div class="info-row">
          <span class="info-key">Max Amount:</span>
          <span class="info-value">{{ formatCurrency(selectedLoanType.maximum_amount) }}</span>
        </div>
        <button class="proceed-btn" @click="proceedToApplication">
          Proceed to Application
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useLoanTypes } from '@composables/useLoanTypes'
import LoanTypeCard from './LoanTypeCard.vue'
import LoanCalculator from './LoanCalculator.vue'
import type { LoanTypeInfo } from '@shared/types.flutter'

interface Props {
  monthlySalary?: number
  employmentMonths?: number
}

interface Emits {
  (e: 'loan-selected', loanType: LoanTypeInfo): void
}

const props = withDefaults(defineProps<Props>(), {
  monthlySalary: 0,
  employmentMonths: 0
})

const emit = defineEmits<Emits>()

const { activeLoanTypes, isLoading, error, fetchLoanTypes, getLoanTypeById, formatCurrency } = useLoanTypes()

const selectedLoanTypeId = ref<string | number | null>(null)
const selectedDuration = ref('')
const sortBy = ref('interest')
const showCalculatorModal = ref(false)
const userMonthlySalary = ref(props.monthlySalary)
const userEmploymentMonths = ref(props.employmentMonths)

// Update user data when props change
watch(() => props.monthlySalary, (newVal) => {
  userMonthlySalary.value = newVal
})

watch(() => props.employmentMonths, (newVal) => {
  userEmploymentMonths.value = newVal
})

const selectedLoanType = computed(() => {
  if (!selectedLoanTypeId.value) return null
  return getLoanTypeById(selectedLoanTypeId.value) || null
})

const filteredLoanTypes = computed(() => {
  let filtered = activeLoanTypes.value

  // Filter by duration
  if (selectedDuration.value) {
    filtered = filtered.filter(lt => lt.duration_months === parseInt(selectedDuration.value))
  }

  // Sort
  switch (sortBy.value) {
    case 'interest':
      return filtered.sort((a, b) => a.interest_rate - b.interest_rate)
    case 'amount':
      return filtered.sort((a, b) => a.minimum_amount - b.minimum_amount)
    case 'duration':
      return filtered.sort((a, b) => a.duration_months - b.duration_months)
    case 'popularity':
      // Quick and Flexi are most popular
      return filtered.sort((a, b) => {
        const popularOrder: Record<string, number> = {
          'Quick Loan': 1,
          'Flexi Loan': 2,
          'Stable Loan (12 months)': 3,
          'Stable Loan (18 months)': 4,
          'Premium Loan': 5,
          'Maxi Loan': 6
        }
        return (popularOrder[a.name] || 999) - (popularOrder[b.name] || 999)
      })
    default:
      return filtered
  }
})

const handleSelectLoanType = (loanTypeId: string | number) => {
  selectedLoanTypeId.value = loanTypeId
  if (selectedLoanType.value) {
    emit('loan-selected', selectedLoanType.value)
  }
}

const handleShowCalculator = (loanTypeId: string | number) => {
  selectedLoanTypeId.value = loanTypeId
  showCalculatorModal.value = true
}

const closeCalculator = () => {
  showCalculatorModal.value = false
}

const clearSelection = () => {
  selectedLoanTypeId.value = null
}

const proceedToApplication = () => {
  if (selectedLoanType.value) {
    // Emit event for parent to handle navigation
    window.location.href = `/loans/apply?type=${selectedLoanType.value.id}`
  }
}

const retryLoad = () => {
  fetchLoanTypes()
}
</script>

<style scoped>
.loan-types-list-container {
  background: white;
  border-radius: 12px;
  padding: 32px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.list-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.list-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 8px 0 0 0;
}

.header-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.info-badge {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.filter-select {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.filter-select:hover {
  border-color: #3b82f6;
}

.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.loading-state,
.error-state {
  text-align: center;
  padding: 48px 32px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  color: #dc2626;
  margin-bottom: 16px;
}

.retry-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.retry-btn:hover {
  background: #2563eb;
}

.loan-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.empty-state {
  text-align: center;
  padding: 48px 32px;
  color: #6b7280;
}

.calculator-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.modal-content {
  position: relative;
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
}

.close-btn:hover {
  color: #1f2937;
}

.selected-info {
  background: linear-gradient(135deg, #f0f9ff 0%, #f5f7fa 100%);
  border: 2px solid #3b82f6;
  border-radius: 12px;
  padding: 24px;
  margin-top: 24px;
}

.selected-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.selected-header h3 {
  margin: 0;
  font-size: 18px;
  color: #1f2937;
}

.clear-btn {
  background: white;
  border: 1px solid #d1d5db;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}

.clear-btn:hover {
  border-color: #9ca3af;
}

.selected-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: white;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
}

.info-key {
  font-weight: 600;
  color: #6b7280;
}

.info-value {
  font-weight: 700;
  color: #1f2937;
}

.proceed-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: all 0.3s ease;
}

.proceed-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

@media (max-width: 1024px) {
  .loan-types-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 640px) {
  .loan-types-list-container {
    padding: 16px;
  }

  .list-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .list-title {
    font-size: 22px;
  }

  .loan-types-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .controls {
    grid-template-columns: 1fr;
  }

  .modal-content {
    width: 95%;
  }
}
</style>
