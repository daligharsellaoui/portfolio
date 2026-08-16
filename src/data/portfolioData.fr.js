import { name, email, skills, social, techIcons } from './constants'

export const portfolioDataFr = {
  name,
  title: "Ingénieur Frontend Senior",
  tagline: "Je conçois des logiciels qui rendent simple le travail complexe.",
  about: `Je suis un ingénieur produit de Tunis qui a passé les cinq dernières années à concevoir des logiciels pour des personnes dont le travail est réellement complexe — médecins, équipes de restauration, organisateurs d'événements, opérateurs d'entreprise. Mon métier : transformer des flux de travail complexes en interfaces qui semblent évidentes. Je travaille sur toute la surface produit : architecture, systèmes de composants, gestion d'état, et les petits détails qui rendent un logiciel agréable à utiliser.`,
  location: "Tunis, Tunisie",
  products: [
    {
      id: "doctor-me",
      name: "doctor.me",
      category: "Plateforme de gestion de cabinet médical",
      description: "Une plateforme de santé multi-modules qui offre aux praticiens et à leur équipe un espace de travail quotidien unique — rendez-vous, consultations, ordonnances, certificats, téléconsultation et finance. Le genre de produit où chaque écran cache un flux clinique complexe derrière une interface apaisée.",
      contribution: "Conception et développement de l'expérience frontend de l'ensemble des modules de la plateforme, transformant des flux cliniques denses en un espace de travail quotidien ciblé, que praticiens et équipes peuvent utiliser rapidement.",
      capabilities: [
        "Gestion des patients",
        "Rendez-vous & workflows calendrier",
        "Consultations",
        "Ordonnances",
        "Certificats & courriers",
        "Téléconsultation",
        "Workflows financiers",
        "Accès par rôles",
        "Fonctionnalités assistées par IA",
        "Architecture multi-modules"
      ],
      accent: "#2dd4bf",
      links: {}
    },
    {
      id: "mepos",
      name: "mePOS",
      category: "Plateforme d'exploitation de restaurant",
      description: "Une plateforme d'exploitation pour les restaurants qui connecte le point de vente, le stock, la cuisine, le CRM et l'analyse — pour qu'un restaurant puisse gérer sa journée depuis un seul système au lieu de cinq outils déconnectés.",
      contribution: "Développement du frontend des flux opérationnels principaux — caisse, stock, cuisine et CRM — unifiés dans une interface cohérente que le personnel peut utiliser rapidement, même aux heures de pointe.",
      capabilities: [
        "Caisse (POS)",
        "Gestion de stock",
        "CRM",
        "Workflows cuisine",
        "Analytique",
        "Workflows opérationnels"
      ],
      accent: "#f59e0b",
      links: {}
    }
  ],
  projects: [
    {
      id: 1,
      title: "Plateforme Reachbl",
      description: "Une plateforme de réunions et webinaires avec appels vidéo et messagerie en temps réel. Développement de l'UI responsive et des systèmes de chat qui gardent les grandes sessions en direct rapides et faciles à suivre.",
      tech: ["Vue 3", "JavaScript", "SCSS", "100ms"],
      image: "reachabl",
      liveUrl: "https://reachabl.com/",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "Bibliothèque de Composants & Design System",
      description: "Un système UI réutilisable — boutons, formulaires, cartes, tableaux et primitives de mise en page — conçu pour que plusieurs produits restent cohérents sans ralentir les équipes.",
      tech: ["Vue 3", "Storybook", "Design Systems"],
      image: "design-system",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 3,
      title: "Dashboard SaaS Vue 3",
      description: "Un dashboard SaaS riche en données construit à partir de composants réutilisables — graphiques, tableaux et layouts responsives lisibles sur toute taille d'écran.",
      tech: ["Vue 3", "Chart.js", "SCSS"],
      image: "dashboard",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 4,
      title: "Tableau Kanban de Gestion de Tâches",
      description: "Un tableau Kanban drag-and-drop axé sur des interactions fluides et des états visuels clairs — le genre d'interface où l'organisation est tout l'enjeu.",
      tech: ["Angular", "TypeScript"],
      image: "kanban",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 5,
      title: "Site Portfolio 7Digi Content Lab",
      description: "Un site portfolio responsive pour un studio de contenu digital, avec des animations fluides et une présentation visuelle forte.",
      tech: ["Vue", "JavaScript", "SCSS"],
      image: "7digi",
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
      duration: "Septembre 2022 — Présent",
      location: "Tunis, Tunisie",
      description: "Développement et maintenance de fonctionnalités frontend complexes dans une architecture micro-frontend, en contribuant au design system d'iObeya pour que le travail d'équipe reste cohérent à grande échelle.",
      highlights: ["Architecture micro-frontend", "Vue", "Design system", "Spring Boot"]
    },
    {
      id: 2,
      company: "Welyne",
      logo: "We",
      role: "Développeur Full Stack",
      duration: "Mars 2022 — Septembre 2022",
      location: "Tunis, Tunisie",
      description: "Développement, optimisation et maintenance full-stack des applications BlancLiving, Shopvel et IMSG-ERP — améliorations livrées sur des bases Angular, Laravel et Node.js.",
      highlights: ["Angular", "Laravel", "Node.js", "Flutter"]
    },
    {
      id: 3,
      company: "ASM — All Soft Multimedia",
      logo: "ASM",
      role: "Développeur Full Stack",
      duration: "Juin 2021 — Mars 2022",
      location: "Sfax, Tunisie",
      description: "Développement, optimisation et maintenance de DUX-ERP, une solution ERP complète, sur son frontend Angular et son backend Laravel.",
      highlights: ["Angular", "Laravel", "ERP"]
    }
  ],
  contact: {
    email,
    location: "Tunis, Tunisie",
    availability: "Ouvert aux opportunités",
    social
  },
  navItems: [
    { id: "home", label: "Accueil", icon: "home" },
    { id: "work", label: "Travaux", icon: "folder" },
    { id: "expertise", label: "Expertise", icon: "code" },
    { id: "experience", label: "Expérience", icon: "briefcase" },
    { id: "contact", label: "Contact", icon: "mail" }
  ]
}

export { techIcons, skills }
