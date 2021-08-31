import { createI18n } from 'vue-i18n'

const ruPluralization = (choice, choicesLength) => {
  if (choice === 0) {
    return 0
  }

  const teen = choice > 10 && choice < 20
  const endsWithOne = choice % 10 === 1

  if (!teen && endsWithOne) {
    return 1
  }

  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2
  }

  return choicesLength < 4 ? 2 : 3
}

import ruTranslation from '@static/locales/ru.json'

export default createI18n({
  locale: 'ru',
  fallbackLocale: 'ru',
  pluralizationRules: {
    ru: ruPluralization
  },
  messages: {
    ru: ruTranslation
  }
})
