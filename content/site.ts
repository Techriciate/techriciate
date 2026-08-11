export const site = {
  nav: ['Work', 'Services', 'Process', 'Studio', 'Stack', 'FAQ'],
  availability: true,
  region: 'Based in India (IST), working with clients worldwide',
  positioning: 'We build custom websites and web applications engineered to support growing businesses.',
  contact: { email: 'info@techriciate.com', tel: '+91 70396 38435', telHref: '+917039638435' },
  hero: {
    kicker: '(00) TECHRICIATE DIGITAL STUDIO',
    title: 'Custom web development built for your actual operations.',
    sub: 'We design and engineer websites, online stores, and internal tools from the ground up. Instead of wrestling with pre-packaged themes, you get a system structured around your exact business requirements.',
    micro: 'CUSTOM CODE · CLEAR TIMELINES · AI INTEGRATION',
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
    ['Custom Development', 'Every platform we build is engineered from the ground up specifically for your project. By avoiding bloated third-party page builders, we can typically cut page load times in half while eliminating the constant plugin updates that cause sites to break unpredictably.'],
    ['Goal-Oriented Approach', 'Before writing a single line of code, we map out the specific business metrics you are trying to move—whether that involves reducing customer support calls through better self-service or increasing the checkout conversion rate on your storefront.'],
    ['Practical AI Integration', 'We integrate language models and automation specifically for operational bottlenecks, such as routing incoming customer inquiries automatically or summarizing messy data exports into clean daily reports.'],
    ['Experienced Engineers', 'Having spent years navigating complex technical debt in fast-paced agencies, our engineers prioritize a maintainable architecture. For instance, we enforce strict type safety with TypeScript on every build so that adding features a year later doesn\'t require rewriting the entire foundation.'],
    ['Long-Term Support', 'A successful launch is just the baseline. We partner with clients over the long haul to monitor real-world usage patterns, adjust caching strategies for scaling traffic, and steadily build out new capabilities as your operational needs evolve.'],
  ],
  process: [
    ['01', 'Discovery', 'We start with an in-depth discussion about your target audience, existing operational pain points, and exactly what functionality the new build must deliver to be considered a success.'],
    ['02', 'Planning', 'Next, we develop a comprehensive technical specification that outlines the database schema, user flows, and the specific technology stack we will use.'],
    ['03', 'UI/UX Design', 'Our design process prioritizes functional clarity over flashy trends, ensuring that your customers can navigate the interface intuitively whether they are on a massive desktop monitor or a fragmented mobile connection.'],
    ['04', 'Development', 'This is where we write the actual code to bring the specification to life, maintaining a clean Git history so you have absolute visibility into our progress. Upon completion, you hold 100% ownership of the repository.'],
    ['05', 'Testing & QA', 'Before deployment, we rigorously verify the application across multiple browser engines and device sizes while actively hunting for edge cases in the user input forms.'],
    ['06', 'Launch', 'We configure an automated deployment pipeline to reliable cloud infrastructure like Vercel or AWS, ensuring that the transition to the live environment happens seamlessly.'],
    ['07', 'Maintenance & Growth', 'We remain available to run routine dependency updates, monitor server response times, and engineer new features as you identify fresh opportunities in your market.'],
  ],
  stack: {
    Frontend: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Bootstrap'],
    Backend: ['Node.js', 'Express.js', 'Python', 'PHP'],
    Database: ['MongoDB', 'MySQL', 'Firebase', 'Supabase', 'PostgreSQL'],
    'Tools & Platforms': ['Git', 'GitHub', 'Figma', 'Vercel', 'Netlify', 'Cloudflare', 'REST APIs', 'OpenAI APIs', 'Google APIs'],
  },
  faqs: [
    ['Do you use website templates?', 'We architect every interface and backend system specifically for your requirements, which allows us to optimize the exact user flows your business depends on.'],
    ['How do you integrate AI into projects?', 'We typically deploy automation to address specific data bottlenecks, such as utilizing language models to categorize incoming lead forms or parsing unstructured invoice PDFs into your database.'],
    ['What is the status of the featured projects?', 'Transparency matters to us, so we label every portfolio item accurately—whether it is a deployed live application, a proof-of-concept demo, or an active negotiation currently in the scoping phase.'],
    ['Who owns the source code?', 'Upon project completion, we transfer total ownership of the repository, all Figma design assets, and production environment credentials directly to you.'],
    ['How do you determine project pricing?', 'Following our initial consultation, we provide a comprehensive proposal that breaks down the required engineering hours and specific deliverables, establishing a firm price before any development begins.'],
    ['Do you work with international clients?', 'Our team operates out of India (IST), and we maintain asynchronous project management practices that allow us to collaborate efficiently with companies operating in entirely different time zones.'],
  ],
} as const



