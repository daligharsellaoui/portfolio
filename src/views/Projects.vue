<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowUpRight } from 'lucide-vue-next'
import { usePortfolioData } from '@/composables/usePortfolioData'

const { t } = useI18n()
const { data: portfolioData } = usePortfolioData()

const products = computed(() => portfolioData.value?.products || [])
const projects = computed(() => portfolioData.value?.projects || [])

// Real product screenshots live in /public/images as {product-id}.png
const productImage = (id) => `/images/${id}.png`

// Hover preview for the selected-work list
const hoveredProject = ref(null)
const previewPos = ref({ x: 0, y: 0 })

const PREVIEW_WIDTH = 320
const PREVIEW_HEIGHT = 210
const PREVIEW_PAD = 16

// Detect which project images exist so hover previews work with any file
// dropped into /public/images — no hardcoded list to maintain.
const projectImages = ref({})

const probeImage = (name) => new Promise((resolve) => {
  const img = new Image()
  img.onload = () => resolve(true)
  img.onerror = () => resolve(false)
  img.src = `/images/${name}.jpg`
})

const loadProjectImages = async () => {
  const names = [...new Set(projects.value.map(p => p.image).filter(Boolean))]
  const results = await Promise.all(names.map(async (name) => [name, await probeImage(name)]))
  results.forEach(([name, ok]) => {
    projectImages.value[name] = ok
  })
}

onMounted(loadProjectImages)

const projectImage = (project) => (
  project.image && projectImages.value[project.image] ? `/images/${project.image}.jpg` : null
)

const showPreview = (project, event) => {
  hoveredProject.value = project
  updatePreviewPos(event)
}

const updatePreviewPos = (event) => {
  let x = event.clientX + 20
  if (x + PREVIEW_WIDTH > window.innerWidth - PREVIEW_PAD) {
    x = event.clientX - PREVIEW_WIDTH - 20
  }

  let y = event.clientY
  if (y + PREVIEW_HEIGHT > window.innerHeight - PREVIEW_PAD) {
    y = event.clientY - PREVIEW_HEIGHT
  }

  previewPos.value = { x, y }
}

const hidePreview = () => {
  hoveredProject.value = null
}
</script>

<template>
  <section
    id="work"
    class="work"
  >
    <div class="container">
      <header
        v-reveal
        class="work-header"
      >
        <div class="header-left">
          <span class="section-label">{{ t('work.label') }}</span>
          <h2 class="section-title">
            {{ t('work.title') }}
          </h2>
        </div>
        <p class="header-description">
          {{ t('work.description') }}
        </p>
      </header>

      <article
        v-for="(product, index) in products"
        :key="product.id"
        class="case-study"
        :class="{ reverse: index % 2 === 1 }"
      >
        <div
          v-reveal
          class="case-copy"
        >
          <span class="case-index">0{{ index + 1 }}</span>
          <h3 class="case-name">
            {{ product.name }}
          </h3>
          <p class="case-category">
            {{ product.category }}
          </p>
          <p class="case-description">
            {{ product.description }}
          </p>

          <div class="case-block">
            <span class="case-label">{{ t('work.capabilities') }}</span>
            <ul class="case-caps">
              <li
                v-for="cap in product.capabilities"
                :key="cap"
              >
                {{ cap }}
              </li>
            </ul>
          </div>
        </div>

        <div
          v-reveal="{ delay: 120 }"
          class="case-visual"
        >
          <div class="shot-frame">
            <div class="shot-chrome">
              <span class="shot-dot red" />
              <span class="shot-dot yellow" />
              <span class="shot-dot green" />
              <span class="shot-title">{{ product.name }}</span>
            </div>
            <img
              :src="productImage(product.id)"
              :alt="`${product.name} — ${product.category}`"
              class="shot-image"
              loading="lazy"
            >
          </div>
        </div>
      </article>

      <div
        v-reveal
        class="more-work"
      >
        <header class="more-header">
          <div>
            <span class="section-label">{{ t('work.moreLabel') }}</span>
            <h3 class="more-title">
              {{ t('work.moreTitle') }}
            </h3>
          </div>
          <p class="more-description">
            {{ t('work.moreDescription') }}
          </p>
        </header>

        <ul class="work-list">
          <li
            v-for="(project, index) in projects"
            :key="project.id"
            class="work-row"
            @mouseenter="showPreview(project, $event)"
            @mousemove="updatePreviewPos"
            @mouseleave="hidePreview"
          >
            <span class="row-index">0{{ index + 1 }}</span>
            <div class="row-main">
              <h4 class="row-title">
                {{ project.title }}
              </h4>
              <p class="row-description">
                {{ project.description }}
              </p>
              <div class="row-tech">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                >{{ tech }}</span>
              </div>
            </div>
            <a
              v-if="project.liveUrl && project.liveUrl !== '#'"
              class="row-link"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener"
              :aria-label="`${project.title} — open`"
            >
              <ArrowUpRight size="20" />
            </a>
            <span
              v-else
              class="row-link row-link-disabled"
              aria-hidden="true"
            >
              <ArrowUpRight size="20" />
            </span>
          </li>
        </ul>

        <Transition name="preview">
          <div
            v-if="hoveredProject"
            class="work-preview"
            :style="{ left: `${previewPos.x}px`, top: `${previewPos.y}px` }"
            aria-hidden="true"
          >
            <img
              v-if="projectImage(hoveredProject)"
              :src="projectImage(hoveredProject)"
              :alt="hoveredProject.title"
            >
            <div
              v-else
              class="preview-placeholder"
            >
              <span>{{ hoveredProject.title }}</span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.work {
  padding: $section-padding 0;
  background: $surface-alt;

  @include respond-to(mobile) {
    padding: $section-padding-mobile 0;
  }
}

