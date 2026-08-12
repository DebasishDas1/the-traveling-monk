export interface Story {
  slug: string
  title: string
  excerpt: string
  category: string
  location: string
  image: string
  imageAlt: string
  readTime: string
  featured?: boolean
}

export const stories: Story[] = [
  {
    slug: 'why-we-go-to-the-mountains',
    title: 'Why we keep going back to the mountains',
    excerpt:
      'Sometimes the best way to hear yourself think is to walk somewhere quiet.',
    category: 'Perspective',
    location: 'Himalayas',
    image: '/images/stories/mountains.jpg',
    imageAlt: 'A quiet Himalayan mountain landscape',
    readTime: '5 min read',
    featured: true,
  },
  {
    slug: 'travel-with-strangers',
    title: 'We arrived as strangers',
    excerpt:
      'Somewhere between the first trail and the last dinner, strangers become friends.',
    category: 'People',
    location: 'Himachal Pradesh',
    image: '/images/stories/friends.jpg',
    imageAlt: 'Travellers walking together in the mountains',
    readTime: '4 min read',
  },
  {
    slug: 'the-art-of-slow-travel',
    title: 'The art of going nowhere quickly',
    excerpt: 'There is something beautiful about having nowhere else to be.',
    category: 'Slow Travel',
    location: 'Himalayas',
    image: '/images/stories/slow-travel.jpg',
    imageAlt: 'A traveller enjoying a quiet mountain morning',
    readTime: '6 min read',
  },
  {
    slug: 'what-a-trek-teaches-you',
    title: 'What a difficult trail quietly teaches you',
    excerpt:
      'The mountain rarely gives you what you expect. That might be the point.',
    category: 'Adventure',
    location: 'Himalayas',
    image: '/images/stories/trail.jpg',
    imageAlt: 'A trail leading through the mountains',
    readTime: '7 min read',
  },
  {
    slug: 'more-than-a-place',
    title: 'A place becomes a memory because of the people',
    excerpt: 'The destination is only half the story.',
    category: 'People',
    location: 'Uttarakhand',
    image: '/images/stories/community.jpg',
    imageAlt: 'Friends sharing a moment during a journey',
    readTime: '4 min read',
  },
  {
    slug: 'leave-room-for-the-unplanned',
    title: 'Leave a little room for the unplanned',
    excerpt:
      'The best parts of a journey rarely arrive exactly when the itinerary says they will.',
    category: 'Perspective',
    location: 'The Road',
    image: '/images/stories/road.jpg',
    imageAlt: 'A road disappearing into a mountain landscape',
    readTime: '5 min read',
  },
]

export const quoteList = [
  {
    quote: 'It honestly felt like travelling with old friends.',
    name: 'Riya',
    location: 'Mumbai',
  },
  {
    quote: 'I came back feeling lighter than when I left.',
    name: 'Arjun',
    location: 'Bengaluru',
  },
  {
    quote: 'Somewhere along the trail, I stopped checking my phone.',
    name: 'Meera',
    location: 'Delhi',
  },
]
