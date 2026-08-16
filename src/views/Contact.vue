<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Send, Github, Linkedin, CheckCircle, ArrowRight, Mail, MapPin } from 'lucide-vue-next'
import { usePortfolioData } from '@/composables/usePortfolioData'
import MgForm from '@/components/common/MgForm.vue'
import MgInput from '@/components/common/MgInput.vue'
import MgButton from '@/components/common/MgButton.vue'

const { t } = useI18n()
const { data: portfolioData } = usePortfolioData()

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validateForm = () => {
  let isValid = true

  errors.name = ''
  errors.email = ''
  errors.message = ''

  if (!form.name.trim()) {
    errors.name = t('contact.validation.nameRequired')
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = t('contact.validation.emailRequired')
    isValid = false
  } else if (!validateEmail(form.email)) {
    errors.email = t('contact.validation.emailInvalid')
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = t('contact.validation.messageRequired')
    isValid = false
  } else if (form.message.length < 10) {
    errors.message = t('contact.validation.messageTooShort')
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  await new Promise(resolve => setTimeout(resolve, 1500))

  isSubmitting.value = false
  isSubmitted.value = true

  setTimeout(() => {
    isSubmitted.value = false
    form.name = ''
    form.email = ''
    form.message = ''
  }, 4000)
}

const socialLinks = computed(() => {
  const social = portfolioData.value?.contact?.social || {}
  return [
    { id: 'github', icon: Github, label: 'GitHub', url: social.github },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', url: social.linkedin },
    { id: 'upwork', icon: 'upwork', label: 'Upwork', url: social.upwork }
  ].filter(link => link.url)
})

const formLabels = computed(() => ({
  name: t('contact.form.name'),
  email: t('contact.form.email'),
  message: t('contact.form.message'),
  namePlaceholder: t('contact.form.namePlaceholder'),
  emailPlaceholder: t('contact.form.emailPlaceholder'),
  messagePlaceholder: t('contact.form.messagePlaceholder')
}))
</script>

<template>
  <section
    id="contact"
    class="contact"
  >
    <div class="container">
      <div
        v-reveal
        class="contact-hero"
      >
        <span class="section-label">{{ t('contact.label') }}</span>
        <h2 class="contact-title">
          {{ t('contact.title') }}
          <em class="accent-serif contact-accent">{{ t('contact.titleAccent') }}</em>
        </h2>
        <p class="contact-description">
          {{ t('contact.description') }}
        </p>
        <div class="contact-cta">
          <MgButton
            variant="primary"
            size="large"
            :href="`mailto:${portfolioData?.contact?.email || ''}`"
          >
            {{ t('contact.letsTalk') }}
            <ArrowRight size="18" />
          </MgButton>
        </div>
      </div>

      <div
        v-reveal
        class="contact-panel"
      >
        <MgForm
          class="contact-form"
          :on-submit="handleSubmit"
        >
          <h3 class="form-title">
            {{ t('contact.form.title') }}
          </h3>

          <MgInput
            v-model="form.name"
            type="text"
            :label="formLabels.name"
            :placeholder="formLabels.namePlaceholder"
            :error="errors.name"
          />

          <MgInput
            v-model="form.email"
            type="email"
            :label="formLabels.email"
            :placeholder="formLabels.emailPlaceholder"
            :error="errors.email"
          />

          <MgInput
            v-model="form.message"
            type="textarea"
            :label="formLabels.message"
            :placeholder="formLabels.messagePlaceholder"
            :error="errors.message"
          />

          <MgButton
            type="submit"
            variant="primary"
            :disabled="isSubmitting"
            class="submit-btn"
          >
            <span
              v-if="isSubmitting"
              class="loading-spinner"
            />
            <template v-else>
              <Send size="18" />
              <span>{{ t('contact.form.send') }}</span>
            </template>
          </MgButton>

          <Transition name="success">
            <div
              v-if="isSubmitted"
              class="success-message"
            >
              <CheckCircle size="20" />
              <span>{{ t('contact.success') }}</span>
            </div>
          </Transition>
        </MgForm>

        <aside class="contact-side">
          <a
            class="side-row"
            :href="`mailto:${portfolioData?.contact?.email || ''}`"
          >
            <Mail size="18" />
            <span>
              <small>{{ t('contact.info.email') }}</small>
              <strong>{{ portfolioData?.contact?.email || '' }}</strong>
            </span>
          </a>

          <div class="side-row">
            <MapPin size="18" />
            <span>
              <small>{{ t('contact.info.location') }}</small>
              <strong>{{ portfolioData?.contact?.location || '' }}</strong>
            </span>
          </div>

          <div class="side-row side-availability">
            <span class="availability-dot" />
            <span>
              <small>{{ t('contact.availability.title') }}</small>
              <strong>{{ t('contact.availability.description') }}</strong>
            </span>
          </div>

          <div class="side-social">
            <span class="social-label">{{ t('contact.social') }}</span>
            <div class="social-icons">
              <MgButton
                v-for="social in socialLinks"
                :key="social.id"
                variant="glass"
                size="icon"
                :href="social.url"
                target="_blank"
                :aria-label="social.label"
              >
                <svg
                  v-if="social.icon === 'upwork'"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path
                    fill="currentColor"
                    d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"
                  />
                </svg>
                <component
                  :is="social.icon"
                  v-else
                  size="18"
                />
              </MgButton>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contact {
  padding: $section-padding 0;
  position: relative;

  @include respond-to(mobile) {
    padding: $section-padding-mobile 0;
  }
}

.contact-hero {
  max-width: 860px;
  margin-bottom: 72px;

  .section-title {
    font-size: clamp(36px, 5.4vw, 64px);
    letter-spacing: -0.02em;
    margin-bottom: 24px;
  }

  .contact-accent {
    display: block;
    color: $accent-primary;
  }

  .contact-description {
    font-size: 18px;
    line-height: 1.7;
    color: $text-secondary;
    max-width: 620px;
    margin-bottom: 36px;
  }
}

.contact-panel {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 56px;
  align-items: start;

  @include respond-to(tablet) {
    grid-template-columns: 1fr;
  }
}

.contact-form {
  .form-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 28px;
  }

  :deep(.mg-input) {
    margin-bottom: 20px;
  }
}

.submit-btn {
  width: 100%;
  position: relative;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: $text-primary;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.success-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  padding: 16px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 12px;
  color: $success;
  font-weight: 500;
}

.success-enter-active,
.success-leave-active {
  transition: all 0.3s ease;
}

.success-enter-from,
.success-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.contact-side {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 8px;
}

.side-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  border: 1px solid $border-color;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.015);
  transition: border-color 0.3s ease;
  color: $text-secondary;

  > svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: $accent-primary;
  }

  small {
    display: block;
    font-family: $font-mono;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $text-muted;
    margin-bottom: 4px;
  }

  strong {
    font-size: 15px;
    font-weight: 500;
    color: $text-primary;
  }

  &:hover {
    border-color: rgba(161, 205, 244, 0.35);
  }
}

.side-availability {
  .availability-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: $success;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
    flex-shrink: 0;
    margin-top: 4px;
  }
}

.side-social {
  padding: 20px 24px;

  .social-label {
    font-family: $font-mono;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $text-muted;
    display: block;
    margin-bottom: 14px;
  }

  .social-icons {
    display: flex;
    gap: 12px;
  }
}
</style>
