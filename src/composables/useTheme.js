import { ref, watch, onMounted } from 'vue'

const isDark = ref(true)

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  const setTheme = (dark) => {
    isDark.value = dark
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme !== null) {
      isDark.value = savedTheme === 'dark'
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
    }
  })

  watch(isDark, (newValue) => {
    localStorage.setItem('portfolio-theme', newValue ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', newValue ? 'dark' : 'light')
  }, { immediate: true })

  return {
    isDark,
    toggleTheme,
    setTheme
  }
}