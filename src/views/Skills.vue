<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Code, Palette, Server, Wrench } from 'lucide-vue-next'
import { techIcons } from '@/data/constants'
import { usePortfolioData } from '@/composables/usePortfolioData'
import MgSection from '@/components/common/MgSection.vue'
import MgButton from '@/components/common/MgButton.vue'
import MgBadge from '@/components/common/MgBadge.vue'
import MgCard from '@/components/common/MgCard.vue'
import MgIcon from '@/components/common/MgIcon.vue'

const { t } = useI18n()
const { data: portfolioData } = usePortfolioData()

const activeCategory = ref('frontendEngineering')
const animatedSkills = ref({})
const isLoading = ref(false)

const categories = computed(() => [
  { id: 'frontendEngineering', label: t('skills.categories.frontendEngineering'), icon: Code },
  { id: 'uiUxDesign', label: t('skills.categories.uiUxDesign'), icon: Palette },
  { id: 'backendEngineering', label: t('skills.categories.backendEngineering'), icon: Server },
  { id: 'toolsTesting', label: t('skills.categories.toolsTesting'), icon: Wrench }
])

const categoryData = computed(() => {
  return portfolioData.value?.skills?.[activeCategory.value] || []
})

onMounted(() => {
  categoryData.value.forEach(skill => {
    animatedSkills.value[skill.name] = true
  })
})

const setCategory = (categoryId) => {
  activeCategory.value = categoryId
  isLoading.value = true
  animatedSkills.value = {}
  
  setTimeout(() => {
    categoryData.value.forEach(skill => {
      animatedSkills.value[skill.name] = true
    })
    isLoading.value = false
  }, 300)
}
</script>

<template>
  <MgSection id="skills">
    <template #header>
      <span class="section-label">{{ t('skills.label') }}</span>
      <h2 class="section-title">
        {{ t('skills.title') }}
      </h2>
    </template>

    <div class="skills-categories">
      <MgButton
        v-for="category in categories"
        :key="category.id"
        variant="ghost"
        size="small"
        class="category-btn"
        :active="activeCategory === category.id"
        @click="setCategory(category.id)"
      >
        <component
          :is="category.icon"
          size="18"
        />
        <span>{{ category.label }}</span>
      </MgButton>
    </div>

    <div class="skills-grid">
      <MgCard
        v-for="(skill, index) in categoryData"
        :key="isLoading ? `skeleton-${index}` : skill.name"
        class="skill-card"
        :class="{ animated: !isLoading && animatedSkills[skill.name] }"
        :style="{ '--delay': `${index * 50}ms` }"
        :skeleton="isLoading"
      >
        <div
          v-if="!isLoading"
          class="skill-header"
        >
          <MgIcon
            :icon="techIcons[skill.icon]"
            size="medium"
          />
          <div class="skill-info">
            <h4 class="skill-name">
              {{ skill.name }}
            </h4>
            <MgBadge
              v-if="skill.advanced"
              variant="accent"
              size="small"
            >
              {{ t('skills.advanced') }}
            </MgBadge>
          </div>
        </div>
        <div
          v-if="!isLoading"
          class="skill-glow"
        />
      </MgCard>
    </div>

    <div class="skills-stats">
      <div class="stat-item">
        <span class="stat-number gradient-text">5+</span>
        <span class="stat-label">{{ t('skills.years') }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-number gradient-text">28+</span>
        <span class="stat-label">{{ t('skills.delivered') }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-number gradient-text">15+</span>
        <span class="stat-label">{{ t('skills.technologies') }}</span>
      </div>
    </div>
  </MgSection>
</template>

<style lang="scss" scoped>
.skills {
  position: relative;

  &-categories {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 48px;
    flex-wrap: wrap;

    @include respond-to(mobile) {
      gap: 8px;
    }
  }

  &-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @include respond-to(tablet) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
    }
  }

  &-stats {
    display: flex;
    justify-content: center;
    gap: 64px;
    margin-top: 64px;
    padding: 32px;
    @include glassmorphism;
    border-radius: $radius-card;

    @include respond-to(mobile) {
      flex-direction: column;
      gap: 32px;
      align-items: center;
    }
  }
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  @include glassmorphism;
  border-radius: $radius-button;
  color: $text-secondary;
  font-weight: 500;
  transition: all 0.3s ease;

  @include respond-to(mobile) {
    padding: 10px 16px;
    font-size: 13px;

    span {
      display: none;
    }
  }

  &:hover {
    color: $text-primary;
    border-color: rgba(99, 102, 241, 0.3);
  }

  &.active {
    background: rgba(99, 102, 241, 0.15);
    color: $text-primary;
    border-color: $accent-primary;
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
  }
}

:deep(.skill-card) {
  @include glassmorphism;
  border-radius: $radius-card;
  padding: 24px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;

  &.animated {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(99, 102, 241, 0.3);

    .skill-glow {
      opacity: 1;
    }

    .skill-progress {
      box-shadow: 0 0 10px $accent-primary;
    }
  }

  .skill-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.1), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.skill-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.skill-name {
  font-size: 16px;
  font-weight: 600;
  color: $text-primary;
}

.skill-badge {
  font-size: 11px;
  font-weight: 600;
  color: $accent-primary;
  background: rgba(99, 102, 241, 0.15);
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-family: $font-heading;
  font-size: 48px;
  font-weight: 700;
  display: block;

  @include respond-to(mobile) {
    font-size: 36px;
  }
}

.stat-label {
  font-size: 14px;
  color: $text-secondary;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.skills-grid {
}
</style>