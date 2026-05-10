<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePortfolioData } from '@/composables/usePortfolioData'
import MgSection from '@/components/common/MgSection.vue'
import MgCard from '@/components/common/MgCard.vue'
import MgBadge from '@/components/common/MgBadge.vue'

const { t } = useI18n()
const { data: portfolioData } = usePortfolioData()

const projects = computed(() => portfolioData.value?.projects || [])

const getProjectImage = (imageName) => {
  const colors = {
    dashboard: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    'design-system': 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)',
    ecommerce: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    analytics: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    admin: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    mobile: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)'
  }
  const gradient = colors[imageName] || colors.dashboard
  return `url('/images/${imageName}.jpg'), ${gradient}`
}
</script>

<template>
  <MgSection id="projects">
    <template #header>
      <span class="section-label">{{ t('projects.label') }}</span>
      <h2 class="section-title">
        {{ t('projects.title') }}
      </h2>
      <p class="section-description">
        {{ t('projects.description') }}
      </p>
    </template>


    <TransitionGroup
      name="project"
      tag="div"
      class="projects-grid"
    >
      <MgCard
        v-for="(project, index) in projects"
        :key="project.id"
        class="project-card"
        :class="{ featured: project.featured }"
        :style="{ '--delay': `${index * 100}ms` }"
        :hoverable="true"
      >
        <div
          class="project-image"
          :style="{ background: getProjectImage(project.image),backgroundSize: 'cover', backgroundPosition: 'center' }"
        />

        <div class="project-content">
          <h3 class="project-title">
            {{ project.title }}
          </h3>
          <p class="project-description">
            {{ project.description }}
          </p>

          <div class="project-tech">
            <MgBadge
              v-for="tech in project.tech"
              :key="tech"
              variant="default"
              size="small"
            >
              {{ tech }}
            </MgBadge>
          </div>
        </div>
      </MgCard>
    </TransitionGroup>

    <div
      v-if="projects.length === 0"
      class="no-projects"
    >
      <p>{{ t('projects.noResults') }}</p>
    </div>
  </MgSection>
</template>

<style lang="scss" scoped>
.projects {
  &-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
    }
  }
}

:deep(.project-card) {
  border-radius: $radius-card;
  overflow: hidden;
  transition: all 0.4s ease;

  &.featured {
    grid-column: span 2;

    @include respond-to(mobile) {
      grid-column: span 1;
    }

    :deep(.project-image) {
      height: 280px;
    }
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(139, 92, 246, 0.3);

    :deep(.project-overlay) {
      opacity: 1;
    }

    :deep(.project-image) {
      transform: scale(1.05);
    }
  }
}

.project-image {
  height: 200px;
  position: relative;
  overflow: hidden;
  transition: transform 0.4s ease;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  :deep(.mg-badge) {
    position: absolute;
    top: 16px;
    right: 16px;
  }
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 15, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(4px);
}

.project-links {
  display: flex;
  gap: 16px;

  :deep(.base-btn) {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: $radius-button;
    color: $text-primary;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      background: $accent-primary;
      border-color: $accent-primary;
      transform: translateY(-2px);
    }
  }
}

.project-content {
  padding: 24px;
}

.project-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: $text-primary;
}

.project-description {
  font-size: 14px;
  color: $text-secondary;
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  :deep(.mg-badge) {
    font-family: $font-mono;
    padding: 4px 12px;
  }
}

.no-projects {
  text-align: center;
  padding: 48px;
  color: $text-muted;
}

.project-enter-active,
.project-leave-active {
  transition: all 0.4s ease;
}

.project-enter-from,
.project-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.project-move {
  transition: transform 0.4s ease;
}
</style>