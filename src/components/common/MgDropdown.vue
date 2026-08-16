<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const dropdownRef = ref(null)

const select = (option) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    ref="dropdownRef"
    class="base-dropdown"
  >
    <button
      class="dropdown-trigger"
      type="button"
      @click="isOpen = !isOpen"
    >
      <slot name="trigger">
        <span>{{ label }}</span>
      </slot>
    </button>
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="dropdown-menu"
      >
        <button
          v-for="option in options"
          :key="option.value"
          class="dropdown-option"
          :class="{ active: modelValue === option.value }"
          type="button"
          @click="select(option)"
        >
          {{ option.label }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.base-dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  @include glassmorphism;
  border-radius: $radius-input;
  color: $text-secondary;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    color: $text-primary;
    border-color: rgba(161, 205, 244, 0.3);
  }
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  @include glassmorphism;
  border-radius: $radius-input;
  padding: 8px;
  min-width: 80px;
  z-index: 100;
}

.dropdown-option {
  display: block;
  width: 100%;
  padding: 8px 16px;
  text-align: center;
  border-radius: 6px;
  color: $text-secondary;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  margin: 8px 0;

  &:hover {
    color: $text-primary;
    background: rgba(255, 255, 255, 0.05);
  }

  &.active {
    color: $accent-primary;
    background: rgba(161, 205, 244, 0.1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>