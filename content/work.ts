export type WorkStudy = {
  slug: string
  index: string
  name: string
  industry: string
  status: string
  tagline: string
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

export const workStudies: WorkStudy[] = [
  {
    slug: 'bloom-blossom',
    index: '01',
    name: 'Bloom Blossom',
    industry: 'Gifting & Flowers',
    status: 'Under negotiation (Demo completed)',
    tagline: 'A clean, photo-led storefront designed for floral arrangements.',
    problem: 'Bloom Blossom relied on third-party marketplace platforms with high per-order fees and limited branding customization.',
    research: 'We analyzed customer browsing patterns in the flower and gifting sector, focusing on mobile order flows and category navigation.',
    solution: 'A custom e-commerce storefront featuring occasion-based product browsing, hamper customizers, and an intuitive checkout flow.',
    design: 'A clean UI design using soft neutral tones, high-resolution imagery layout, and typography tailored for mobile shoppers.',
    development: 'Built on a modular frontend architecture to support dynamic product variations, hamper add-ons, and inventory tracking.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'],
    timeline: 'Project scope and timeline available upon request.',
    challenges: 'Structuring multi-item gifting bundles simply while keeping image-heavy pages fast on mobile devices.',
    impact: 'Establishes a direct sales channel, eliminating third-party commission fees and building direct customer relationships.',
    performance: 'Lighthouse score of 95+ with optimized core web vitals for mobile networks.',
    future: 'Payment gateway integration, automated inventory sync, WhatsApp order updates, and seasonal marketing layouts.',
  },
  {
    slug: 'perfect-buy-factory-outlet',
    index: '02',
    name: 'Perfect Buy Factory Outlet',
    industry: 'E-commerce',
    status: 'Under negotiation',
    tagline: 'A high-capacity digital catalog designed for wholesale and discount retail.',
    problem: 'A factory outlet offering discounted retail goods with sales restricted to a single physical storefront.',
    research: 'We reviewed discount retail shopping behaviors to design fast category filters and clear discount callouts for mobile users.',
    solution: 'A demonstration online catalog featuring clear category hierarchies, discount labels, and scalable product listings.',
    design: 'Functional UI focused on high contrast text, structured product cards, and fast navigation for discount shoppers.',
    development: 'Scalable backend API structure with product category management and ready-to-integrate payment endpoints.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL'],
    timeline: 'Project scope and timeline available upon request.',
    challenges: 'Balancing a large product catalog with high page loading speeds across mobile connections.',
    impact: 'Expands market reach beyond the physical store, allowing customers to explore available stock online.',
    performance: 'Lighthouse score of 95+ with low response latency.',
    future: 'Online payment gateway, POS inventory synchronization, click and collect fulfillment, and automated promotions.',
  },
  {
    slug: 'alkesh-dinesh-mody-institute',
    index: '03',
    name: 'Alkesh Dinesh Mody Institute',
    industry: 'Education',
    status: 'In discussion',
    tagline: 'An accessible academic web portal for prospective students and faculty.',
    problem: 'The institute needed an updated web portal to organize institutional information and serve prospective students effectively.',
    research: 'We identified primary user journeys for students and parents, emphasizing course details, admission steps, and contact info.',
    solution: 'A modern web portal layout offering organized academic course structures, admission guidelines, and direct inquiry options.',
    design: 'An accessible, professional visual identity focused on content clarity and easy navigation.',
    development: 'Accessible component architecture paired with a user-friendly CMS so staff can update announcements independently.',
    stack: ['Next.js', 'Tailwind CSS', 'Headless CMS', 'Vercel'],
    timeline: 'Discovery phase in progress.',
    challenges: 'Organizing extensive institutional documentation while maintaining an easy-to-use admin interface.',
    impact: 'Improves student access to admission details and reduces manual support inquiries for administrative staff.',
    future: 'Student admissions portal, campus notices board, faculty directory, and multi-language support.',
  },
  {
    slug: 'thread-culture',
    index: '04',
    name: 'Thread Culture',
    industry: 'Fashion',
    status: 'Demo prototype',
    tagline: 'An editorial collection showcase built for apparel brand releases.',
    problem: 'An independent fashion label needed a dedicated digital showcase for collection releases and lookbooks.',
    research: 'We evaluated mobile engagement for apparel brands, focusing on lookbook layouts, product galleries, and drop previews.',
    solution: 'A prototype catalog featuring full-width visual layouts, collection spotlights, and minimal navigation UI.',
    design: 'Minimalist typography and dark background contrasts that emphasize product photography and garment details.',
    development: 'Lightweight frontend prototype engineered for fast image delivery and responsive mobile navigation.',
    stack: ['React', 'Tailwind CSS', 'Vercel'],
    timeline: 'Initial prototype completed.',
    challenges: 'Optimizing high-resolution lookbook images for quick loading across mobile devices.',
    impact: 'Provides a flexible presentation platform ready to scale into a full e-commerce store with release countdowns.',
    future: 'Full checkout integration, collection drop countdown timers, interactive size guides, and lookbook management.',
  },
]

export function getWorkStudy(slug: string) {
  return workStudies.find((study) => study.slug === slug)
}

