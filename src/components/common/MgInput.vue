<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  rows: {
    type: [Number, String],
    default: 5
  }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const inputId = computed(() => props.label ? props.label.toLowerCase().replace(/\s+/g, '-') : 'input')
</script>

<template>
  <div
    class="mg-input"
    :class="{ 'has-error': error }"
  >
    <label
      v-if="label"
      :for="inputId"
    >{{ label }}</label>
    <textarea
      v-if="type === 'textarea'"
      :id="inputId"
      v-model="inputValue"
      :rows="rows"
      :placeholder="placeholder"
    />
    <input
      v-else
      :id="inputId"
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
    >
    <span
      v-if="error"
      class="error-message"
    >{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.mg-input {
  margin-bottom: 24px;

  label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: $text-secondary;
    margin-bottom: 8px;
  }

  input, textarea {
    width: 100%;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid $border-color;
    border-radius: $radius-input;
    color: $text-primary;
    font-size: 16px;
    transition: all 0.3s ease;

    &::placeholder {
      color: $text-muted;
    }

    &:focus {
      outline: none;
      border-color: $accent-primary;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 140px;
  }

  &.has-error {
    input, textarea {
      border-color: #ef4444;

      &:focus {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    }
  }

  .error-message {
    display: block;
    font-size: 12px;
    color: #ef4444;
    margin-top: 6px;
  }
}
</style>