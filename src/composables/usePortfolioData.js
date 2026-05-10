import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { portfolioData } from '@/data/portfolioData'
import { portfolioDataFr } from '@/data/portfolioData.fr.js'

export function usePortfolioData() {
  const { locale } = useI18n()

  const data = computed(() => {
    const currentLocale = locale.value || 'en'
    return currentLocale === 'fr' ? portfolioDataFr : portfolioData
  })

  return {
    data
  }
}