import { name, email, skills, social, techIcons } from './constants'

export const portfolioData = {
  name,
  title: "Senior Full Stack Developer",
  tagline: "I build software that makes complex work feel simple.",
  about: `I'm a product engineer from Tunis who has spent the last five years building software for people whose work is genuinely complicated — doctors, restaurant teams, event organizers, enterprise operators. My job is to take complex, multi-step workflows and turn them into interfaces that feel obvious. I work across the whole product surface: architecture, component systems, state, and the small details that make software pleasant to use.`,
  location: "Tunis, Tunisia",
  products: [
    {
      id: "doctor-me",
      name: "doctor.me",
      category: "Medical practice management platform",
      description: "A multi-module healthcare platform that gives practitioners and staff one daily workspace — appointments, consultations, prescriptions, certificates, teleconsultation and finance. The kind of product where every screen hides a complex clinical workflow behind a calm interface.",
      capabilities: [
        "Patient management",
        "Appointments & calendar workflows",
        "Consultations",
        "Prescriptions",
        "Certificates & letters",
        "Teleconsultation",
        "Financial workflows",
        "Role-based access",
        "AI-assisted functionality",
        "Multi-module architecture"
      ],
      accent: "#2dd4bf",
      links: {}
    },
    {
      id: "mepos",
      name: "mePOS",
      category: "Restaurant operations platform",
      description: "An operations platform for restaurants that connects the point of sale, stock, kitchen, CRM and analytics — so a full-service restaurant can run its day from one system instead of five disconnected ones.",
      capabilities: [
        "POS / Caisse",
        "Stock management",
        "CRM",
        "Kitchen workflows",
        "Analytics",
        "Operational workflows"
      ],
      accent: "#f59e0b",
      links: {}
    }
  ],
  projects: [
    {
      id: 1,
      title: "Reachbl Platform",
      description: "A meetings and webinars platform with real-time video calling and messaging. Built the responsive UI and chat systems that keep large live sessions fast and easy to follow.",
      tech: ["Vue 3", "JavaScript", "SCSS", "100ms"],
      image: "reachabl",
      liveUrl: "https://reachabl.com/",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "7Digi Content Lab Portfolio",
      description: "A responsive portfolio site for a digital content studio, with smooth animations and a strong visual presentation.",
      tech: ["Vue", "JavaScript", "SCSS"],
      image: "7digi",
      liveUrl: "https://7-d.vercel.app/",
      githubUrl: "#",
      featured: false
    },
    {
      id: 3,
      title: "Component Library & Design System",
      description: "A reusable UI system — buttons, forms, cards, tables and layout primitives — built so several products stay consistent without slowing teams down.",
      tech: ["Vue 3", "Storybook", "Design Systems"],
      image: "design-system",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 4,
      title: "Vue 3 SaaS Dashboard",
      description: "A data-heavy SaaS dashboard built from reusable components — charts, tables and responsive layouts that stay legible at any screen size.",
      tech: ["Vue 3", "Chart.js", "SCSS"],
      image: "dashboard",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 5,
      title: "Kanban Task Management Board",
      description: "A drag-and-drop Kanban board focused on smooth interaction and clear visual state — the kind of interface where organization is the whole point.",
      tech: ["Angular", "TypeScript"],
      image: "kanban",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ],
  experience: [
    {
      id: 1,
      company: "iObeya",
      logo: "iO",
      logoImage: "iobeya.jpg",
      role: "Full Stack Developer",
      duration: "September 2022 — Present",
      location: "Tunis, Tunisia",
      description: "Full-stack developer on iObeya's enterprise visual collaboration platform. Helped evolve the frontend to a Single-SPA micro-frontend architecture, designed complex interactive views (Mural, Mosaic, GridStack) in Vue.js, migrated state management from Vuex to Pinia, and built Spring Boot REST APIs — backed by Playwright E2E, K6 performance and unit testing.",
      highlights: ["Micro-frontend (Single-SPA)", "Vue.js", "Vuex → Pinia", "Spring Boot", "Playwright & K6", "AI-assisted development"]
    },
    {
      id: 2,
      company: "Welyne",
      logo: "We",
      logoImage: "welyne.jpg",
      role: "Full Stack Developer",
      duration: "March 2022 — September 2022",
      location: "Tunis, Tunisia",
      description: "Full-stack work across ERP, mobile and business management products — built IMSG-ERP, a university ERP platform with Angular and Laravel, contributed to the Shopvel mobile app with Node.js and Docker, and optimized the BlancLiving App.",
      highlights: ["Angular", "Laravel", "Node.js", "Docker"]
    },
    {
      id: 3,
      company: "ASM — All Soft Multimedia",
      logo: "ASM",
      logoImage: "asm.jpg",
      role: "Full Stack Developer",
      duration: "July 2021 — March 2022",
      location: "Sfax, Tunisia",
      description: "Built and maintained DUX-ERP, an enterprise resource planning solution in Angular and Laravel — including a drag-and-drop Kanban module, Chart.js reporting dashboards and an employee time-tracking module with dedicated business workflows.",
      highlights: ["Angular", "Laravel", "Chart.js", "Kanban", "ERP"]
    }
  ],
  contact: {
    email,
    phone: "+216 20 319 189",
    location: "Tunis, Tunisia",
    availability: "Open to opportunities",
    social
  },
  navItems: [
    { id: "home", label: "Home", icon: "home" },
    { id: "work", label: "Work", icon: "folder" },
    { id: "expertise", label: "Expertise", icon: "code" },
    { id: "experience", label: "Experience", icon: "briefcase" },
    { id: "contact", label: "Contact", icon: "mail" }
  ]
}

export { techIcons, skills }
