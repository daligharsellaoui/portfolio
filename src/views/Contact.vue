<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Send, Github, Linkedin, CheckCircle } from 'lucide-vue-next'
import { usePortfolioData } from '@/composables/usePortfolioData'
import MgSection from '@/components/common/MgSection.vue'
import MgForm from '@/components/common/MgForm.vue'
import MgInput from '@/components/common/MgInput.vue'
import MgButton from '@/components/common/MgButton.vue'
import MgBadge from '@/components/common/MgBadge.vue'
import MgIcon from '@/components/common/MgIcon.vue'

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
  }, 3000)
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
  <MgSection id="contact">
    <template #header>
      <span class="section-label">{{ t('contact.label') }}</span>
      <h2 class="section-title">
        {{ t('contact.title') }}
      </h2>
      <p class="section-description">
        {{ t('contact.description') }}
      </p>
    </template>

    <div class="contact-grid">
      <MgForm :on-submit="handleSubmit">
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

      <div class="contact-info">
        <MgCard
          class="info-card"
          :hoverable="false"
        >
          <div class="info-header">
            <MgIcon
              :icon="'<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><path d=\'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\'></path><polyline points=\'22,6 12,13 2,6\'></polyline></svg>'"
              size="medium"
            />
            <div class="info-content">
              <h4>{{ t('contact.info.email') }}</h4>
              <a :href="`mailto:${portfolioData?.contact?.email || ''}`">{{ portfolioData?.contact?.email || '' }}</a>
            </div>
          </div>
        </MgCard>

        <MgCard
          class="info-card"
          :hoverable="false"
        >
          <div class="info-header">
            <MgIcon
              :icon="'<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><path d=\'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\'></path><circle cx=\'12\' cy=\'10\' r=\'3\'></circle></svg>'"
              size="medium"
            />
            <div class="info-content">
              <h4>{{ t('contact.info.location') }}</h4>
              <span>{{ portfolioData?.contact?.location || '' }}</span>
            </div>
          </div>
        </MgCard>

        <div class="availability-status">
          <MgBadge
            variant="success"
            size="small"
          />
          <div class="status-content">
            <h4>{{ t('contact.availability.title') }}</h4>
            <p>{{ t('contact.availability.description') }}</p>
          </div>
        </div>

        <div class="social-links">
          <h4>{{ t('contact.social') }}</h4>
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
                width="20"
                height="20"
              >
                <path
                  fill="currentColor"
                  d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"
                />
              </svg>
              <component
                :is="social.icon"
                v-else
                size="20"
              />
            </MgButton>
          </div>
        </div>
      </div>
    </div>
  </MgSection>
</template>

<style lang="scss" scoped>
.contact {
  &-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 48px;

    @include respond-to(tablet) {
      grid-template-columns: 1fr;
    }
  }

  &-form {
    @include glassmorphism;
    border-radius: $radius-card;
    padding: 40px;

    @include respond-to(mobile) {
      padding: 24px;
    }
  }

  &-info {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}

.form-group {
  margin-bottom: 24px;

  label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: $text-secondary;
    margin-bottom: 8px;
  }

  input, textarea {
    width: 100%;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid $border-color;
    border-radius: $radius-input;
    color: $text-primary;
    font-size: 16px;
    transition: all 0.3s ease;

    &::placeholder {
      color: $text-muted;
    }

    &:focus {
      outline: none;
      border-color: $accent-primary;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    &.error {
      border-color: #ef4444;

      &:focus {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    }
  }

  textarea {
    resize: vertical;
    min-height: 140px;
  }
}

.error-message {
  display: block;
  font-size: 12px;
  color: #ef4444;
  margin-top: 6px;
}

:deep(.submit-btn) {
  width: 100%;
  padding: 16px 32px;
  font-size: 16px;
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
  border-radius: $radius-input;
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

.contact-info {
  .info-card {
    padding: 24px;
    margin-bottom: 16px;
  }

  :deep(.base-card) {
    padding: 24px;
  }
}

:deep(.info-header) {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.info-content {
  h4 {
    font-size: 14px;
    color: $text-muted;
    font-weight: 500;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  a, span {
    font-size: 16px;
    color: $text-primary;
    font-weight: 500;
  }

  a:hover {
    color: $accent-primary;
  }
}

.availability-status {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.15);
  border-radius: $radius-card;

  .status-content {
    h4 {
      font-size: 16px;
      color: $text-primary;
      margin-bottom: 4px;
    }

    p {
      font-size: 14px;
      color: $text-secondary;
    }
  }
}

.social-links {
  h4 {
    font-size: 14px;
    color: $text-muted;
    font-weight: 500;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.social-icons {
  display: flex;
  gap: 12px;
}
</style>