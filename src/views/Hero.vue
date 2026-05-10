<script setup>
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-vue-next'
import { usePortfolioData } from '@/composables/usePortfolioData'
import MgButton from '@/components/common/MgButton.vue'
import MgBadge from '@/components/common/MgBadge.vue'

const { t, locale } = useI18n()
const { data: portfolioData } = usePortfolioData()

const emit = defineEmits(['navigate'])

const displayedText = ref('')
const fullText = computed(() => portfolioData.value?.tagline || '')
const isTypingComplete = ref(false)

const profileImage = '/profile.jpg'

const techStack = ref([
  { name: 'Vue', color: '#42b883', x: 0, y: -145, dragging: false },
  { name: 'Angular', color: '#dd0031', x: 138, y: -45, dragging: false },
  { name: 'React', color: '#ff6384', x: 85, y: 117, dragging: false },
  { name: 'JavaScript', color: '#ff4785', x: -85, y: 117, dragging: false },
  { name: 'TypeScript', color: '#3178c6', x: -138, y: -45, dragging: false }
])

let typeInterval = null

const startTyping = () => {
  displayedText.value = ''
  isTypingComplete.value = false
  let index = 0

  if (typeInterval) clearInterval(typeInterval)

  typeInterval = setInterval(() => {
    if (index < fullText.value.length) {
      displayedText.value += fullText.value[index]
      index++
    } else {
      clearInterval(typeInterval)
      isTypingComplete.value = true
    }
  }, 40)
}

watch(locale, () => {
  startTyping()
})

let draggedOrb = null
let startX = 0
let startY = 0
let initialX = 0
let initialY = 0

const handleMouseDown = (index, event) => {
  draggedOrb = index
  startX = event.clientX
  startY = event.clientY
  initialX = techStack.value[index].x
  initialY = techStack.value[index].y
  techStack.value[index].dragging = true
  document.body.style.cursor = 'grabbing'
  document.body.style.userSelect = 'none'
}

const handleMouseMove = (event) => {
  if (draggedOrb === null) return
  
  const dx = event.clientX - startX
  const dy = event.clientY - startY
  
  techStack.value[draggedOrb].x = initialX + dx
  techStack.value[draggedOrb].y = initialY + dy
}

const handleMouseUp = () => {
  if (draggedOrb !== null) {
    techStack.value[draggedOrb].dragging = false
    draggedOrb = null
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
  startTyping()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
  if (typeInterval) clearInterval(typeInterval)
})

const navigateTo = (section) => {
  emit('navigate', section)
}

const imageError = ref(false)
const handleImageError = () => {
  imageError.value = true
}
</script>

<template>
  <section class="hero">
    <div class="hero-bg">
      <div class="orb orb-1" />
      <div class="orb orb-2" />
      <div class="orb orb-3" />
    </div>

    <div class="hero-container">
      <div class="hero-content">
        <MgBadge
          variant="success"
          size="medium"
          class="animate-on-scroll"
        >
          {{ t('hero.badge') }}
        </MgBadge>

        <h1
          class="hero-title animate-on-scroll"
          style="animation-delay: 0.1s"
        >
          {{ t('hero.title', { name: portfolioData.name }) }}
        </h1>

        <h2
          class="hero-subtitle animate-on-scroll"
          style="animation-delay: 0.2s"
        >
          {{ t('hero.subtitle', { title: portfolioData.title }) }}
        </h2>

        <p
          class="hero-description animate-on-scroll"
          style="animation-delay: 0.3s"
        >
          {{ displayedText }}<span
            v-if="!isTypingComplete"
            class="cursor"
          >|</span>
        </p>

        <div
          class="hero-cta animate-on-scroll"
          style="animation-delay: 0.4s"
        >
          <MgButton
            variant="primary"
            @click="navigateTo('projects')"
          >
            {{ t('hero.viewWork') }}
            <ArrowRight size="18" />
          </MgButton>
          <MgButton
            variant="secondary"
            @click="navigateTo('contact')"
          >
            {{ t('hero.getInTouch') }}
          </MgButton>
        </div>

        <div
          class="hero-social animate-on-scroll"
          style="animation-delay: 0.5s"
        >
          <MgButton
            v-if="portfolioData?.contact?.social?.github"
            variant="glass"
            size="icon"
            :href="portfolioData.contact.social.github"
            target="_blank"
          >
            <Github size="20" />
          </MgButton>
          <MgButton
            v-if="portfolioData?.contact?.social?.linkedin"
            variant="glass"
            size="icon"
            :href="portfolioData.contact.social.linkedin"
            target="_blank"
          >
            <Linkedin size="20" />
          </MgButton>
          <MgButton
            v-if="portfolioData?.contact?.social?.upwork"
            variant="glass"
            size="icon"
            :href="portfolioData.contact.social.upwork"
            target="_blank"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                fill="currentColor"
                d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"
              />
            </svg>
          </MgButton>
          <MgButton
            v-if="portfolioData?.contact?.email"
            variant="glass"
            size="icon"
            :href="`mailto:${portfolioData.contact.email}`"
          >
            <Mail size="20" />
          </MgButton>
        </div>
      </div>

      <div
        class="hero-visual animate-on-scroll"
        style="animation-delay: 0.3s"
      >
        <div class="profile-section">
          <div class="profile-image-wrapper">
            <img
              v-if="!imageError"
              :src="profileImage"
              alt="Profile"
              class="profile-image"
              @error="handleImageError"
            >
            <div
              v-else
              class="profile-placeholder"
            >
              <span>{{ portfolioData.name.charAt(0) }}</span>
            </div>
            <div class="profile-ring" />
          </div>
          <div
            ref="techOrbsRef"
            class="tech-orbs"
          >
            <div
              v-for="(tech, index) in techStack"
              :key="tech.name"
              class="tech-orb"
              :class="{ dragging: tech.dragging }"
              :style="{
                '--orb-color': tech.color,
                '--delay': `${index * 0.2}s`,
                left: `calc(50% + ${tech.x}px)`,
                top: `calc(50% + ${tech.y}px)`
              }"
              @mousedown="handleMouseDown(index, $event)"
            >
              <span class="tech-name">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="scroll-indicator"
      @click="navigateTo('skills')"
    >
      <div class="mouse">
        <div class="wheel" />
      </div>
      <span>{{ t('hero.scrollToExplore') }}</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 120px 24px 80px;
  overflow: hidden;

  &-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  &-container {
    max-width: $container-max;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;

    @include respond-to(tablet) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  &-content {
    @include respond-to(tablet) {
      order: 2;
    }
  }

  &-title {
    font-size: clamp(40px, 6vw, 64px);
    margin-bottom: 16px;
    animation: fadeInUp 0.6s ease forwards;
    animation-delay: 0.1s;
  }

  &-subtitle {
    font-size: clamp(24px, 3vw, 32px);
    color: $text-secondary;
    margin-bottom: 24px;
    font-weight: 500;
  }

  &-description {
    font-size: 18px;
    color: $text-secondary;
    max-width: 500px;
    margin-bottom: 32px;
    line-height: 1.7;

    @include respond-to(tablet) {
      max-width: 100%;
    }

    .cursor {
      animation: blink 1s infinite;
      color: $accent-primary;
    }
  }

  &-cta {
    display: flex;
    gap: 16px;
    margin-bottom: 32px;

    @include respond-to(tablet) {
      justify-content: center;
    }

    @include respond-to(mobile) {
      flex-direction: column;
    }
  }

  &-social {
    display: flex;
    gap: 16px;

    @include respond-to(tablet) {
      justify-content: center;
    }
  }

  &-visual {
    display: flex;
    justify-content: center;
    align-items: center;

    @include respond-to(tablet) {
      order: 1;
      margin-bottom: 32px;
    }

    @include respond-to(mobile) {
      order: 1;
      margin-bottom: 24px;
    }
  }
}

