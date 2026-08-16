<script setup>
import { useI18n } from 'vue-i18n'
import { ArrowUp } from 'lucide-vue-next'
import { usePortfolioData } from '@/composables/usePortfolioData'

const { t } = useI18n()
const { data: portfolioData } = usePortfolioData()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="brand-logo">
            <span class="logo-text">Dali</span>
            <span class="logo-dot" />
          </div>
          <p class="brand-tagline">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <div class="footer-links">
          <div class="link-group">
            <h4>{{ t('footer.navigation') }}</h4>
            <ul>
              <li><a href="#home">{{ t('nav.home') }}</a></li>
              <li><a href="#work">{{ t('nav.work') }}</a></li>
              <li><a href="#expertise">{{ t('nav.expertise') }}</a></li>
              <li><a href="#experience">{{ t('nav.experience') }}</a></li>
            </ul>
          </div>

          <div class="link-group">
            <h4>{{ t('footer.connect') }}</h4>
            <ul>
              <li v-if="portfolioData?.contact?.social?.github">
                <a
                  :href="portfolioData.contact.social.github"
                  target="_blank"
                >GitHub</a>
              </li>
              <li v-if="portfolioData?.contact?.social?.linkedin">
                <a
                  :href="portfolioData.contact.social.linkedin"
                  target="_blank"
                >LinkedIn</a>
              </li>
              <li v-if="portfolioData?.contact?.social?.upwork">
                <a
                  :href="portfolioData.contact.social.upwork"
                  target="_blank"
                >Upwork</a>
              </li>
              <li v-if="portfolioData?.contact?.email">
                <a :href="`mailto:${portfolioData.contact.email}`">{{ t('contact.info.email') }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          <span>&copy; {{ new Date().getFullYear() }} {{ portfolioData?.name || '' }}.</span>
          <span class="separator">|</span>
          <span>{{ t('footer.copyright') }}</span>
        </p>

        <button
          class="back-to-top"
          aria-label="Back to top"
          @click="scrollToTop"
        >
          <ArrowUp size="20" />
        </button>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  padding: 80px 0 40px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, $border-color, transparent);
  }

  &-content {
    display: flex;
    justify-content: space-between;
    gap: 48px;
    margin-bottom: 48px;

    @include respond-to(mobile) {
      flex-direction: column;
    }
  }

  &-brand {
    max-width: 300px;
  }

  &-links {
    display: flex;
    gap: 64px;

    @include respond-to(mobile) {
      gap: 24px;
      flex-wrap: wrap;
    }
  }
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;

  .logo-text {
    font-family: $font-heading;
    font-size: 24px;
    font-weight: 700;
    color: $text-primary;
  }

  .logo-dot {
    width: 8px;
    height: 8px;
    background: $accent-primary;
    border-radius: 50%;
    box-shadow: 0 0 10px $accent-primary;
  }
}

.brand-tagline {
  font-size: 14px;
  color: $text-muted;
  line-height: 1.6;
}

.link-group {
  h4 {
    font-size: 14px;
    font-weight: 600;
    color: $text-primary;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  a {
    font-size: 14px;
    color: $text-secondary;
    transition: color 0.3s ease;

    &:hover {
      color: $accent-primary;
    }
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 32px;
  border-top: 1px solid $border-color;

  @include respond-to(mobile) {
    flex-direction: column;
    gap: 24px;
  }
}

.copyright {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: $text-muted;

  .separator {
    color: $border-color;
  }
}

.back-to-top {
  width: 44px;
  height: 44px;
  @include glassmorphism;
  border-radius: $radius-button;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-secondary;
  transition: all 0.3s ease;

  &:hover {
    color: $text-primary;
    border-color: $accent-primary;
    transform: translateY(-4px);
    box-shadow: $shadow-neon;
  }
}
</style>