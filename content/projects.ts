export type Project = {
  id: string
  slug: string
  index: string
  title: string
  description: string
  industry: string
  status: string
  scope: string
  liveUrl?: string
  images: string[]
  thumbnail: string
  heroImage: string

  // Case study fields
  problem: string
  research: string
  solution: string
  design: string
  development: string
  stack: string[]
  timeline: string
  challenges: string
  impact: string
  performance?: string
  future: string
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'bloom-blossom',
    index: '01',
    title: 'Bloom Blossom',
    description: 'An online flower and gifting store built for a local florist looking to sell directly.',
    industry: 'Gifting & Flowers',
    status: 'Under negotiation (Demo completed)',
    scope: 'Demonstration',
    liveUrl: 'https://bloomblossom.vercel.app/',
    images: [
      '/bloom-ss/Hero-1.png',
      '/bloom-ss/2.png',
      '/bloom-ss/3.png',
      '/bloom-ss/4.png',
    ],
    thumbnail: '/bloom-ss/Hero-1.png',
    heroImage: '/bloom-ss/Hero-1.png',
    problem: 'The client was selling through third-party marketplaces that took a big cut per order and gave them almost no control over branding or customer experience.',
    research: 'We looked at how people actually shop for flowers online, especially on mobile. Most buyers want to browse by occasion, pick a budget, and check out fast.',
    solution: 'We built a standalone storefront where customers can browse by occasion, customize gift hampers, and complete their order without leaving the site.',
    design: 'Soft, neutral color palette with plenty of whitespace to let product photos do the talking. Typography is clean and sized for thumb-scrolling on phones.',
    development: 'Modular component setup so the client can easily add new product variations, seasonal bundles, and hamper combinations without touching core code.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'],
    timeline: 'Scope and timeline available on request.',
    challenges: 'Making multi-item gift bundles feel simple to build while keeping image-heavy pages fast on spotty mobile connections.',
    impact: 'Gives the business a direct sales channel. No more marketplace commissions, and they own the customer relationship from day one.',
    performance: 'Lighthouse score of 95+ with optimized core web vitals for mobile networks.',
    future: 'Payment gateway hookup, live inventory sync, WhatsApp order notifications, and seasonal promo layouts.',
  },
  {
    id: '2',
    slug: 'perfect-buy-factory-outlet',
    index: '02',
    title: 'Perfect Buy Factory Outlet',
    description: 'A digital product catalog for a discount retail store that wanted to bring their inventory online.',
    industry: 'E-commerce',
    status: 'Under negotiation',
    scope: 'Digital product',
    liveUrl: 'https://perfect-buy-website.vercel.app/',
    images: [
      '/perfect-ss/Hero-1.png',
      '/perfect-ss/2.png',
      '/perfect-ss/3.png',
      '/perfect-ss/4.png',
    ],
    thumbnail: '/perfect-ss/Hero-1.png',
    heroImage: '/perfect-ss/Hero-1.png',
    problem: 'The store had a single physical location and no web presence. Customers had no way to browse their stock before visiting.',
    research: 'We studied how discount shoppers browse online. They want quick filters, visible price drops, and the ability to compare items fast on their phones.',
    solution: 'A working demo of an online catalog with clear category navigation, discount tags on every item, and a structure that scales to thousands of products.',
    design: 'High-contrast text and bold discount badges so prices pop immediately. Product cards are designed to scan quickly, not admire slowly.',
    development: 'Backend API structure ready for product management at scale. Category filters, search, and payment endpoints are structured to plug in when the client is ready.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL'],
    timeline: 'Scope and timeline available on request.',
    challenges: 'Keeping page loads fast even with a large product catalog and lots of images. Every millisecond matters on mobile data.',
    impact: 'Opens up a new sales channel. Customers can check stock from home before visiting, and the store reaches people beyond their neighborhood.',
    performance: 'Lighthouse score of 95+ with low response latency.',
    future: 'Online checkout, POS inventory sync, click-and-collect option, and automated sale promotions.',
  },
  {
    id: '3',
    slug: 'alkesh-dinesh-mody-institute',
    index: '03',
    title: 'Alkesh Dinesh Mody Institute',
    description: 'A web portal proposal for a Mumbai-based educational institute looking to modernize their online presence.',
    industry: 'Education',
    status: 'In discussion',
    scope: 'Proposal',
    images: [],
    thumbnail: '',
    heroImage: '',
    problem: 'The institute needed a proper website where prospective students and parents could find course info, admission steps, and contact details without confusion.',
    research: 'We mapped out the most common things students and parents search for: course details, fee structures, admission deadlines, and faculty contacts.',
    solution: 'A proposed portal design with well-organized course listings, step-by-step admission guides, and quick contact options for inquiries.',
    design: 'Professional and accessible layout. Content-first approach where academics and admissions info are never more than two clicks away.',
    development: 'Component-based architecture with a simple CMS so staff can update announcements and notices on their own, no developer needed.',
    stack: ['Next.js', 'Tailwind CSS', 'Headless CMS', 'Vercel'],
    timeline: 'Discovery phase in progress.',
    challenges: 'The institute has a lot of programs and documentation. The main challenge is organizing all of it without overwhelming visitors.',
    impact: 'Students find what they need faster. Fewer repetitive phone calls to the admissions office. Better first impression for the institute online.',
    future: 'Online admissions portal, campus notice board, faculty directory, and multi-language support.',
  },
  {
    id: '4',
    slug: 'thread-culture',
    index: '04',
    title: 'Thread Culture',
    description: 'A lookbook-style website for an indie fashion label launching its first collections online.',
    industry: 'Fashion',
    status: 'Demo prototype',
    scope: 'Demonstration',
    liveUrl: 'https://thread-culture-studio.lovable.app/',
    images: [
      '/thread-ss/Hero-1.png',
      '/thread-ss/2.png',
      '/thread-ss/3.png',
      '/thread-ss/4.png',
    ],
    thumbnail: '/thread-ss/Hero-1.png',
    heroImage: '/thread-ss/Hero-1.png',
    problem: 'A small fashion brand wanted a space to showcase their collections with the right visual tone, not just list products on a generic marketplace.',
    research: 'We looked at how indie fashion brands use visuals to drive engagement. Full-bleed lookbook imagery, minimal UI, and strong typography work best.',
    solution: 'A prototype site built around full-width collection galleries, editorial-style layouts, and a minimal navigation structure that keeps the focus on the clothes.',
    design: 'Dark backgrounds with high contrast to make product photography feel editorial. Typography is kept minimal so the garments take center stage.',
    development: 'Lightweight frontend focused on image delivery speed. Responsive layout that holds up on any screen size without losing the editorial feel.',
    stack: ['React', 'Tailwind CSS', 'Vercel'],
    timeline: 'Initial prototype completed.',
    challenges: 'High-res lookbook images are heavy. The main challenge was making them load fast without killing the visual quality.',
    impact: 'The brand gets a presentation-ready platform that can scale into a full store with drop countdowns and sizing tools when they are ready.',
    future: 'Full checkout flow, collection drop timers, interactive size guides, and a lookbook management panel.',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