.work-header {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 48px;
  align-items: end;
  margin-bottom: 72px;

  @include respond-to(tablet) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 56px;
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

.case-study {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: 64px;
  align-items: center;
  padding: 56px 0;
  border-top: 1px solid $border-color;

  &.reverse {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);

    .case-copy {
      order: 2;
    }

    .case-visual {
      order: 1;
    }
  }

  @include respond-to(tablet) {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 48px 0;

    &.reverse {
      grid-template-columns: 1fr;

      .case-copy { order: 1; }
      .case-visual { order: 2; }
    }
  }

  &:last-of-type {
    padding-bottom: 80px;
  }
}

.case-copy {
  .case-index {
    font-family: $font-mono;
    font-size: 12px;
    color: $text-muted;
    letter-spacing: 0.08em;
  }

  .case-name {
    font-size: clamp(34px, 4vw, 52px);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 12px 0 6px;
  }

  .case-category {
    font-family: $font-mono;
    font-size: 13px;
    color: $text-secondary;
    margin-bottom: 24px;
  }

  .case-description {
    font-size: 17px;
    line-height: 1.7;
    color: $text-secondary;
    margin-bottom: 28px;
  }
}

.case-block {
  margin-bottom: 24px;

  .case-label {
    display: block;
    font-family: $font-mono;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $text-muted;
    margin-bottom: 12px;
  }

  p {
    font-size: 15px;
    line-height: 1.7;
    color: $text-primary;
  }
}

.case-caps {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 24px;

  @include respond-to(mobile) {
    grid-template-columns: 1fr;
  }

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
      width: 6px;
      height: 6px;
      border-radius: 2px;
      background: $accent-primary;
      opacity: 0.6;
    }
  }
}

.case-visual {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -8% -6%;
    background: radial-gradient(ellipse at center, rgba(161, 205, 244, 0.07), transparent 70%);
    pointer-events: none;
  }
}

.shot-frame {
  position: relative;
  z-index: 1;
  border-radius: 16px;
  overflow: hidden;
  background: #0f0f17;
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
}

.shot-chrome {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: #16161f;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  .shot-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.14);

    &.red { background: #ff5f57; }
    &.yellow { background: #febc2e; }
    &.green { background: #28c840; }
  }

  .shot-title {
    margin-left: 8px;
    font-family: $font-mono;
    font-size: 10px;
    color: rgba(248, 250, 252, 0.5);
  }
}

.shot-image {
  display: block;
  width: 100%;
  aspect-ratio: 21 / 10;
  object-fit: cover;
}

.more-work {
  padding-top: 48px;
  border-top: 1px solid $border-color;
}

.more-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 40px;

  @include respond-to(mobile) {
    flex-direction: column;
    align-items: flex-start;
  }

  .more-title {
    font-size: clamp(26px, 3.4vw, 40px);
    letter-spacing: -0.02em;
  }

  .more-description {
    font-size: 15px;
    color: $text-muted;
    max-width: 380px;
  }
}

.work-list {
  display: flex;
  flex-direction: column;
}

.work-row {
  display: grid;
  grid-template-columns: 56px 1fr 48px;
  gap: 24px;
  align-items: start;
  padding: 28px 0;
  border-top: 1px solid $border-color;
  transition: background 0.3s ease;

  &:last-child {
    border-bottom: 1px solid $border-color;
  }

  @include respond-to(mobile) {
    grid-template-columns: 40px 1fr 32px;
    gap: 16px;
    padding: 24px 0;
  }

  &:hover {
    .row-title {
      color: $accent-primary;
    }

    .row-link {
      color: $text-primary;
      border-color: rgba(161, 205, 244, 0.4);
      transform: translateY(-2px);
    }
  }
}

.row-index {
  font-family: $font-mono;
  font-size: 12px;
  color: $text-muted;
  padding-top: 6px;
}

.row-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  transition: color 0.3s ease;

  @include respond-to(mobile) {
    font-size: 17px;
  }
}

.row-description {
  font-size: 15px;
  color: $text-secondary;
  line-height: 1.65;
  max-width: 640px;
  margin-bottom: 14px;
}

.row-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    font-family: $font-mono;
    font-size: 11px;
    color: $text-muted;
    border: 1px solid $border-color;
    border-radius: 999px;
    padding: 4px 10px;
  }
}

.row-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid $border-color;
  border-radius: 10px;
  color: $text-muted;
  transition: all 0.3s ease;

  @include respond-to(mobile) {
    width: 34px;
    height: 34px;
  }
}

.row-link-disabled {
  opacity: 0.4;
  cursor: default;
}

.work-preview {
  position: fixed;
  z-index: 60;
  width: 400px;
  height: 262px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
  background: $surface-raised;
  pointer-events: none;
  transform: translateY(-35%);

  @media (hover: none) {
    display: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.preview-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, rgba(161, 205, 244, 0.14), rgba(59, 130, 246, 0.14));

  span {
    font-family: $font-mono;
    font-size: 12px;
    letter-spacing: 0.04em;
    color: $text-secondary;
  }
}

.preview-enter-active,
.preview-leave-active {
  transition: opacity 0.18s ease;
}

.preview-enter-from,
.preview-leave-to {
  opacity: 0;
}
</style>
