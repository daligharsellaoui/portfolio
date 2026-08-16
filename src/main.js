import { createApp } from 'vue'
import App from './App.vue'
import i18n from './locales'
import './styles/main.scss'

const app = createApp(App)
app.use(i18n)

// Scroll reveal directive — adds .is-revealed when an element enters the viewport
app.directive('reveal', {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value && binding.value.delay) {
      el.style.transitionDelay = `${binding.value.delay}ms`
    }
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      el.classList.add('is-revealed')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed')
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
  }
})

app.mount('#app')