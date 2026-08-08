import type { Experience, ExperienceDifficulty } from '@/types/experience'

export function getTreks(experiences: Experience[]) {
  return experiences.filter((experience) => experience.category === 'trek')
}

export function getFeaturedTrek(experiences: Experience[]) {
  return experiences.find(
    (experience) => experience.category === 'trek' && experience.featured
  )
}

export function filterExperiencesByCategory(
  experiences: Experience[],
  category?: string
) {
  return experiences.filter((experience) => {
    if (category && experience.category !== category) {
      return false
    }
    return true
  })
}

export function filterTreksByDifficulty(
  experiences: Experience[],
  difficulty?: ExperienceDifficulty
) {
  return experiences.filter((experience) => {
    if (experience.category !== 'trek') {
      return false
    }

    if (!difficulty) {
      return true
    }

    return experience.difficulty === difficulty
  })
}
