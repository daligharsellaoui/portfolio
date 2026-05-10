<script setup>
defineProps({
  onSubmit: {
    type: Function,
    default: () => {}
  }
})
</script>

<template>
  <form
    class="mg-form"
    @submit.prevent="onSubmit"
  >
    <slot />
  </form>
</template>

<style lang="scss" scoped>
.mg-form {
  @include glassmorphism;
  border-radius: $radius-card;
  padding: 40px;

  @include respond-to(mobile) {
    padding: 24px;
  }
}
</style>