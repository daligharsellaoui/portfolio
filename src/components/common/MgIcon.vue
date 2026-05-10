<script setup>
defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  icon: {
    type: [String, Object],
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div
    class="mg-icon"
    :class="`icon-${size}`"
  >
    <div
      v-if="icon"
      class="icon-content"
      v-html="icon"
    />
    <span
      v-else-if="text"
      class="icon-text"
    >{{ text }}</span>
  </div>
</template>

<style lang="scss" scoped>
.mg-icon {
  background: $gradient-primary;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &.icon-small {
    width: 36px;
    height: 36px;
    border-radius: 8px;

    :deep(svg) {
      width: 18px;
      height: 18px;
    }

    .icon-text {
      font-size: 12px;
    }
  }

  &.icon-medium {
    width: 48px;
    height: 48px;

    :deep(svg) {
      width: 24px;
      height: 24px;
    }

    .icon-text {
      font-size: 16px;
      font-family: $font-heading;
      font-weight: 700;
    }
  }

  &.icon-large {
    width: 64px;
    height: 64px;
    border-radius: 16px;

    :deep(svg) {
      width: 32px;
      height: 32px;
    }

    .icon-text {
      font-size: 24px;
      font-family: $font-heading;
      font-weight: 700;
    }
  }

  .icon-content {
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-text {
    color: $text-primary;
  }
}
</style>