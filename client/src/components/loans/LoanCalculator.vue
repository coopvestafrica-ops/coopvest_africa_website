<template>
  <div class="loan-calculator">
    <div class="calculator-body">
      <!-- Input Section -->
      <div class="input-section">
        <div class="input-group">
          <label class="input-label">Loan Amount</label>
          <div class="input-wrapper">
            <span class="currency-symbol">₦</span>
            <input
              v-model.number="loanAmount"
              type="number"
              class="input-field"
              :min="loanType.minimum_amount"
              :max="loanType.maximum_amount"
              @input="calculatePayment"
            />
          </div>
          <div class="range-hint">
            Range: ₦{{ formatNumber(loanType.minimum_amount) }} - ₦{{ formatNumber(loanType.maximum_amount) }}
          </div>
        </div>

        <div class="input-group">
          <label class="input-label">Loan Duration (Months)</label>
          <div class="duration-selector">
            <button
              v-for="duration in durationOptions"
              :key="duration"
              class="duration-btn"
              :class="{ active: selectedDuration === duration }"
              @click="changeDuration(duration)"
            >
              {{ duration }}m
            </button>
          </div>
          <div class="custom-duration">
            <input
              v-model.number="selectedDuration"
              type="number"
              class="input-field"
              min="1"
              :max="36"
              placeholder="Custom (months)"
              @input="calculatePayment"
            />
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div class="results-section" v-if="calculatedAmount > 0">
        <h3 class="results-title">Loan Breakdown</h3>

        <div class="result-card primary">
          <div class="result-row">
            <span class="result-label">Monthly Payment</span>
            <span class="result-value">{{ formatCurrency(monthlyPayment) }}</span>
          </div>
        </div>

        <div class="results-grid">
          <div class="result-card">
            <div class="card-label">Loan Amount</div>
            <div class="card-value">{{ formatCurrency(loanAmount) }}</div>
          </div>
          <div class="result-card">
            <div class="card-label">Interest Rate</div>
            <div class="card-value">{{ loanType.interest_rate }}%</div>
          </div>
          <div class="result-card">
            <div class="card-label">Total Interest</div>
            <div class="card-value">{{ formatCurrency(totalInterest) }}</div>
          </div>
          <div class="result-card">
            <div class="card-label">Processing Fee</div>
            <div class="card-value">{{ formatCurrency(processingFee) }}</div>
          </div>
          <div class="result-card">
            <div class="card-label">Total Duration</div>
            <div class="card-value">{{ selectedDuration }} months</div>
          </div>
          <div class="result-card highlight">
            <div class="card-label">Total Payment</div>
            <div class="card-value">{{ formatCurrency(totalPayment) }}</div>
          </div>
        </div>

        <!-- Payment Schedule Toggle -->
        <button class="toggle-schedule-btn" @click="showSchedule = !showSchedule">
          {{ showSchedule ? '▼' : '▶' }} View Payment Schedule
        </button>

        <!-- Payment Schedule Table -->
        <div class="schedule-table" v-if="showSchedule">
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Payment</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(payment, idx) in paymentSchedule.slice(0, 12)" :key="idx">
                <td>{{ payment.month }}</td>
                <td>{{ formatCurrency(payment.monthlyPayment) }}</td>
                <td>{{ formatCurrency(payment.principalPayment) }}</td>
                <td>{{ formatCurrency(payment.interestPayment) }}</td>
                <td>{{ formatCurrency(payment.remainingBalance) }}</td>
              </tr>
              <tr v-if="paymentSchedule.length > 12" class="more-row">
                <td colspan="5" style="text-align: center; color: #6b7280;">
                  ... and {{ paymentSchedule.length - 12 }} more months
                </td>
              </tr>
            </tbody>
          </table>
          <button class="download-schedule-btn" @click="downloadSchedule">
            📥 Download Full Schedule
          </button>
        </div>

        <!-- Summary Info -->
        <div class="summary-info">
          <div class="info-item">
            <span class="info-icon">💡</span>
            <span class="info-text">Total amount to be paid: <strong>{{ formatCurrency(totalPayment) }}</strong></span>
          </div>
          <div class="info-item">
            <span class="info-icon">📅</span>
            <span class="info-text">Repayment period: <strong>{{ selectedDuration }} months</strong></span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="btn btn-secondary" @click="resetCalculator">
          Reset
        </button>
        <button class="btn btn-primary" @click="applyWithThisLoan">
          Apply for This Loan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLoanTypes } from '@composables/useLoanTypes'
import type { LoanTypeInfo } from '@shared/types.flutter'

interface Props {
  loanType: LoanTypeInfo
}

