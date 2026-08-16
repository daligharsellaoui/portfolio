<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-vue-next'
import { usePortfolioData } from '@/composables/usePortfolioData'
import MgButton from '@/components/common/MgButton.vue'
import WhatsAppIcon from '@/components/common/WhatsAppIcon.vue'

const { t } = useI18n()
const { data: portfolioData } = usePortfolioData()

const emit = defineEmits(['navigate'])

const profileImage = '/profile.jpg'

const navigateTo = (section) => {
  emit('navigate', section)
}

const imageError = ref(false)
const handleImageError = () => {
  imageError.value = true
}
</script>

<template>
  <section
    id="home"
    class="hero"
  >
    <div
      class="hero-bg"
      aria-hidden="true"
    >
      <div class="grid-lines" />
      <div class="ambient ambient-1" />
      <div class="ambient ambient-2" />
    </div>

    <div class="hero-inner container">
      <div class="hero-copy">
        <p
          v-reveal
          class="hero-status"
        >
          <span class="status-dot" />
          {{ t('hero.available') }}
        </p>

        <h1
          v-reveal="{ delay: 80 }"
          class="hero-title"
        >
          {{ t('hero.titlePre') }}
          <em class="accent-serif hero-accent">{{ t('hero.titleAccent') }}</em>
        </h1>

        <p
          v-reveal="{ delay: 160 }"
          class="hero-description"
        >
          {{ t('hero.description') }}
        </p>

        <div
          v-reveal="{ delay: 240 }"
          class="hero-meta"
        >
          <span class="meta-item">{{ portfolioData.title }}</span>
          <span
            class="meta-sep"
            aria-hidden="true"
          >/</span>
          <span class="meta-item">{{ portfolioData.location }}</span>
        </div>

        <div
          v-reveal="{ delay: 320 }"
          class="hero-cta"
        >
          <MgButton
            variant="primary"
            @click="navigateTo('work')"
          >
            {{ t('hero.exploreWork') }}
            <ArrowRight size="18" />
          </MgButton>
          <MgButton
            variant="secondary"
            @click="navigateTo('contact')"
          >
            {{ t('hero.letsTalk') }}
          </MgButton>
          <MgButton
            variant="ghost"
            href="/cv.pdf"
            download
          >
            <Download size="18" />
            <span>{{ t('hero.downloadCv') }}</span>
          </MgButton>
        </div>

        <div
          v-reveal="{ delay: 480 }"
          class="hero-social"
        >
          <MgButton
            v-if="portfolioData?.contact?.social?.github"
            variant="glass"
            size="icon"
            :href="portfolioData.contact.social.github"
            target="_blank"
            aria-label="GitHub"
          >
            <Github size="18" />
          </MgButton>
          <MgButton
            v-if="portfolioData?.contact?.social?.linkedin"
            variant="glass"
            size="icon"
            :href="portfolioData.contact.social.linkedin"
            target="_blank"
            aria-label="LinkedIn"
          >
            <Linkedin size="18" />
          </MgButton>
          <MgButton
            v-if="portfolioData?.contact?.social?.upwork"
            variant="glass"
            size="icon"
            :href="portfolioData.contact.social.upwork"
            target="_blank"
            aria-label="Upwork"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
            >
              <path
                fill="currentColor"
                d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"
              />
            </svg>
          </MgButton>
          <MgButton
            v-if="portfolioData?.contact?.social?.whatsapp"
            variant="glass"
            size="icon"
            :href="portfolioData.contact.social.whatsapp"
            target="_blank"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon size="18" />
          </MgButton>
          <MgButton
            v-if="portfolioData?.contact?.email"
            variant="glass"
            size="icon"
            :href="`mailto:${portfolioData.contact.email}`"
            aria-label="Email"
          >
            <Mail size="18" />
          </MgButton>
        </div>
      </div>

      <div
        v-reveal="{ delay: 200 }"
        class="hero-visual"
      >
        <figure class="portrait-frame">
          <div class="portrait-image">
            <img
              v-if="!imageError"
              :src="profileImage"
              :alt="`Portrait of ${portfolioData.name}`"
              @error="handleImageError"
            >
            <div
              v-else
              class="portrait-fallback"
            >
              <span>{{ portfolioData.name.charAt(0) }}</span>
            </div>
          </div>
          <div
            class="frame-grid"
            aria-hidden="true"
          />
          <figcaption class="portrait-caption">
            <span class="caption-name">D.G.</span>
            <span class="caption-role">{{ portfolioData.title }}</span>
            <span class="caption-loc">{{ portfolioData.location }}</span>
          </figcaption>
        </figure>
      </div>
    </div>

    <button
      class="scroll-hint"
      type="button"
      @click="navigateTo('work')"
    >
      <span>{{ t('hero.scrollHint') }}</span>
      <svg
        viewBox="0 0 16 16"
        width="14"
        height="14"
        aria-hidden="true"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          d="M8 2v11m0 0 4.5-4.5M8 13 3.5 8.5"
        />
      </svg>
    </button>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 140px 24px 96px;
  overflow: hidden;

  @include respond-to(mobile) {
    padding: 96px 24px 56px;
  }

  &-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &-inner {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    gap: 64px;
    align-items: center;

    @include respond-to(tablet) {
      grid-template-columns: 1fr;
      gap: 56px;
    }

    @include respond-to(mobile) {
      grid-template-columns: minmax(0, 1fr) minmax(0, 0.66fr);
      grid-template-areas:
        'status status'
        'title visual'
        'desc desc'
        'meta meta'
        'cta cta'
        'social social';
      column-gap: 24px;
      row-gap: 0;
      align-items: center;

      .hero-status { grid-area: status; }
      .hero-title { grid-area: title; }
      .hero-description { grid-area: desc; }
      .hero-meta { grid-area: meta; }
      .hero-cta { grid-area: cta; }
      .hero-social { grid-area: social; }
      .hero-visual {
        grid-area: visual;
        align-self: start;
        padding-top: 6px;
      }
    }
  }

  &-copy {
    max-width: 680px;

    @include respond-to(mobile) {
      display: contents;
    }
  }

  &-status {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: $font-mono;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $text-secondary;
    margin-bottom: 24px;

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $success;
      box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
    }
  }

  &-title {
    font-size: clamp(28px, 4.8vw, 64px);
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.03em;
    margin-bottom: 24px;

    .hero-accent {
      display: block;
      color: $accent-primary;
      font-weight: 500;
    }
  }

  &-description {
    font-size: 19px;
    color: $text-secondary;
    line-height: 1.65;
    max-width: 540px;
    margin-bottom: 24px;

    @include respond-to(mobile) {
      font-size: 17px;
    }
  }

  &-meta {
    display: flex;
    align-items: center;
    gap: 14px;
    font-family: $font-mono;
    font-size: 13px;
    color: $text-muted;
    margin-bottom: 24px;

    .meta-sep {
      color: $border-color;
    }
  }

  &-cta {
    display: flex;
    gap: 16px;
    margin-bottom: 28px;
    flex-wrap: wrap;

    @include respond-to(mobile) {
      flex-direction: column;
      align-items: stretch;

      :deep(.base-btn) {
        width: 100%;
      }
    }
  }

  &-social {
    display: flex;
    gap: 12px;
  }
}

.grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 70% 60% at 70% 30%, black, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 70% 30%, black, transparent 75%);
}

.ambient {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);

  &-1 {
    width: 520px;
    height: 520px;
    background: rgba(161, 205, 244, 0.1);
    top: -160px;
    right: -120px;
  }

  &-2 {
    width: 380px;
    height: 380px;
    background: rgba(161, 205, 244, 0.06);
    bottom: -160px;
    left: -120px;
  }
}

.hero-visual {
  display: flex;
  justify-content: center;

  @include respond-to(tablet) {
    max-width: 400px;
    margin: 0 auto;
  }

  @include respond-to(mobile) {
    max-width: 280px;
  }
}

.portrait-frame {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0;
}

.portrait-image {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  background: $bg-secondary;
  border: 1px solid $border-color;

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 55%, rgba(10, 10, 15, 0.55) 100%);
    pointer-events: none;
  }
}

.portrait-fallback {
  width: 100%;
  aspect-ratio: 4 / 5;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $bg-tertiary;
  font-family: $font-heading;
  font-size: 120px;
  font-weight: 700;
  color: $text-secondary;
}

.frame-grid {
  position: absolute;
  inset: 0;
  border-radius: 18px;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.35;
  mix-blend-mode: screen;
}

.portrait-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 0 24px;
  color: $text-primary;

  @include respond-to(mobile) {
    display: none;
  }

  .caption-name {
    font-family: $font-heading;
    font-size: 18px;
    font-weight: 600;
  }

  .caption-role,
  .caption-loc {
    font-family: $font-mono;
    font-size: 11px;
    color: rgba(248, 250, 252, 0.75);
  }

  .caption-loc {
    margin-left: auto;
  }
}

.scroll-hint {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  color: $text-muted;
  font-family: $font-mono;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 8px 16px;
  transition: color 0.3s ease;

  &:hover {
    color: $text-primary;
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateY(2px);
  }

  @include respond-to(mobile) {
    display: none;
  }
}
</style>
