<script setup>
defineProps({
  hoverable: {
    type: Boolean,
    default: true
  },
  skeleton: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'featured'].includes(value)
  }
})
</script>

<template>
  <div
    class="base-card"
    :class="{ 'is-hoverable': hoverable, 'is-skeleton': skeleton, [`is-${variant}`]: variant !== 'default' }"
  >
    <div
      v-if="skeleton"
      class="skeleton-content"
    >
      <div
        class="skeleton-line"
        style="width: 40%"
      />
      <div
        class="skeleton-line"
        style="width: 70%"
      />
      <div
        class="skeleton-line"
        style="width: 50%"
      />
    </div>
    <slot v-else />
  </div>
</template>

<style lang="scss" scoped>
.base-card {
  @include glassmorphism;
  border-radius: $radius-card;
  padding: $card-padding;
  transition: all 0.3s ease;

  &.is-hoverable:hover {
    transform: translateY(-8px);
    box-shadow: $shadow-hover;
    border-color: rgba(161, 205, 244, 0.3);
  }

  &.is-skeleton {
    background: var(--bg-tertiary);
    border-color: transparent;
    animation: shimmer 1.5s infinite;

    .skeleton-line {
      height: 12px;
      background: var(--border-color);
      border-radius: 4px;
      margin-bottom: 12px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

@keyframes shimmer {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}
</style>