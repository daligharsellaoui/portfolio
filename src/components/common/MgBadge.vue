<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'accent', 'info', 'success', 'warning', 'error'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium'].includes(value)
  }
})
</script>

<template>
  <span
    class="mg-badge"
    :class="[`badge-${variant}`, `badge-${size}`]"
  >
    <span
      v-if="variant === 'success'"
      class="badge-dot"
    />
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.mg-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  border-radius: 50px;
  transition: all 0.3s ease;

  &.badge-default {
    background: rgba(161, 205, 244, 0.1);
    border: 1px solid rgba(161, 205, 244, 0.2);
    color: $text-secondary;
  }

  &.badge-accent {
    background: rgba(161, 205, 244, 0.15);
    border: 1px solid rgba(161, 205, 244, 0.2);
    color: $accent-primary;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &.badge-info {
    background: rgba(6, 182, 212, 0.1);
    border: 1px solid rgba(6, 182, 212, 0.2);
    color: $accent-tertiary;
  }

  &.badge-success {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.2);
    color: $success;
  }

  &.badge-warning {
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.2);
    color: #f59e0b;
  }

  &.badge-error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    color: #ef4444;
  }

  &.badge-small {
    padding: 4px 10px;
    font-size: 12px;
  }

  &.badge-medium {
    padding: 8px 16px;
    font-size: 14px;
  }

  .badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
    animation: pulse 2s infinite;
  }
}
</style>