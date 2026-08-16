<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { skills } from '@/data/constants'

const { t, tm } = useI18n()

const areas = computed(() => {
  const keys = ['productEngineering', 'frontendArchitecture', 'backendPlatform', 'productExperience']
  return keys.map((key) => ({ ...tm(`expertise.areas.${key}`), key }))
})

const techList = computed(() => {
  const seen = new Set()
  const list = []
  Object.values(skills).forEach((category) => {
    category.forEach((skill) => {
      if (!seen.has(skill.name)) {
        seen.add(skill.name)
        list.push(skill.name)
      }
    })
  })
  return list
})

const proof = computed(() => [
  { value: t('expertise.proof.years.value'), label: t('expertise.proof.years.label') },
  { value: t('expertise.proof.products.value'), label: t('expertise.proof.products.label') },
  { value: t('expertise.proof.domains.value'), label: t('expertise.proof.domains.label') }
])
</script>

<template>
  <section
    id="expertise"
    class="expertise"
  >
    <div class="container">
      <header
        v-reveal
        class="expertise-header"
      >
        <div class="header-left">
          <span class="section-label">{{ t('expertise.label') }}</span>
          <h2 class="section-title">
            {{ t('expertise.title') }}
          </h2>
        </div>
        <p class="header-description">
          {{ t('expertise.description') }}
        </p>
      </header>

      <div class="capability-grid">
        <div
          v-for="(area, index) in areas"
          :key="area.key"
          v-reveal="{ delay: index * 80 }"
          class="capability"
        >
          <span class="capability-index">0{{ index + 1 }}</span>
          <h3 class="capability-title">
            {{ area.title }}
          </h3>
          <ul class="capability-list">
            <li
              v-for="item in area.items"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <div
        v-reveal
        class="tech-strip"
      >
        <span class="tech-label">{{ t('expertise.techLabel') }}</span>
        <div class="tech-chips">
          <span
            v-for="tech in techList"
            :key="tech"
          >{{ tech }}</span>
        </div>
      </div>

      <div
        v-reveal
        class="proof-row"
      >
        <div
          v-for="item in proof"
          :key="item.label"
          class="proof"
        >
          <strong>{{ item.value }}</strong>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.expertise {
  padding: $section-padding 0;

  @include respond-to(mobile) {
    padding: $section-padding-mobile 0;
  }
}

.expertise-header {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 48px;
  align-items: end;
  margin-bottom: 64px;

  @include respond-to(tablet) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .section-title {
    font-size: clamp(32px, 4.6vw, 56px);
    margin-bottom: 0;
    letter-spacing: -0.02em;
  }

  .header-description {
    font-size: 17px;
    color: $text-secondary;
    line-height: 1.65;
    max-width: 440px;
    justify-self: end;

    @include respond-to(tablet) {
      justify-self: start;
    }
  }
}

.capability-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: $border-color;
  border: 1px solid $border-color;
  border-radius: 16px;
  overflow: hidden;

  @include respond-to(tablet) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to(mobile) {
    grid-template-columns: 1fr;
  }
}

.capability {
  background: $bg-primary;
  padding: 32px 28px;
  transition: background 0.3s ease;

  &:hover {
    background: $surface-raised;
  }

  .capability-index {
    font-family: $font-mono;
    font-size: 11px;
    color: $text-muted;
    letter-spacing: 0.08em;
  }

  .capability-title {
    font-size: 19px;
    font-weight: 600;
    margin: 14px 0 20px;
  }

  .capability-list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    li {
      position: relative;
      padding-left: 16px;
      font-size: 14px;
      color: $text-secondary;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.6em;
        width: 5px;
        height: 5px;
        border-radius: 2px;
        background: $accent-primary;
        opacity: 0.55;
      }
    }
  }
}

.tech-strip {
  margin-top: 56px;
  padding-top: 40px;
  border-top: 1px solid $border-color;
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 24px;

  @include respond-to(mobile) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .tech-label {
    font-family: $font-mono;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $text-muted;
    padding-top: 6px;
  }

  .tech-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    span {
      font-family: $font-mono;
      font-size: 12px;
      color: $text-secondary;
      border: 1px solid $border-color;
      border-radius: 999px;
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.015);
    }
  }
}

.proof-row {
  margin-top: 64px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: $border-color;
  border: 1px solid $border-color;
  border-radius: 16px;
  overflow: hidden;

  @include respond-to(mobile) {
    grid-template-columns: 1fr;
  }

  .proof {
    background: $bg-primary;
    padding: 28px;
    text-align: center;

    strong {
      display: block;
      font-family: $font-heading;
      font-size: 40px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: $text-primary;
      margin-bottom: 6px;
    }

    span {
      font-size: 13px;
      color: $text-muted;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
  }
}
</style>
