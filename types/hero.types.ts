export interface HeroSlide {
  id: string
  title: string
  description: string
  category: string
  image: string
  href: string
  cta: string
}

export interface HeroNavigationProps {
  current: number
  total: number
  onPrevious: () => void
  onNext: () => void
}

export interface HeroSlideProps {
  slide: HeroSlide
  priority?: boolean
}
