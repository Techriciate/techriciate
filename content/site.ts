export const site = {
  nav: ['Work', 'Services', 'Process', 'Studio', 'Stack', 'FAQ'],
  availability: true,
  region: 'India (IST), working with clients worldwide',
  positioning: 'We build modern, custom websites and web applications to help businesses grow.',
  contact: { email: 'info@techriciate.com', tel: '+91 70396 38435', telHref: '+917039638435' },
  hero: {
    kicker: '(00) TECHRICIATE DIGITAL STUDIO',
    title: 'Your business, built for the web.',
    sub: 'We design and develop custom websites, e-commerce stores, and practical AI tools tailored to your business goals.',
    micro: 'CUSTOM DEVELOPMENT · CLEAR TIMELINES · PRACTICAL AI INTEGRATION',
  },

  services: [
    { title: 'Web Development', items: ['Business Websites', 'Corporate Portals', 'Custom Web Applications'] },
    { title: 'E-Commerce', items: ['Online Stores', 'Product Catalogs', 'Payment Gateway Setup', 'Inventory Systems'] },
    { title: 'Landing Pages', items: ['Campaign Landing Pages', 'Lead Generation Pages', 'Product Launch Pages'] },
    { title: 'Professional Portfolios', items: ['Photographers', 'Designers', 'Architects', 'Freelancers & Creators'] },
    { title: 'AI & Automation', items: ['AI Assistant Integration', 'WhatsApp Business Automation', 'Workflow Automation', 'CRM Integration'] },
    { title: 'Business Solutions', items: ['Admin Dashboards', 'Custom Client Portals', 'Analytics Dashboards', 'API Integrations', 'SEO & Website Maintenance'] },
  ],
  why: [
    ['Custom Development', 'Every project is custom-coded to your exact requirements, ensuring optimal speed, security, and flexibility without template constraints.'],
    ['Goal-Oriented Approach', 'We focus on clear business objectives first, building tailored web tools that streamline operations and drive real growth.'],
    ['Practical AI Integration', 'We implement AI solutions where they add real efficiency and user value, avoiding unnecessary features or complexity.'],
    ['Experienced Engineers', 'Our team brings hands-on development experience from agency backgrounds, prioritizing clean architecture and reliable delivery.'],
    ['Long-Term Support', 'We partner with you beyond launch, providing continuous performance optimization, updates, and feature expansions as you grow.'],
  ],
  process: [
    ['01', 'Discovery', 'An open conversation to understand your business goals, audience, and technical requirements.'],
    ['02', 'Planning', 'We map out your project scope, site structure, and technology stack for an efficient build.'],
    ['03', 'UI/UX Design', 'We create clear wireframes and visual designs focused on a seamless user experience.'],
    ['04', 'Development', 'We build your application using clean, modern web technologies with full code ownership handed to you.'],
    ['05', 'Testing & Optimization', 'Comprehensive cross-device testing, performance tuning, and security checks before going live.'],
    ['06', 'Launch', 'A smooth deployment to high-performance cloud hosting with zero downtime.'],
    ['07', 'Maintenance & Growth', 'Ongoing technical support, performance monitoring, and iterative feature updates.'],
  ],
  stack: {
    Frontend: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Bootstrap'],
    Backend: ['Node.js', 'Express.js', 'Python', 'PHP'],
    Database: ['MongoDB', 'MySQL', 'Firebase', 'Supabase', 'PostgreSQL'],
    'Tools & Platforms': ['Git', 'GitHub', 'Figma', 'Vercel', 'Netlify', 'Cloudflare', 'REST APIs', 'OpenAI APIs', 'Google APIs'],
  },
  faqs: [
    ['Do you use website templates?', 'No. Every project is built from scratch around your specific content, brand guidelines, and business goals.'],
    ['How do you integrate AI into projects?', 'We use AI to automate routine workflows, power smart search, or assist with customer inquiries when it adds genuine value to your operations.'],
    ['What is the status of the featured projects?', 'We clearly mark whether each project is a live build, an active demonstration, or currently in scoping discussions with clients.'],
    ['Who owns the source code?', 'You own 100% of the source code, design assets, and account credentials upon project completion.'],
    ['How do you determine project pricing?', 'Every project receives a clear, itemized quote based on its unique scope and technical requirements following our discovery call.'],
    ['Do you work with international clients?', 'Yes. Based in India (IST), we collaborate seamlessly with clients across different time zones using structured communication.'],
  ],
} as const