.profile-section {
  position: relative;
  width: 360px;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;

  @include respond-to(mobile) {
    width: 280px;
    height: 280px;
  }
}

.profile-image-wrapper {
  position: relative;
  width: 220px;
  height: 220px;
  z-index: 2;

  @include respond-to(mobile) {
    width: 160px;
    height: 160px;
  }
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.profile-placeholder {
  width: 100%;
  height: 100%;
  background: $gradient-primary;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $font-heading;
  font-size: 80px;
  font-weight: 700;
  color: $text-primary;

  @include respond-to(mobile) {
    font-size: 56px;
  }
}

.profile-ring {
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  background: $gradient-primary;
  opacity: 0.3;
  animation: pulse 3s infinite;
  z-index: 1;

  @include respond-to(mobile) {
    inset: -8px;
  }
}

.tech-orb {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(18, 18, 26, 0.9);
  border: 2px solid var(--orb-color);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 4s ease-in-out infinite;
  animation-delay: var(--delay);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  z-index: 3;
  cursor: grab;
  transition: box-shadow 0.2s ease, transform 0.1s ease;
  transform: translate(-50%, -50%);

  &.dragging {
    cursor: grabbing;
    animation: none;
    box-shadow: 0 0 30px var(--orb-color);
    z-index: 100;
    transform: translate(-50%, -50%) scale(1.1);
  }

  @include respond-to(mobile) {
    width: 60px;
    height: 60px;
  }

  .tech-name {
    font-family: $font-mono;
    font-size: 11px;
    font-weight: 600;
    color: var(--orb-color);
    text-transform: uppercase;
    pointer-events: none;

    @include respond-to(mobile) {
      font-size: 8px;
    }
  }
}

.center-orb {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: $gradient-primary;
  border-radius: 50%;
  animation: pulse 3s infinite;
  box-shadow: 0 0 40px $accent-primary;

  &::after {
    content: '{ }';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: $font-mono;
    font-size: 20px;
    font-weight: 700;
    color: $text-primary;
  }
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);

  &-1 {
    width: 400px;
    height: 400px;
    background: rgba(99, 102, 241, 0.15);
    top: -100px;
    right: 10%;
    animation: pulse 8s infinite;
  }

  &-2 {
    width: 300px;
    height: 300px;
    background: rgba(139, 92, 246, 0.12);
    bottom: -50px;
    left: 20%;
    animation: pulse 10s infinite;
    animation-delay: 2s;
  }

  &-3 {
    width: 200px;
    height: 200px;
    background: rgba(6, 182, 212, 0.1);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 6s infinite;
    animation-delay: 4s;
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: $text-muted;
  transition: color 0.3s ease;

  @include respond-to(mobile) {
    display: none;
  }

  &:hover {
    color: $text-primary;
  }

  span {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .mouse {
    width: 24px;
    height: 40px;
    border: 2px solid currentColor;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    padding-top: 8px;
  }

  .wheel {
    width: 4px;
    height: 8px;
    background: currentColor;
    border-radius: 2px;
    animation: scroll 2s infinite;
  }
}

@keyframes scroll {
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(8px);
    opacity: 0.5;
  }
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;

  &:nth-child(1) { animation-delay: 0s; }
  &:nth-child(2) { animation-delay: 0.1s; }
  &:nth-child(3) { animation-delay: 0.2s; }
  &:nth-child(4) { animation-delay: 0.3s; }
  &:nth-child(5) { animation-delay: 0.4s; }
  &:nth-child(6) { animation-delay: 0.5s; }
}
</style>