import type { LanguageData, SupportedLanguage } from './languages/types'

// Import language data directly
import enData from './languages/en.json'
import urData from './languages/ur.json'
import arData from './languages/ar.json'

const languageData: Record<SupportedLanguage, LanguageData> = {
  en: enData,
  ur: urData,
  ar: arData,
}

export default defineEventHandler((event): LanguageData => {
  // Get language from query parameter, default to 'en'
  const query = getQuery(event)
  const lang = (query.lang as string) || 'en'
  
  // Supported languages
  const supportedLanguages: SupportedLanguage[] = ['en', 'ur', 'ar']
  
  // Validate language parameter
  if (!supportedLanguages.includes(lang as SupportedLanguage)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Unsupported language: ${lang}. Supported languages: ${supportedLanguages.join(', ')}`
    })
  }
  
  // Return the language-specific data
  return languageData[lang as SupportedLanguage]
})
