import { createI18n } from 'vue-i18n'

// Languages
import en from '/src/lang/en'
import id from '/src/lang/id'

// Get Language in localstorage
const lang = localStorage.getItem('lang') || 'en'

// Switch Language
const languages = ['en', 'id']

const languageNames = {
  en: 'English',
  id: 'Indonesia'
}

// Default Language
const messages = {
  en,
  id
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: lang,
  fallbackLocale: 'en',
  messages
})

export default ({ app }) => {
  app.use(i18n)
}

export { lang, messages, languages, languageNames }
