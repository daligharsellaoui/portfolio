<script setup>
import { useI18n } from 'vue-i18n'
import { usePortfolioData } from '@/composables/usePortfolioData'

const { t } = useI18n()
const { data: portfolioData } = usePortfolioData()
</script>

<template>
  <section
    id="experience"
    class="experience"
  >
    <div class="container">
      <header
        v-reveal
        class="exp-header"
      >
        <div class="header-left">
          <span class="section-label">{{ t('experience.label') }}</span>
          <h2 class="section-title">
            {{ t('experience.title') }}
          </h2>
        </div>
        <p class="header-description">
          {{ t('experience.description') }}
        </p>
      </header>

      <ol class="exp-list">
        <li
          v-for="(exp, index) in (portfolioData?.experience || [])"
          :key="exp.id"
          v-reveal="{ delay: index * 100 }"
          class="exp-row"
        >
          <div class="exp-meta">
            <div class="exp-logo">
              <img
                v-if="exp.logoImage"
                :src="`/images/${exp.logoImage}`"
                :alt="exp.company"
                loading="lazy"
              >
              <span
                v-else
                class="exp-logo-fallback"
              >{{ exp.logo }}</span>
            </div>
            <div class="exp-meta-text">
              <span class="exp-duration">{{ exp.duration }}</span>
              <span class="exp-company">{{ exp.company }}</span>
            </div>
          </div>

          <div class="exp-body">
            <div class="exp-role-row">
              <h3 class="exp-role">
                {{ exp.role }}
              </h3>
              <span class="exp-location">{{ exp.location }}</span>
            </div>
            <p class="exp-description">
              {{ exp.description }}
            </p>
            <ul class="exp-highlights">
              <li
                v-for="highlight in exp.highlights"
                :key="highlight"
              >
                {{ highlight }}
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.experience {
  padding: $section-padding 0;
  background: $surface-alt;

  @include respond-to(mobile) {
    padding: $section-padding-mobile 0;
  }
}

.exp-header {
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

.exp-list {
  display: flex;
  flex-direction: column;
}

.exp-row {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: 48px;
  padding: 40px 0;
  border-top: 1px solid $border-color;

  &:last-child {
    border-bottom: 1px solid $border-color;
  }

  @include respond-to(tablet) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.exp-meta {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  @include respond-to(mobile) {
    gap: 12px 16px;

    .exp-logo { order: 1; }
    .exp-company { order: 2; }
    .exp-duration { order: 3; }
  }
}

.exp-logo {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  border: 1px solid $border-color;
  background: $surface-raised;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 7px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .exp-logo-fallback {
    font-family: $font-mono;
    font-size: 14px;
    font-weight: 600;
    color: $text-secondary;
  }
}

.exp-meta-text {
  display: flex;
  flex-direction: column;
  gap: 8px;

  @include respond-to(tablet) {
    flex-direction: row;
    align-items: baseline;
    gap: 16px;
    flex-wrap: wrap;
  }

  @include respond-to(mobile) {
    display: contents;
  }

  .exp-duration {
    font-family: $font-mono;
    font-size: 12px;
    color: $text-muted;
    letter-spacing: 0.04em;
  }

  .exp-company {
    font-size: 15px;
    font-weight: 600;
    color: $text-primary;
  }
}

.exp-role-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;

  .exp-role {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .exp-location {
    font-family: $font-mono;
    font-size: 12px;
    color: $text-muted;
  }
}

.exp-description {
  font-size: 16px;
  line-height: 1.7;
  color: $text-secondary;
  max-width: 620px;
  margin-bottom: 16px;
}

.exp-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  li {
    font-family: $font-mono;
    font-size: 11px;
    color: $text-secondary;
    border: 1px solid $border-color;
    border-radius: 999px;
    padding: 5px 12px;
  }
}
</style>
