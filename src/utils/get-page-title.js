import defaultSettings from '@/settings'
import i18n from '@/lang'

const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    // Check if pageTitle is an i18n key (contains dot) or plain text
    const displayTitle = pageTitle.includes('.') ? i18n.t(pageTitle) : pageTitle
    return `${displayTitle} - ${title}`
  }
  return `${title}`
}
