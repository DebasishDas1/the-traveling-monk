import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
  YouTubeIcon,
  MailIcon,
} from '@/components/myIcons'

export const contactOptions = [
  {
    icon: WhatsAppIcon,
    title: 'WhatsApp',
    description: 'The quickest way to reach us.',
    action: 'Start a conversation',
    href: 'https://wa.me/919999999999',
  },
  {
    icon: MailIcon,
    title: 'Email',
    description: 'For detailed questions and enquiries.',
    action: 'hello@thetravelingmonk.com',
    href: 'mailto:hello@thetravelingmonk.com',
  },
  {
    icon: InstagramIcon,
    title: 'Instagram',
    description: 'Follow us on Instagram for travel inspiration',
    action: 'Follow us',
    href: 'https://www.instagram.com/thetravelingmonk/',
  },
  {
    icon: FacebookIcon,
    title: 'Facebook',
    description: 'Follow us on Facebook for travel inspiration',
    action: 'Follow us',
    href: 'https://www.facebook.com/thetravelingmonk/',
  },
  {
    icon: YouTubeIcon,
    title: 'YouTube',
    description: 'Follow us on YouTube for travel inspiration',
    action: 'Follow us',
    href: 'https://www.youtube.com/thetravelingmonk/',
  },
]

export const faqs = [
  {
    question: 'What should I expect on a trek?',
    answer:
      'Most of our treks involve walking for 4–6 hours a day, with ascents and descents on uneven trails. We keep groups small (8–12 people) and have experienced guides to support you throughout. Accommodation is typically in comfortable guesthouses or homestays, with all meals provided. You’ll carry a daypack, and your main luggage is transported separately. Most importantly, expect incredible views, campfire chats, and a chance to disconnect from the everyday hustle.',
  },
  {
    question: 'Are your experiences beginner friendly?',
    answer:
      'Yes, definitely! We offer a range of experiences suitable for beginners, from gentle walks to moderate treks. Our guides are trained to support first-time trekkers, and we provide detailed preparation guides for each trip. You don’t need prior trekking experience for most of our journeys – just a spirit of adventure and a willingness to try something new.',
  },
  {
    question: 'Can I join a trip alone?',
    answer:
      'Absolutely. Many of our travellers join solo and leave with new friends. We carefully curate our groups to ensure a friendly and inclusive atmosphere. Solo travelers are welcome on all our scheduled trips – you’ll feel right at home from the moment you arrive.',
  },
  {
    question: 'Do you organise private or custom trips?',
    answer:
      'Yes, we do! Whether it’s a family adventure, a corporate retreat, or a trip with your own group of friends, we can create a tailor-made itinerary just for you. We handle everything from route planning and accommodation to food and logistics. Just let us know your dates and preferences, and we’ll design a journey that’s perfect for your group.',
  },
]

export const enquiryTypes = [
  { value: 'experience', label: 'Help me choose an experience' },
  { value: 'trip-question', label: 'I have a question about a trip' },
  { value: 'group-trip', label: 'I want to plan a group trip' },
  { value: 'custom-experience', label: 'Custom experience' },
  { value: 'something-else', label: 'Something else' },
]
