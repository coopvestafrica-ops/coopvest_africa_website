<template>
  <div class="guarantor-invite-form">
    <form @submit.prevent="handleSubmit">
      <!-- Email input -->
      <div class="form-group">
        <label for="guarantor-email" class="form-label">Guarantor Email Address *</label>
        <input
          id="guarantor-email"
          v-model="form.guarantor_email"
          type="email"
          class="form-control"
          placeholder="Enter guarantor's email"
          required
          @blur="validateEmail"
        />
        <span v-if="errors.guarantor_email" class="form-error">
          {{ errors.guarantor_email }}
        </span>
      </div>

      <!-- Relationship type -->
      <div class="form-group">
        <label for="relationship" class="form-label">Relationship *</label>
        <select
          id="relationship"
          v-model="form.relationship"
          class="form-control"
          required
        >
          <option value="">Select relationship type</option>
          <option value="friend">Friend</option>
          <option value="family">Family Member</option>
          <option value="colleague">Colleague</option>
          <option value="business_partner">Business Partner</option>
        </select>
        <span v-if="errors.relationship" class="form-error">
          {{ errors.relationship }}
        </span>
      </div>

      <!-- Liability amount -->
      <div class="form-group">
        <label for="liability-amount" class="form-label">Liability Amount</label>
        <div class="input-group">
          <span class="input-group-text">₦</span>
          <input
            id="liability-amount"
            v-model.number="form.liability_amount"
            type="number"
            class="form-control"
            placeholder="0.00"
            min="0"
            step="1000"
          />
        </div>
        <small class="form-text">Leave empty to use loan amount: {{ formatCurrency(loanAmount) }}</small>
        <span v-if="errors.liability_amount" class="form-error">
          {{ errors.liability_amount }}
        </span>
      </div>

      <!-- Employment verification -->
      <div class="form-group">
        <label class="form-checkbox">
          <input
            v-model="form.employment_verification_required"
            type="checkbox"
          />
          <span>Require employment verification</span>
        </label>
        <small class="form-text">
          Guarantor will need to upload employment documents for verification
        </small>
      </div>

      <!-- Error message -->
      <div v-if="submitError" class="alert alert-danger">
        {{ submitError }}
      </div>

      <!-- Actions -->
      <div class="form-actions">
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="loading"
        >
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Sending Invitation...' : 'Send Invitation' }}
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="$emit('cancel')"
          :disabled="loading"
        >
          Cancel
        </button>
      </div>

      <!-- Success message -->
      <div v-if="successMessage" class="alert alert-success">
        {{ successMessage }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useGuarantors } from '@/composables/useGuarantors'

interface Props {
  loanId: string
  loanAmount: number
}

defineProps<Props>()

defineEmits<{
  cancel: []
  'invitation-sent': [guarantor: any]
}>()

const { inviteGuarantor, formatCurrency } = useGuarantors()

const form = reactive({
  guarantor_email: '',
  relationship: '',
  employment_verification_required: false,
  liability_amount: null as number | null,
})

const errors = reactive({
  guarantor_email: '',
  relationship: '',
  liability_amount: '',
})

const loading = ref(false)
const submitError = ref('')
const successMessage = ref('')

function validateEmail() {
  const email = form.guarantor_email
  if (!email) {
    errors.guarantor_email = 'Email is required'
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    errors.guarantor_email = 'Please enter a valid email address'
    return false
  }
  errors.guarantor_email = ''
  return true
}

function validateForm(): boolean {
  let isValid = true

  if (!form.guarantor_email) {
    errors.guarantor_email = 'Email is required'
    isValid = false
  } else if (!validateEmail()) {
    isValid = false
  }

  if (!form.relationship) {
    errors.relationship = 'Relationship type is required'
    isValid = false
  } else {
    errors.relationship = ''
  }

  if (form.liability_amount !== null && form.liability_amount < 0) {
    errors.liability_amount = 'Liability amount cannot be negative'
    isValid = false
  } else {
    errors.liability_amount = ''
  }

  return isValid
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  loading.value = true
  submitError.value = ''
  successMessage.value = ''

  try {
    const guarantor = await inviteGuarantor(props.loanId, {
      guarantor_email: form.guarantor_email,
      relationship: form.relationship as any,
      employment_verification_required: form.employment_verification_required,
      liability_amount: form.liability_amount || undefined,
    })

    successMessage.value = `Invitation sent to ${form.guarantor_email}`
    
    // Reset form
    form.guarantor_email = ''
    form.relationship = ''
    form.employment_verification_required = false
    form.liability_amount = null

    defineEmits('invitation-sent', guarantor)
  } catch (error: any) {
    submitError.value = error.response?.data?.message || 'Failed to send invitation'
  } finally {
    loading.value = false
  }
}

const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.guarantor-invite-form {
  background: white;
  border-radius: 8px;
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
}

.form-error {
  display: block;
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
}

.form-text {
  display: block;
  color: #666;
  font-size: 12px;
  margin-top: 4px;
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  input {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
}

.input-group {
  display: flex;
  align-items: center;

  .input-group-text {
    padding: 10px 12px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-right: none;
    border-radius: 4px 0 0 4px;
    color: #666;
    font-weight: 600;
  }

  .form-control {
    border-radius: 0 4px 4px 0;
  }
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &-primary {
    background-color: #2196f3;
    color: white;

    &:hover:not(:disabled) {
      background-color: #1976d2;
    }
  }

  &-secondary {
    background-color: #757575;
    color: white;

    &:hover:not(:disabled) {
      background-color: #616161;
    }
  }
}

.spinner {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.alert {
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 13px;
  margin-top: 16px;

  &-danger {
    background-color: #ffebee;
    color: #c62828;
    border: 1px solid #ef5350;
  }

  &-success {
    background-color: #e8f5e9;
    color: #2e7d32;
    border: 1px solid #66bb6a;
  }
}
</style>
