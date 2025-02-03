import { useI18n } from 'vue-i18n'

export default ({ app }) => {
  app.config.globalProperties.$formatViews = (views) => {
    const { t } = useI18n()
    if (views >= 1000) {
      return (views / 1000).toFixed(1).replace('.0', '') + t('public.viewsText')
    }
    return views.toString()
  }
}
