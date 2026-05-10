import { name, email, skills, social, techIcons } from './constants'

export const portfolioDataFr = {
  name,
  title: "Ingénieur Frontend Senior",
  tagline: "Je crée des interfaces avec Vue, Angular...",
  about: "Je suis un ingénieur frontend passionné avec plus de 5 ans d'expérience dans le développement d'applications web performantes. expérimenté en Vue et Angular, avec une expertise approfondie en design systems et visualisation de données.",
  skills,
  projects: [
  {
    id: 1,
    title: "Plateforme Reachbl",
    description: "Conception et développement d’une plateforme moderne de réunions et webinaires avec un focus sur les expériences d’appels vidéo et les interfaces de messagerie en temps réel. Travail sur des composants UI responsives, des systèmes de chat et une architecture frontend scalable afin d’offrir une expérience fluide et intuitive.",
    tech: ["Vue 3", "JavaScript", "SCSS", "100ms"],
    image: "reachabl",
    liveUrl: "https://reachabl.com/",
    githubUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "Bibliothèque de Composants & Design System",
    description: "Création d’un système de composants UI réutilisables avec des patterns de design cohérents, une structure scalable et un focus sur la maintenabilité. Inclut des boutons, formulaires, cartes, tableaux et composants de mise en page.",
    tech: ["Vue 3", "Storybook", "Design Systems"],
    image: "design-system",
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 3,
    title: "Dashboard SaaS Vue 3",
    description: "Conception et développement d’un dashboard moderne de type SaaS avec des composants réutilisables, une interface responsive et une structure UI propre. Focus sur une architecture frontend scalable et une visualisation de données intuitive.",
    tech: ["Vue 3", "JavaScript", "Chart.js", "SCSS"],
    image: "dashboard",
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 4,
    title: "Site Portfolio 7Digi Content Lab",
    description: "Conception et développement d’un site portfolio responsive moderne pour 7Digi Content Lab, une marque spécialisée en stratégie digitale et création de contenu. Focus sur une UI/UX moderne, des animations fluides, des layouts responsives et une présentation visuelle professionnelle.",
    tech: ["Vue", "JavaScript", "SCSS", "Responsive Design"],
    image: "7digi",
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: 5,
    title: "Tableau de Gestion de Tâches Kanban",
    description: "Développement d’une application de gestion de tâches de type Kanban avec fonctionnalité drag-and-drop et organisation dynamique des tâches. Focus sur une expérience utilisateur fluide, des composants réutilisables et une interface moderne orientée productivité.",
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
    role: "Développeur Frontend",
    duration: "Septembre 2022 - Présent",
    location: "Tunis, Tunisie",
    description:
      "Développement et maintenance de fonctionnalités frontend complexes en utilisant des frameworks JavaScript modernes, en respectant le design system d’iObeya.",
    highlights: ["Micro-frontend", "Vue", "Design System", "Spring Boot"]
  },
  {
    id: 2,
    company: "Welyne",
    logo: "We",
    role: "Développeur Full Stack",
    duration: "Mars 2022 - Septembre 2022",
    location: "Tunis, Tunisie",
    description:
      "Développement, optimisation et maintenance de plusieurs applications : BlancLiving App, Shopvel et IMSG-ERP.",
    highlights: ["Angular", "Laravel", "Node.js", "Flutter"]
  },
  {
    id: 3,
    company: "ASM - ALL SOFT MULTIMEDIA",
    logo: "ASM",
    role: "Développeur Full Stack",
    duration: "Juin 2021 - Mars 2022",
    location: "Sfax, Tunisie",
    description:
      "Développement, optimisation et maintenance d’une solution ERP : DUX-ERP en utilisant les frameworks Angular et Laravel.",
    highlights: ["Angular", "Laravel", "Spring Boot"]
  }
],
  contact: {
    email,
    location: "Tunis, Tunisie",
    availability: "Ouvert aux opportunités",
    social
  }
}

export { techIcons }