import { createI18n } from 'vue-i18n'
import enLocale from '/resources/localization/en.json'

export const i18n = createI18n({
    legacy: false,
    locale: "en-US",
    fallbackLocale: "en-US",
    messages: {"en-US": enLocale},
    warnHtmlMessage: false
})
