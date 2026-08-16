<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'
import { Home, Package, Layers, Briefcase, Mail, Menu, X, Globe, Sun, Moon } from 'lucide-vue-next'
import MgButton from './common/MgButton.vue'
import MgDropdown from './common/MgDropdown.vue'

const { t, locale } = useI18n()
const { isDark, toggleTheme } = useTheme()

defineProps({
  activeSection: {
    type: String,
    default: 'home'
  }
})

const emit = defineEmits(['navigate'])

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = computed(() => [
  { id: 'home', label: t('nav.home'), icon: Home },
  { id: 'work', label: t('nav.work'), icon: Package },
  { id: 'expertise', label: t('nav.expertise'), icon: Layers },
  { id: 'experience', label: t('nav.experience'), icon: Briefcase },
  { id: 'contact', label: t('nav.contact'), icon: Mail }
])

const languages = [
  { value: 'en', label: 'EN' },
  { value: 'fr', label: 'FR' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 80
}

const navigateTo = (sectionId) => {
  emit('navigate', sectionId)
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const changeLanguage = (lang) => {
  locale.value = lang
}

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', handleScroll)
}
</script>

<template>
  <nav
    class="navbar"
    :class="{ scrolled: isScrolled }"
  >
    <div class="navbar-container">
      <button
        class="navbar-logo"
        type="button"
        aria-label="Dali GHarsellaoui — home"
        @click="navigateTo('home')"
      >
        <span
          class="brand-mark"
          aria-hidden="true"
        >DG</span>
      </button>

      <div class="navbar-nav">
        <MgButton
          v-for="item in navItems"
          :key="item.id"
          variant="ghost"
          :active="activeSection === item.id"
          @click="navigateTo(item.id)"
        >
          <component
            :is="item.icon"
            size="18"
          />
          <span>{{ item.label }}</span>
        </MgButton>
      </div>

      <div class="navbar-actions">
        <MgButton
          variant="glass"
          size="icon"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <Sun
            v-if="isDark"
            size="18"
          />
          <Moon
            v-else
            size="18"
          />
        </MgButton>

        <MgDropdown
          v-model="locale"
          :options="languages"
        >
          <template #trigger>
            <Globe size="18" />
          </template>
        </MgDropdown>

        <MgButton
          variant="primary"
          class="navbar-cta"
          @click="navigateTo('contact')"
        >
          {{ t('nav.letsTalk') }}
        </MgButton>
      </div>

      <button
        class="mobile-menu-toggle"
        @click="toggleMobileMenu"
      >
        <X
          v-if="isMobileMenuOpen"
          size="24"
        />
        <Menu
          v-else
          size="24"
        />
      </button>
    </div>

    <Transition name="slide">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-menu"
      >
        <div class="mobile-nav">
          <MgButton
            v-for="item in navItems"
            :key="item.id"
            variant="ghost"
            :active="activeSection === item.id"
            @click="navigateTo(item.id)"
          >
            <component
              :is="item.icon"
              size="20"
            />
            <span>{{ item.label }}</span>
          </MgButton>
        </div>
        <div class="mobile-lang">
          <MgButton
            v-for="lang in languages"
            :key="lang.value"
            variant="ghost"
            size="small"
            :active="locale === lang.value"
            @click="changeLanguage(lang.value)"
          >
            {{ lang.label }}
          </MgButton>
        </div>
        <MgButton
          variant="ghost"
          @click="toggleTheme"
        >
          <Sun
            v-if="isDark"
            size="20"
          />
          <Moon
            v-else
            size="20"
          />
          <span>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
        </MgButton>
        <MgButton
          variant="primary"
          class="mobile-cta"
          @click="navigateTo('contact')"
        >
          {{ t('nav.letsTalk') }}
        </MgButton>
      </div>
    </Transition>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  z-index: 1000;
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;

  &.scrolled {
    @include glassmorphism;
    height: 64px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
    border-bottom-color: rgba(255, 255, 255, 0.08);
  }

  &-container {
    max-width: $container-max;
    height: 100%;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 1920px) {
      max-width: $container-max-xl;
      padding: 0 40px;
    }
  }

  &-logo {
    display: flex;
    align-items: center;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);

      .brand-mark {
        box-shadow: $shadow-neon;
      }
    }

    .brand-mark {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: $gradient-primary;
      color: #0a1420;
      font-family: $font-heading;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.02em;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: box-shadow 0.3s ease;
    }
  }

  &-nav {
    display: flex;
    align-items: center;
    gap: 8px;

    @include respond-to(tablet) {
      display: none;
    }
  }

  &-actions {
    display: flex;
    align-items: center;
    gap: 16px;

    @include respond-to(tablet) {
      display: none;
    }
  }

  &-cta {
    @include respond-to(tablet) {
      display: none;
    }
  }
}

:deep(.navbar-nav .base-btn) {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: $radius-button;

  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: $accent-primary;
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  &.active {
    color: $text-primary;
    background: rgba(161, 205, 244, 0.1);

    &::after {
      width: 20px;
      box-shadow: 0 0 10px $accent-primary;
    }
  }

  span {
    font-size: 14px;
    font-weight: 500;
  }
}

.mobile-menu-toggle {
  display: none;
  color: $text-primary;
  padding: 8px;

  @include respond-to(tablet) {
    display: block;
  }
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  // Solid panel (not glass): nested backdrop-filters inside a fixed
  // element render glitchily on iOS Safari, especially when the theme
  // or locale changes and forces a re-composite.
  background: $bg-secondary;
  padding: 24px;
  border-top: 1px solid $border-color;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
}

:deep(.mobile-menu .mobile-nav) {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;

  .base-btn {
    width: 100%;
    justify-content: flex-start;
    padding: 16px;

    span {
      font-size: 16px;
    }
  }
}

:deep(.mobile-menu .mobile-lang) {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

:deep(.mobile-menu .base-btn.mobile-cta) {
  width: 100%;
  margin-top: 16px;

  span {
    flex: 1;
    text-align: left;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>