interface Emits {
  (e: 'close'): void
  (e: 'apply', data: { loanTypeId: string | number; amount: number; duration: number }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { calculateMonthlyPayment, calculateTotalInterest, calculateProcessingFee, generatePaymentSchedule, formatCurrency } = useLoanTypes()

const loanAmount = ref(props.loanType.minimum_amount)
const selectedDuration = ref(props.loanType.duration_months)
const showSchedule = ref(false)

const durationOptions = computed(() => {
  const durations: number[] = []
  for (let i = 1; i <= 36; i++) {
    if ([1, 3, 4, 6, 12, 18, 24, 36].includes(i)) {
      durations.push(i)
    }
  }
  return durations
})

const calculatedAmount = computed(() => loanAmount.value || props.loanType.minimum_amount)

const monthlyPayment = computed(() => {
  return calculateMonthlyPayment(calculatedAmount.value, props.loanType.id, selectedDuration.value)
})

const totalInterest = computed(() => {
  return calculateTotalInterest(calculatedAmount.value, props.loanType.id, selectedDuration.value)
})

const processingFee = computed(() => {
  return calculateProcessingFee(calculatedAmount.value, props.loanType.id)
})

const totalPayment = computed(() => {
  return calculatedAmount.value + totalInterest.value + processingFee.value
})

const paymentSchedule = computed(() => {
  return generatePaymentSchedule(calculatedAmount.value, props.loanType.id, selectedDuration.value)
})

const calculatePayment = () => {
  // Reactivity trigger
}

const changeDuration = (duration: number) => {
  selectedDuration.value = duration
}

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-NG')
}

const resetCalculator = () => {
  loanAmount.value = props.loanType.minimum_amount
  selectedDuration.value = props.loanType.duration_months
  showSchedule.value = false
}

const applyWithThisLoan = () => {
  emit('apply', {
    loanTypeId: props.loanType.id,
    amount: calculatedAmount.value,
    duration: selectedDuration.value
  })
}

const downloadSchedule = () => {
  const csv = generateCSV()
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `payment-schedule-${props.loanType.name}.csv`
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

const generateCSV = (): string => {
  let csv = `${props.loanType.name} - Payment Schedule\n`
  csv += `Loan Amount: ${formatCurrency(calculatedAmount.value)}\n`
  csv += `Duration: ${selectedDuration.value} months\n`
  csv += `Interest Rate: ${props.loanType.interest_rate}%\n\n`
  csv += 'Month,Payment,Principal,Interest,Remaining Balance\n'

  paymentSchedule.value.forEach(payment => {
    csv += `${payment.month},${payment.monthlyPayment},${payment.principalPayment},${payment.interestPayment},${payment.remainingBalance}\n`
  })

  return csv
}
</script>

<style scoped>
.loan-calculator {
  padding: 20px;
}

.calculator-body {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.input-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.currency-symbol {
  position: absolute;
  left: 12px;
  font-weight: 700;
  color: #6b7280;
  pointer-events: none;
}

.input-field {
  width: 100%;
  padding: 10px 12px 10px 32px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.range-hint {
  font-size: 12px;
  color: #6b7280;
}

.duration-selector {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.duration-btn {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  transition: all 0.3s ease;
}

.duration-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.duration-btn.active {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border-color: #2563eb;
}

.custom-duration {
  margin-top: 8px;
}

.results-section {
  background: #f9fafb;
  border-radius: 8px;
  padding: 20px;
}

.results-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
}

.result-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px;
}

.result-card.primary {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
}

.result-card.primary .result-label {
  color: rgba(255, 255, 255, 0.8);
}

.result-card.primary .result-value {
  color: white;
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-label {
  font-size: 14px;
  color: #6b7280;
}

.result-value {
  font-size: 22px;
  font-weight: 700;
  color: #1f2937;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.card-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.card-value {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
}

.result-card.highlight {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: none;
}

.result-card.highlight .card-label {
  color: rgba(255, 255, 255, 0.8);
}

.result-card.highlight .card-value {
  color: white;
}

.toggle-schedule-btn {
  width: 100%;
  padding: 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-schedule-btn:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.schedule-table {
  margin-top: 16px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

thead {
  background: #f3f4f6;
}

th {
  padding: 10px;
  text-align: right;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
}

th:first-child,
td:first-child {
  text-align: left;
}

td {
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
}

tbody tr:hover {
  background: #f9fafb;
}

.more-row {
  background: #f3f4f6;
}

.download-schedule-btn {
  width: 100%;
  margin-top: 12px;
  padding: 10px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.download-schedule-btn:hover {
  background: #e5e7eb;
}

.summary-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  background: white;
  border-left: 3px solid #3b82f6;
  border-radius: 4px;
}

.info-item {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
  color: #374151;
}

.info-icon {
  font-size: 16px;
}

.info-text {
  line-height: 1.4;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background: white;
  color: #3b82f6;
  border: 2px solid #3b82f6;
}

.btn-secondary:hover {
  background: #eff6ff;
}

@media (max-width: 640px) {
  .input-section {
    grid-template-columns: 1fr;
  }

  .results-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .action-buttons {
    flex-direction: column;
  }

  table {
    font-size: 12px;
  }

  th,
  td {
    padding: 8px;
  }
}
</style>
