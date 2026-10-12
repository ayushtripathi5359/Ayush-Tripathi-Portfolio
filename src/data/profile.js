/* Single source of truth for profile content — used by the main sections,
   recruiter mode and the terminal. */

const EMAIL = 'ayushtripathi5359@gmail.com'

export const PROFILE = {
  name: 'Ayush Tripathi',
  title: 'Full Stack Developer',
  location: 'Bengaluru, India',
  email: EMAIL,
  mailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`,
  resume: '/Ayush-Tripathi-Resume.pdf',
  github: 'https://github.com/ayushtripathi5359',
  linkedin: 'https://www.linkedin.com/in/ayush-tripathi-74171b1b9/',
  summary:
    'Full stack developer building web and mobile apps with React, Next.js, React Native, TypeScript and Node.js. I implement new features, optimize performance, integrate payment systems, build REST APIs and ship AI-powered workflows.',
  education: {
    degree: 'B.Tech, Computer Science and Engineering',
    school: 'Shri Ram Murti Smarak College of Engineering and Technology',
    period: '2021 – 2025',
  },
}

export const METRICS = [
  { value: '40%', label: 'less manual outreach, via AI voice agents' },
  { value: '30%', label: 'faster screen loads in React and React Native' },
  { value: '25%', label: 'faster API response times' },
  { value: '20%', label: 'lower payment processing latency' },
  { value: '20+', label: 'production issues resolved' },
  { value: '15+', label: 'REST APIs integrated in MyStayInn' },
]

export const SKILL_GROUPS = [
  { label: 'Languages', items: 'JavaScript (ES6+), TypeScript, C++, SQL, HTML5, CSS3' },
  { label: 'Frontend & Mobile', items: 'React.js, Next.js, React Native, Expo, Redux Toolkit, Tailwind CSS, Framer Motion, SSR, Responsive Web Design' },
  { label: 'Backend & Data', items: 'Node.js, Express.js, FastAPI, REST APIs, WebSockets (Socket.io), JWT Authentication, MongoDB, Prisma ORM, Cashfree, PayU' },
  { label: 'Tools & DevOps', items: 'Git, GitHub, Docker, AWS (EC2), CI/CD pipelines, Postman, MongoDB Compass' },
  { label: 'Core CS', items: 'Data Structures and Algorithms (200+ LeetCode problems), Operating Systems, DBMS' },
]

export const JOBS = [
  {
    role: 'Full Stack Developer',
    company: 'MECNTEC',
    period: 'Aug 2026 – Present',
    points: [
      'Enhanced real estate CRM modules with React.js, Node.js, Express.js and MongoDB — property tracking, lead management and client workflows.',
      'Integrated AI voice agents for lead qualification, appointment booking and follow-ups, cutting manual outreach by ~40%.',
      'Resolved 20+ production issues across frontend, backend and database layers; improved API response times by 25%.',
    ],
  },
  {
    role: 'Associate Software Engineer',
    company: 'Medro Hi-Tech Symbol',
    period: 'Nov 2025 – Jul 2026',
    links: [
      { label: 'MyStayInn Customer', href: 'https://play.google.com/store/apps/details?id=in.co.mystayinn.customer' },
      { label: 'MyStayInn Business', href: 'https://play.google.com/store/apps/details?id=in.co.mystayinn.business' },
      { label: 'ClusterX', href: 'https://clusterx.ai/' },
    ],
    points: [
      'Joined as a trainee, converted to full-time in Apr 2026. Built and deployed the MyStayInn React Native apps with 15+ REST APIs.',
      'Implemented Cashfree payment workflows and webhooks, reducing payment processing latency by 20%.',
      'Cut screen load times by 30% across React.js and React Native via lazy loading, code splitting and memoization.',
      'Built mobile-first Android and iOS components and managed global state with Redux-Saga.',
    ],
  },
  {
    role: 'Associate Software Developer Intern',
    company: 'Prestigious Gaming',
    period: 'Apr 2025 – Jun 2025',
    links: [{ label: 'Live site', href: 'https://www.prestigiousgaming.in/' }],
    points: [
      'Developed the production website with React.js and Tailwind CSS — landing, features, mission and culture sections.',
      'Shipped responsive UI components, optimized across desktop and mobile.',
    ],
  },
]

export const PROJECTS = [
  { num: '01', name: 'SIX',                tags: 'Next.js · Redux-Saga',        accent: '#FF6B6B', desc: 'Vehicle & property marketplace for buyers, sellers and dealers', mockup: 'prism',   href: 'https://www.six.ind.in/' },
  { num: '02', name: 'MYSTAYINN',          tags: 'React Native · Cashfree',     accent: '#4ECDC4', desc: 'Customer app · 15+ APIs, Cashfree payments, 30% faster screens', mockup: 'flux',    href: 'https://play.google.com/store/apps/details?id=in.co.mystayinn.customer' },
  { num: '03', name: 'MYSTAYINN BUSINESS', tags: 'React Native · Redux-Saga',   accent: '#4ECDC4', desc: 'Property-management app for hosts and business owners', mockup: 'flux',    href: 'https://play.google.com/store/apps/details?id=in.co.mystayinn.business' },
  { num: '04', name: 'CLUSTERX',           tags: 'AI Agents · Automation',      accent: '#FF6B6B', desc: 'AI agents that automate sales, hiring and operations for businesses', mockup: 'flux',    href: 'https://clusterx.ai/' },
  { num: '05', name: 'PRESTIGIOUS GAMING', tags: 'React · Tailwind CSS',        accent: '#FFD166', desc: 'Production company website · responsive across devices', mockup: 'orbital', href: 'https://www.prestigiousgaming.in/' },
  { num: '06', name: 'KARIGAR',            tags: 'Expo · FastAPI · RAG · PayU', accent: '#C77DFF', desc: 'In progress · diamond & jewellery commerce with an AI concierge', mockup: 'gem' },
]

/* Tiny event bus — matches the window-event idiom used elsewhere */
export const emit = (name, detail) => window.dispatchEvent(new CustomEvent(name, { detail }))
