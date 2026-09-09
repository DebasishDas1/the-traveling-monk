// types/story.ts
export interface UserStory {
  id: string
  name: string
  email: string
  phone: string
  title: string
  excerpt: string
  content: string
  category: 'Adventure' | 'People' | 'Perspective' | 'Slow Travel'
  location: string
  imageUrl?: string
  approved: boolean
  createdAt: string
}

export interface StoryFormData {
  name: string
  email: string
  phone: string
  title: string
  excerpt: string
  content: string
  category: 'Adventure' | 'People' | 'Perspective' | 'Slow Travel'
  location: string
  imageUrl?: string
}
