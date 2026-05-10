<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { MapPin, Calendar } from 'lucide-vue-next'
import { usePortfolioData } from '@/composables/usePortfolioData'
import MgSection from '@/components/common/MgSection.vue'
import MgCard from '@/components/common/MgCard.vue'
import MgBadge from '@/components/common/MgBadge.vue'
import MgIcon from '@/components/common/MgIcon.vue'

const { t } = useI18n()
const { data: portfolioData } = usePortfolioData()

const visibleItems = ref(new Set())

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleItems.value.add(parseInt(entry.target.dataset.index))
        }
      })
    },
    { threshold: 0.2 }
  )

  document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.dataset.index = index
    observer.observe(item)
  })
})
</script>

<template>
  <MgSection id="experience">
    <template #header>
      <span class="section-label">{{ t('experience.label') }}</span>
      <h2 class="section-title">
        {{ t('experience.title') }}
      </h2>
      <p class="section-description">
        {{ t('experience.description') }}
      </p>
    </template>

    <div class="timeline">
      <div class="timeline-line" />

      <div
        v-for="(exp, index) in (portfolioData?.experience || [])"
        :key="exp.id"
        class="timeline-item"
        :class="{ visible: visibleItems.has(index), left: index % 2 === 0, right: index % 2 !== 0 }"
        :style="{ '--delay': `${index * 200}ms` }"
      >
        <div class="timeline-dot">
          <div class="dot-inner" />
        </div>

        <MgCard
          class="timeline-card"
          :hoverable="true"
        >
          <div class="card-header">
            <MgIcon
              :text="exp.logo"
              size="medium"
            />
            <div class="card-info">
              <h3 class="role">
                {{ exp.role }}
              </h3>
              <h4 class="company">
                {{ exp.company }}
              </h4>
            </div>
          </div>

          <div class="card-meta">
            <span class="meta-item">
              <Calendar size="14" />
              {{ exp.duration }}
            </span>
            <span class="meta-item">
              <MapPin size="14" />
              {{ exp.location }}
            </span>
          </div>

          <p class="card-description">
            {{ exp.description }}
          </p>

          <div class="card-highlights">
            <MgBadge
              v-for="highlight in exp.highlights"
              :key="highlight"
              variant="info"
              size="small"
            >
              {{ highlight }}
            </MgBadge>
          </div>
        </MgCard>
      </div>
    </div>
  </MgSection>
</template>

<style lang="scss" scoped>
.experience {
  position: relative;
}

.timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 0;

  &-line {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, $accent-primary, $accent-secondary, $accent-tertiary);
    opacity: 0.3;

    @include respond-to(mobile) {
      left: 20px;
    }
  }
}

.timeline-item {
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding-right: 50%;
  margin-bottom: 48px;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s ease;

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }

  &.right {
    justify-content: flex-start;
    padding-right: 0;
    padding-left: 50%;
    transform: translateX(30px);

    &.visible {
      transform: translateX(0);
    }

    .timeline-dot {
      left: auto;
      right: calc(50% - 7px);

      @include respond-to(mobile) {
        right: auto;
        left: 13px;
      }
    }

    .timeline-card {
      text-align: left;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }

  @include respond-to(mobile) {
    padding-right: 0 !important;
    padding-left: 50px !important;
    justify-content: flex-start !important;
    transform: translateX(30px);

    &.visible {
      transform: translateX(0);
    }
  }
}

.timeline-dot {
  position: absolute;
  top: 24px;
  left: calc(50% - 7px);
  width: 14px;
  height: 14px;
  z-index: 2;

  @include respond-to(mobile) {
    left: 13px !important;
    right: auto !important;
  }

  .dot-inner {
    width: 100%;
    height: 100%;
    background: $accent-primary;
    border-radius: 50%;
    box-shadow: 0 0 20px $accent-primary;
    animation: pulse 2s infinite;

    &::before {
      content: '';
      position: absolute;
      inset: -4px;
      border: 2px solid $accent-secondary;
      border-radius: 50%;
      animation: ping 2s infinite;
    }
  }
}

@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

:deep(.timeline-card) {
  width: calc(100% - 60px);
  max-width: 440px;
  padding: 28px;

  @include respond-to(mobile) {
    width: calc(100% - 20px);
  }
}

.card-header {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.card-info {
  flex: 1;
}

.role {
  font-size: 18px;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 4px;
}

.company {
  font-size: 14px;
  color: $accent-primary;
  font-weight: 500;
}

.card-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: $text-muted;

  svg {
    color: $accent-tertiary;
  }
}

.card-description {
  font-size: 14px;
  color: $text-secondary;
  line-height: 1.7;
  margin-bottom: 16px;
}

.card-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>