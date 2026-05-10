import { name, email, skills, social, techIcons } from './constants'

export const portfolioData = {
  name,
  title: "Senior Frontend Engineer",
  tagline: "Building scalable applications with Vue, Angular...",
  about: `I'm a passionate frontend engineer with 5+ years of experience building high-performance web applications.Experienced in Vue.js and Angular, with deep expertise in design systems and data visualization.
Currently leading frontend architecture at a Series B startup, I've shipped products used by millions and contributed to open-source projects including VueUse and Angular Material.
My focus is on creating elegant, accessible, and performant user experiences while mentoring teams on modern frontend best practices.`,
  skills,
projects: [
  {
    id: 1,
    title: "Reachbl Platform",
    description: "Designed and developed a modern meetings and webinars platform with a focus on video calling experiences, and real-time messaging interfaces. Worked on responsive UI components, chat systems, and scalable frontend architecture to deliver a smooth and user-friendly collaboration experience.",
    tech: ["Vue 3", "JavaScript", "SCSS", "100ms"],
    image: "reachabl",
    liveUrl: "https://reachabl.com/",
    githubUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "Component Library & Design System",
    description: "Built a reusable UI component system with consistent design patterns, scalable structure, and focus on maintainability. Includes buttons, forms, cards, tables, and layout primitives.",
    tech: ["Vue 3", "Storybook", "Design Systems"],
    image: "design-system",
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 3,
    title: "Vue 3 SaaS Dashboard",
    description: "Designed and developed a modern SaaS-style dashboard with reusable components, responsive layout, and clean UI structure. Focused on scalable frontend architecture and user-friendly data visualization.",
    tech: ["Vue 3", "Javascript", "Chart.js", "scss"],
    image: "dashboard",
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
{
  id: 4,
  title: "7Digi Content Lab Portfolio Website",
  description: "Designed and developed a modern responsive portfolio website for 7Digi Content Lab, a digital content and creative strategy brand. Focused on modern UI/UX, smooth animations, responsive layouts, and strong visual presentation to showcase services including digital strategy, design, video production, and social media content.",
  tech: ["Vue", "JavaScript", "SCSS", "Responsive Design"],
  image: "7digi",
  liveUrl: "#",
  githubUrl: "#",
  featured: false
},
{
  id: 5,
  title: "Kanban Task Management Board",
  description: "Built an interactive Kanban-style task management application with drag-and-drop functionality and dynamic task organization. Focused on smooth user interaction, reusable components, and modern productivity-focused UI design.",
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
      role: "Frontend developper",
      duration: "September 2022 - Present",
      location: "Tunis, Tunisia",
      description: "Developed and maintained complex front-end features using modern JavaScript frameworks aligned with iObeya’s design system.",
      highlights: ["Micro-frontend", "Vue", "Design System", "Springboot"]
    },
    {
      id: 2,
      company: "Welyne",
      logo: "We",
      role: "Full stack developer",
      duration: "March 2022 - September 2022",
      location: "Tunis, Tunisia",
      description: "Developed optimization and maintenance tasks for various apps : BlancLiving App, Shopvel, IMSG-ERP",
      highlights: ["Angular", "Laravel", "Nodejs", "Flutter"]
    },
    {
      id: 3,
      company: "ASM - ALL SOFT MULTIMEDIA",
      logo: "ASM",
      role: "Full stack developer",
      duration: "June 2021 – March 2022",
      location: "Sfax, Tunisia",
      description: "Developed, optimized, and maintained an ERP solution: DUX-ERP using Angular and Laravel frameworks.",
      highlights: ["Angular", "Laravel", "Springboot"]
    }
  ],
  contact: {
    email,
    location: "Tunis, Tunisia",
    availability: "Open to opportunities",
    social
  },
  navItems: [
    { id: "about", label: "About", icon: "user" },
    { id: "skills", label: "Skills", icon: "code" },
    { id: "projects", label: "Projects", icon: "folder" },
    { id: "experience", label: "Experience", icon: "briefcase" },
    { id: "contact", label: "Contact", icon: "mail" }
  ]
}

export { techIcons }