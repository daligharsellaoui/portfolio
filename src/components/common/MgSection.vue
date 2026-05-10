<script setup>
defineProps({
  id: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <section
    :id="id"
    class="section"
  >
    <div class="container">
      <div class="section-header">
        <slot name="header" />
      </div>
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section {
  padding: $section-padding 0;

  @include respond-to(mobile) {
    padding: $section-padding-mobile 0;
  }
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

:slotted(.section-label) {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: $accent-primary;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

:slotted(.section-title) {
  font-size: clamp(32px, 5vw, 48px);
  margin-bottom: 16px;
}

:slotted(.section-description) {
  max-width: 600px;
  margin: 0 auto;
  color: $text-secondary;
  font-size: 18px;
}
</style>