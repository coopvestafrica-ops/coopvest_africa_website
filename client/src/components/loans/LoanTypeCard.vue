<template>
  <div class="loan-type-card" :class="{ selected, 'not-eligible': !isEligible }">
    <!-- Badge -->
    <div class="card-badge" v-if="badge">
      <span class="badge-text">{{ badge }}</span>
    </div>

    <!-- Header -->
    <div class="card-header">
      <h3 class="card-title">{{ loanType.name }}</h3>
      <p class="card-description">{{ loanType.description }}</p>
    </div>

    <!-- Rate Badge -->
    <div class="rate-badge">
      <span class="rate-value">{{ loanType.interest_rate }}%</span>
      <span class="rate-label">Interest Rate</span>
    </div>

    <!-- Key Details -->
    <div class="details-grid">
      <div class="detail-item">
        <span class="detail-label">Duration</span>
        <span class="detail-value">{{ loanType.duration_months }} months</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Amount Range</span>
        <span class="detail-value">
          {{ formatCurrency(loanType.minimum_amount) }} - {{ formatCurrency(loanType.maximum_amount) }}
        </span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Processing Fee</span>
        <span class="detail-value">{{ loanType.processing_fee_percentage }}%</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Guarantor Required</span>
        <span class="detail-value">{{ loanType.requires_guarantor ? '✓ Yes' : '✗ No' }}</span>
      </div>
    </div>

    <!-- Features -->
    <div class="features" v-if="loanType.eligibility_requirements?.length">
      <div class="features-label">Requirements:</div>
      <ul class="features-list">
        <li v-for="(req, idx) in loanType.eligibility_requirements.slice(0, 3)" :key="idx" class="feature-item">
          {{ req }}
        </li>
        <li v-if="loanType.eligibility_requirements.length > 3" class="feature-item more">
          +{{ loanType.eligibility_requirements.length - 3 }} more
        </li>
      </ul>
    </div>

    <!-- Eligibility Warning -->
    <div class="eligibility-warning" v-if="!isEligible && eligibilityReasons.length">
      <div class="warning-title">Not Currently Eligible</div>
      <ul class="warning-reasons">
        <li v-for="(reason, idx) in eligibilityReasons" :key="idx">{{ reason }}</li>
      </ul>
    </div>

    <!-- Action Button -->
    <button 
      class="action-btn"
      :disabled="!isEligible || !loanType.is_active"
      @click="handleSelect"
    >
      <span v-if="isEligible && loanType.is_active">
        {{ selected ? 'Selected' : 'Select Loan' }}
      </span>
      <span v-else>
        {{ !loanType.is_active ? 'Unavailable' : 'Not Eligible' }}
      </span>
    </button>

    <!-- Quick Calculator Link -->
    <button 
      v-if="isEligible && loanType.is_active"
      class="calculator-btn"
      @click="showCalculator"
    >
      📊 Quick Calculator
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLoanTypes } from '@composables/useLoanTypes'
import type { LoanTypeInfo } from '@shared/types.flutter'

interface Props {
  loanType: LoanTypeInfo
  selected?: boolean
  monthlySalary?: number
  employmentMonths?: number
}

interface Emits {
  (e: 'select', loanTypeId: string | number): void
  (e: 'calculate', loanTypeId: string | number): void
}

const props = withDefaults(defineProps<Props>(), {
  selected: false,
  monthlySalary: 0,
  employmentMonths: 0
})

const emit = defineEmits<Emits>()

const { isEligible, getEligibilityReasons, formatCurrency } = useLoanTypes()

// Determine if user is eligible for this loan type
const eligibilityCheck = computed(() => {
  if (!props.monthlySalary || !props.employmentMonths) {
    return true // Show as eligible if no data provided
  }
  return isEligible(props.monthlySalary, props.employmentMonths, props.loanType.id)
})

const eligibilityReasons = computed(() => {
  if (!props.monthlySalary || !props.employmentMonths) {
    return []
  }
  return getEligibilityReasons(props.monthlySalary, props.employmentMonths, props.loanType.id)
})

// Determine badge text
const badge = computed(() => {
  if (props.loanType.interest_rate < 7) {
    return 'Best Rate'
  } else if (props.loanType.duration_months <= 6) {
    return 'Quick'
  } else if (props.loanType.maximum_amount > 80000) {
    return 'High Amount'
  }
  return null
})

const handleSelect = () => {
  if (eligibilityCheck.value && props.loanType.is_active) {
    emit('select', props.loanType.id)
  }
}

const showCalculator = () => {
  emit('calculate', props.loanType.id)
}
</script>

<style scoped>
.loan-type-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.loan-type-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.1);
}

.loan-type-card.selected {
  border-color: #10b981;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.15);
}

.loan-type-card.not-eligible {
  opacity: 0.6;
  background-color: #f9fafb;
}

.card-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.card-header {
  margin-bottom: 16px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.card-description {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.rate-badge {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 16px;
}

.rate-value {
  display: block;
  font-size: 28px;
  font-weight: 700;
}

.rate-label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  opacity: 0.9;
  margin-top: 4px;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background: #f3f4f6;
  border-radius: 6px;
}

.detail-label {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.detail-value {
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
}

.features {
  margin-bottom: 16px;
  padding: 12px;
  background: #f0f9ff;
  border-left: 3px solid #3b82f6;
  border-radius: 4px;
}

.features-label {
  font-size: 12px;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 8px;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  font-size: 13px;
  color: #1f2937;
  margin-bottom: 4px;
  padding-left: 20px;
  position: relative;
}

.feature-item::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

.feature-item.more {
  color: #6b7280;
  font-weight: 600;
}

.eligibility-warning {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
}

.warning-title {
  font-size: 12px;
  font-weight: 700;
  color: #dc2626;
  margin-bottom: 8px;
}

.warning-reasons {
  list-style: none;
  padding: 0;
  margin: 0;
}

.warning-reasons li {
  font-size: 12px;
  color: #991b1b;
  margin-bottom: 4px;
  padding-left: 16px;
  position: relative;
}

.warning-reasons li::before {
  content: '!';
  position: absolute;
  left: 0;
  font-weight: bold;
}

.action-btn,
.calculator-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 8px;
}

.action-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.action-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.action-btn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.calculator-btn {
  background: white;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  font-weight: 600;
}

.calculator-btn:hover {
  background: #eff6ff;
}

@media (max-width: 640px) {
  .loan-type-card {
    padding: 16px;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .card-title {
    font-size: 16px;
  }

  .rate-value {
    font-size: 24px;
  }
}
</style>
