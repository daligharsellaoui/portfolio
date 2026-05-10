<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'ghost', 'glass'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'icon'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  },
  active: {
    type: Boolean,
    default: false
  },
  href: {
    type: String,
    default: ''
  },
  target: {
    type: String,
    default: '_self'
  }
})
</script>

<template>
  <a
    v-if="href"
    :href="href"
    class="base-btn"
    :class="[`btn-${variant}`, `btn-${size}`, { active }]"
    :target="target"
  >
    <slot />
  </a>
  <button
    v-else
    class="base-btn"
    :class="[`btn-${variant}`, `btn-${size}`, { active }]"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  border-radius: $radius-button;
  transition: all 0.3s ease;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &.btn-primary {
    background: $gradient-primary;
    color: $text-primary;
    @include neon-glow;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: $shadow-hover;
    }
  }

  &.btn-secondary {
    @include glassmorphism;
    color: $text-primary;
    border: 1px solid $accent-primary;

    &:hover:not(:disabled) {
      background: rgba($accent-primary, 0.1);
      border-color: $accent-secondary;
    }
  }

  &.btn-ghost {
    background: transparent;
    color: $text-secondary;

    &:hover:not(:disabled) {
      color: $text-primary;
    }
  }

  &.btn-glass {
    @include glassmorphism;
    color: $text-secondary;

    &:hover:not(:disabled) {
      color: $text-primary;
      border-color: rgba(99, 102, 241, 0.3);
    }

    &.active {
      color: $text-primary;
      background: rgba(99, 102, 241, 0.1);
      border-color: $accent-primary;
    }
  }

  &.btn-small {
    padding: 8px 16px;
    font-size: 13px;
  }

  &.btn-medium {
    padding: 14px 28px;
    font-size: 16px;
  }

  &.btn-large {
    padding: 18px 36px;
    font-size: 18px;
  }

  &.btn-icon {
    width: 44px;
    height: 44px;
    padding: 0;
    border-radius: $radius-button;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover:not(:disabled) {
      transform: translateY(-4px);
    }

    a:hover:not(:disabled) {
      transform: translateY(-4px);
    }
  }
}

a.base-btn {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    text-decoration: none;
  }
}
</style>