// Type definitions for language data structure

export interface SocialIcon {
  name: string
  icon: string
  link: string
  color: string
}

export interface Logo {
  text: string
  description: string
}

export interface Search {
  placeholder: string
  button: string
}

export interface Navigation {
  store: string
  home: string
}

export interface Meta {
  title: string
  description: string
  keywords: string
}

export interface Header {
  logo: Logo
  search: Search
  navigation: Navigation
  meta: Meta
}

export interface Social {
  title: string
  icons: SocialIcon[]
}

export interface Copyright {
  text: string
  company: string
}

export interface Footer {
  social: Social
  copyright: Copyright
}

export interface Trusted {
  title: string
}

export interface ServiceItem {
  icon: string
  title: string
  description: string
}

export interface Services {
  title: string
  items: ServiceItem[]
}

export interface Products {
  featured: string
  gaming: string
  gamingDescription: string
  allProducts: string
  back: string
  onSale: string
  endingIn: string
  offerExpired: string
  endow: string
  latest: string
  viewAll: string
  searchResults: string
  results: string
  found: string
  noProducts: string
  trySearching: string
  backToProducts: string
  reviews: string
  off: string
  productInfo: string
  specifications: string
  stock: string
  available: string
  category: string
  country: string
  sku: string
  tags: string
}

export interface LanguageData {
  header: Header
  footer: Footer
  trusted: Trusted
  services: Services
  products: Products
}

export type SupportedLanguage = 'en' | 'ur' | 'ar'
