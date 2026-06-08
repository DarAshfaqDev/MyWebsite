# Personal Digital Ecosystem Platform

A production-ready Personal Operating System that serves as the central digital hub for your entire online presence. Combines portfolio, linktree, knowledge base, career center, freelancing hub, publishing platform, and more — all from a single URL.

## Features

### Core Sections
- **Hero** — Professional profile with photo, title, tagline, and CTA buttons
- **About** — Personal story, journey, mission, and career objectives
- **Skills** — Categorized skills with badges (Data Analytics, AI, ML, Full Stack, etc.)
- **Websites** — Featured websites hub with cards for each platform
- **Social Hub** — Connect across all social platforms with visit/copy/share
- **Projects** — Project showcase with GitHub, demo, docs, and case study links
- **Resume/CV Center** — Download/preview resumes, CVs, portfolios, certifications
- **Digital World** — Links to Google Drive, Notion, Substack, ResearchGate, etc.
- **Book Library** — Books with read online, PDF, EPUB, share, and bookmark actions
- **Articles** — Blog platform with categories, tags, and reading time
- **Publications** — Research papers, journal articles, conference papers
- **Career Hub** — Job platforms by region (Global, India, Middle East, Europe)
- **Freelancing Hub** — Fiverr, Upwork, Toptal, Contra, and more
- **Services** — Service offerings with skills, pricing, and hire me CTA
- **Contact** — Contact form, email, phone, location, and Calendly scheduling

### Technical Features
- **Dark/Light Mode** — With system preference detection and manual toggle
- **Glassmorphism** — Premium glass effects throughout the UI
- **Smooth Animations** — Framer Motion powered entrance animations
- **Responsive** — Mobile-first, fully responsive design
- **SEO Optimized** — Meta tags, Open Graph, Twitter Cards, structured data
- **Performance** — Static generation, optimized assets, minimal JavaScript
- **Accessibility** — Semantic HTML, keyboard navigation, screen reader support, reduced motion
- **Security** — Security headers, XSS protection, environment variables
- **Configuration Driven** — All content editable via JSON files in `/data/`

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 15 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| Radix UI | Accessible primitives |

## Project Structure

```
├── data/                    # Configuration files (edit your content here)
│   ├── site-config.json     # Site metadata & social links
│   ├── profile.json         # Personal profile information
│   ├── about.json           # About section content
│   ├── skills.json          # Skills & expertise
│   ├── socials.json         # Social media links
│   ├── websites.json        # Featured websites
│   ├── projects.json        # Project showcase
│   ├── books.json           # Book library
│   ├── articles.json        # Blog articles
│   ├── publications.json    # Research publications
│   ├── career-platforms.json # Career platform links
│   ├── freelancing-platforms.json # Freelance platform links
│   ├── services.json        # Service offerings
│   ├── digital-resources.json # Digital world resources
│   └── navigation.json      # Navigation menu items
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout with metadata
│   │   ├── page.tsx         # Home page (assembles all sections)
│   │   ├── globals.css      # Global styles, theme variables
│   │   ├── robots.ts        # Robots.txt configuration
│   │   ├── sitemap.ts       # XML sitemap
│   │   └── manifest.ts      # PWA manifest
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── sections/        # All section components
│   │   └── ui/              # Reusable UI primitives
│   ├── lib/
│   │   ├── types.ts         # TypeScript interfaces
│   │   ├── utils.ts         # Utility functions
│   │   ├── data.ts          # Data loading utilities
│   │   └── seo.ts           # SEO helper functions
│   └── hooks/               # React hooks (future)
└── public/                  # Static assets
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

Visit `http://localhost:3000` in your browser.

## Customization

### Edit Content
All content is stored in JSON files in the `/data/` directory. Edit these files to customize the platform without touching source code.

```bash
# Edit your profile
code data/profile.json

# Edit your skills
code data/skills.json

# Add a new project
code data/projects.json
```

### Change Theme
Theme variables are in `src/app/globals.css`. Dark and light mode colors are defined as CSS custom properties.

### Add New Sections
1. Create a new component in `src/components/sections/`
2. Import and add it to `src/app/page.tsx`
3. Add its configuration to the data layer

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Custom Domain
1. Add your domain in Vercel dashboard
2. Update `NEXT_PUBLIC_SITE_URL` in environment variables
3. Configure DNS settings

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Production URL | `https://yourdomain.com` |

## Future Enhancements

### AI Features (Architecture Ready)
- AI Assistant chatbot
- AI Career Advisor
- AI Freelance Proposal Generator
- AI Knowledge Search
- AI Book Recommendations
- AI Learning Path Creator

### Planned Features
- Blog with MDX support
- Analytics dashboard
- Newsletter integration
- Comment system
- multi-language support
- PWA offline support
- CMS integration

## License

MIT

---

Built with Next.js, TypeScript, and Tailwind CSS.
