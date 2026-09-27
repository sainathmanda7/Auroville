// -----------------------------------------------------------------------------
// Centralized, editable content for Auroville Farmstay.
// Edit values here to update the whole site.
// -----------------------------------------------------------------------------

export const site = {
  name: 'Auroville Farmstay',
  fullName: 'Auroville Farmstay',
  location: 'Moinabad, near Hyderabad, Telangana',
  // Primary phone
  phone: '+91 86889 67145',
  phoneHref: 'tel:+918688967145',
  // WhatsApp
  whatsapp: '918688967145',
  whatsappMessage: 'Hello! I would like to enquire about a stay at Auroville Farmstay.',
  // Configurable Google Maps links for Auroville FarmStay.
  mapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Auroville+FarmStay+Moinabad+Hyderabad',
  mapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Auroville+FarmStay+Moinabad',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.747985118099!2d78.26889131065958!3d17.279423183521065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbc122cba77cab%3A0x435454930bad970b!2sAuroville%20FarmStay!5e0!3m2!1sen!2sin!4v1790497567037!5m2!1sen!2sin',
} as const

export function whatsappUrl(message = site.whatsappMessage) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

export const nav = [
  { label: 'Home', href: '/#home' },
  { label: 'Rooms', href: '/#rooms' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
] as const

export type Room = {
  id: string
  label: string
  name: string
  image: string
  description: string
  details: string[]
}

// Room names/features are editable placeholders â€” replace with actual details.
export const rooms: Room[] = [
  {
    id: 'room-01',
    label: 'Room 01',
    name: 'Bed Room',
    image: '/Rooms/bed room.webp',
    description:
      'A serene, sunlit bedroom designed with warm tones and restful comforts for a calm countryside stay.',
    details: ['King bed', 'Air conditioning', 'Garden views', 'Attached bathroom'],
  },
  {
    id: 'room-02',
    label: 'Room 02',
    name: 'Living Lounge',
    image: '/Rooms/living area 1.webp',
    description:
      'A spacious living space with ample seating, airy natural lighting, and relaxed farm vibes.',
    details: ['Lounge seating', 'Open layout', 'Scenic views', 'Ceiling fans'],
  },
  {
    id: 'room-03',
    label: 'Room 03',
    name: 'Family Hall',
    image: '/Rooms/living area 2.webp',
    description:
      'A cozy indoor gathering space ideal for conversations, board games, and quiet evenings.',
    details: ['Comfortable sofas', 'Warm lighting', 'Entertainment ready', 'Cross ventilation'],
  },
]

export const amenities = [
  'Hill & valley views',
  'Open terrace',
  'Home-cooked meals',
  'Parking on site',
  'Peaceful surroundings',
  'Warm homestay hospitality',
]

export type Experience = {
  id: string
  number: string
  title: string
  tagline: string
  badge: string
  description: string
  image: string
  highlights: string[]
}

// Curated on-site experiences at the property
export const experiences: Experience[] = [
  {
    id: 'exp-bonfire',
    number: '01',
    badge: 'Evening Gathering',
    tagline: 'Warmth under the stars',
    title: 'Campfire & Starlit Hearth',
    description:
      'As dusk cools the mountain air, our stone hearth comes alive. Gather under the timber pergola, let the crackle of wood set a peaceful rhythm, and share unhurried conversations under an open blanket of stars.',
    image: '/Experience/fire.webp',
    highlights: [
      'Stone Fire Hearth',
      'Pergola Lounge Benches',
      'Ambient Lantern Lighting',
      'Cool Mountain Breezes',
    ],
  },
  {
    id: 'exp-cinema',
    number: '02',
    badge: 'Signature Feature',
    tagline: 'Cinema under the night sky',
    title: 'Open-Air Cinema Lounge',
    description:
      'Recline in plush leather armchairs inside our private garden pavilion. With a crisp projection screen, warm pendant lighting, and gentle tropical night sounds, every movie becomes an unforgettable cinematic escape.',
    image: '/Experience/theater.webp',
    highlights: [
      'Plush Recliner Loungers',
      'High-Definition Screen',
      'Warm Edison Glow',
      'Surrounding Greenery',
    ],
  },
  {
    id: 'exp-pool',
    number: '03',
    badge: 'Day & Night Oasis',
    tagline: 'Cascading serenity',
    title: 'Water Curtain Pool',
    description:
      'Immerse yourself in shimmering waters highlighted by an ambient rainfall water-curtain feature. Enjoy an invigorating afternoon swim or a calm evening dip under soft pool glow and swaying palm trees.',
    image: '/Experience/water.webp',
    highlights: [
      'Rainfall Water Curtain',
      'Sunken Deck & Seating',
      'Subtle Night Illumination',
      'Lush Tropical Surroundings',
    ],
  },
]

export type GalleryImage = {
  src: string
  alt: string
  category: 'Property' | 'Rooms' | 'Views' | 'Nature' | 'Coorg' | 'Experience'
}

export const gallery: GalleryImage[] = [
  {
    src: '/Gallery/overview.webp',
    alt: 'Farmstay Aerial & Overview',
    category: 'Property',
  },
  {
    src: '/Gallery/pool.webp',
    alt: 'Swimming Pool',
    category: 'Property',
  },
  {
    src: '/Gallery/projector.webp',
    alt: 'Outdoor Projector & Movie Setup',
    category: 'Property',
  },
  {
    src: '/Gallery/playarea.webp',
    alt: 'Lawn & Play Area',
    category: 'Nature',
  },
  {
    src: '/Gallery/nightview.webp',
    alt: 'Night Ambiance & Lighting',
    category: 'Views',
  },
  {
    src: '/Gallery/view.webp',
    alt: 'Scenic Farm Surroundings',
    category: 'Views',
  },
]

export type Testimonial = {
  quote: string
  name: string
  detail?: string
}

export const testimonials: Testimonial[] = [
  {
    quote: "We felt like home food was delicious. Rooms big and clean. Very Sweet family took care of everything. Took us around his farm beautiful. The food was so delicious we had all our meals at home. If their was more than 5 stars I would have given them 100 stars. Enjoyed our stay excellent. Thanks a lot for everything.",
    name: "Jahanafrin",
  },
  {
    quote: "Really good stay! Very homely atmosphere and the owner was very friendly and staff was helpful. The plantation around the stay was soo beautiful, perfect to take a stroll around and experience the nature.",
    name: "Shrirame",
  },
  {
    quote: "I liked the homely food, clean rooms and prompt service provided by the caretaker Pushpa. The drive to property is an experience that you shouldn't miss, nested in nature away from the city.",
    name: "Suraj",
  },
  {
    quote: "The View, the rooms, the road to go there, the coffee estate, the cleanliness, the homely feel, the food, the hospitality of staff what not? Everthing is amazing here. The homely hospitality of the...",
    name: "Bhanu",
  },
  {
    quote: "Very nice and excellent stay. Staff are very friendly, we feel like home. Good service enjoyed the stay very much. Must stay spot in Coorg and it's away from all the town noises and busy routes...",
    name: "Chukkath",
  },
  {
    quote: "Care taker Vishal has been very helpful. Though we reached the location at 1AM he was very obedient and down to earth to help us check in at night without any hassle. Breakfast was super yummy and homely. Would definitely recommend this place to all my contacts.",
    name: "Pushpalatha",
  },
  {
    quote: "I stayed there for 4 days the location is awesome. The room was very clean and comfortable the view outside from the room was excellent. The staff was very friendly and the owner Rajesh is extremely warm and welcoming. We had a great time to talk with their family. Food was very yummy homely food. Overall it was superb.",
    name: "Jaibharath",
  },
  {
    quote: "Staff courteousness and simple but elegant rooms.",
    name: "Robert",
  },
  {
    quote: "Fabulous day Smiling cooperative staff.",
    name: "Shubhada",
  },
  {
    quote: "The welcoming was really Good, though we reached late in evening … also the lady (care taker) was really polite and helpful. The homemade food made by her was also good. We really enjoyed the stay and the surrounding they had...",
    name: "Kangralkar",
  },
]
