<template>
  <div class="guarantor-card" :class="{'guarantor-card--active': guarantor.is_active}">
    <!-- Header -->
    <div class="guarantor-card__header">
      <div class="guarantor-card__info">
        <h4 class="guarantor-card__name">
          {{ guarantor.guarantor_user?.first_name }} {{ guarantor.guarantor_user?.last_name }}
        </h4>
        <p class="guarantor-card__email">{{ guarantor.guarantor_user?.email }}</p>
      </div>
      <div class="guarantor-card__badges">
        <span class="badge" :class="`badge--${guarantor.confirmation_badge_color}`">
          {{ guarantor.confirmation_status_label }}
        </span>
        <span class="badge" :class="`badge--${guarantor.verification_badge_color}`">
          {{ guarantor.verification_status_label }}
        </span>
      </div>
    </div>

    <!-- Details -->
    <div class="guarantor-card__details">
      <div class="detail-item">
        <span class="detail-label">Relationship</span>
        <span class="detail-value">{{ guarantor.relationship_label }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Liability</span>
        <span class="detail-value">{{ formatCurrency(guarantor.liability_amount) }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Documents</span>
        <span class="detail-value">{{ guarantor.documents_count }}</span>
      </div>
      <div class="detail-item" v-if="guarantor.employment_verification_required">
        <span class="detail-label">Employment Verification</span>
        <span class="detail-value">
          <i :class="guarantor.employment_verification_completed ? 'icon-check' : 'icon-clock'"></i>
          {{ guarantor.employment_verification_completed ? 'Completed' : 'Pending' }}
        </span>
      </div>
    </div>

    <!-- Timeline -->
    <div class="guarantor-card__timeline" v-if="showTimeline">
      <div class="timeline-item" v-if="guarantor.invitation_sent_at">
        <span class="timeline-marker">📤</span>
        <div class="timeline-content">
          <p class="timeline-label">Invitation Sent</p>
          <p class="timeline-date">{{ formatDate(guarantor.invitation_sent_at) }}</p>
        </div>
      </div>
      <div class="timeline-item" v-if="guarantor.invitation_accepted_at">
        <span class="timeline-marker">✅</span>
        <div class="timeline-content">
          <p class="timeline-label">Invitation Accepted</p>
          <p class="timeline-date">{{ formatDate(guarantor.invitation_accepted_at) }}</p>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="guarantor-card__actions" v-if="showActions">
      <button 
        v-if="canEdit"
        class="btn btn-sm btn-secondary"
        @click="$emit('edit')"
      >
        Edit
      </button>
      <button 
        v-if="canRemove"
        class="btn btn-sm btn-danger"
        @click="$emit('remove')"
      >
        Remove
      </button>
      <button 
        v-if="canUploadDocs"
        class="btn btn-sm btn-primary"
        @click="$emit('upload-documents')"
      >
        Upload Documents
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Guarantor } from '@/composables/useGuarantors'

interface Props {
  guarantor: Guarantor
  showTimeline?: boolean
  showActions?: boolean
}

defineProps<Props>()

defineEmits<{
  edit: []
  remove: []
  'upload-documents': []
}>()

const { formatCurrency } = useGuarantors()

const canEdit = computed(() => guarantor.value.confirmation_status === 'pending')
const canRemove = computed(() => guarantor.value.confirmation_status !== 'accepted')
const canUploadDocs = computed(() => guarantor.value.confirmation_status === 'accepted')

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}
</script>

<style scoped lang="scss">
.guarantor-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: #fff;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &--active {
    border-color: #4caf50;
    background-color: #f1f8f4;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;
  }

  &__info {
    flex: 1;
  }

  &__name {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  &__email {
    font-size: 13px;
    color: #666;
    margin: 4px 0 0 0;
  }

  &__badges {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  &__details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
    margin-bottom: 16px;

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .detail-label {
      font-size: 12px;
      font-weight: 600;
      color: #999;
      text-transform: uppercase;
    }

    .detail-value {
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }
  }

  &__timeline {
    margin-bottom: 16px;
    padding: 12px;
    background: #f9f9f9;
    border-radius: 6px;

    .timeline-item {
      display: flex;
      gap: 12px;
      margin-bottom: 12px;

      &:last-child {
        margin-bottom: 0;
      }

      .timeline-marker {
        font-size: 16px;
        flex-shrink: 0;
      }

      .timeline-content {
        margin: 0;

        .timeline-label {
          font-size: 13px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .timeline-date {
          font-size: 12px;
          color: #999;
          margin: 4px 0 0 0;
        }
      }
    }
  }

  &__actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    .btn {
      flex: 1;
      min-width: 100px;
    }
  }
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;

  &--success {
    background-color: #e8f5e9;
    color: #2e7d32;
  }

  &--danger {
    background-color: #ffebee;
    color: #c62828;
  }

  &--warning {
    background-color: #fff3e0;
    color: #e65100;
  }

  &--secondary {
    background-color: #f5f5f5;
    color: #666;
  }

  &--info {
    background-color: #e3f2fd;
    color: #1565c0;
  }
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &-sm {
    padding: 4px 8px;
    font-size: 12px;
  }

  &-primary {
    background-color: #2196f3;
    color: white;

    &:hover {
      background-color: #1976d2;
    }
  }

  &-secondary {
    background-color: #757575;
    color: white;

    &:hover {
      background-color: #616161;
    }
  }

  &-danger {
    background-color: #f44336;
    color: white;

    &:hover {
      background-color: #d32f2f;
    }
  }
}

.icon-check {
  margin-right: 4px;
}

.icon-clock {
  margin-right: 4px;
}
</style>
