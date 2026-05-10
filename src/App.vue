<script setup>
import { ref, onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'
import Navbar from './components/Navbar.vue'
import Hero from './views/Hero.vue'
import Skills from './views/Skills.vue'
import Projects from './views/Projects.vue'
import Experience from './views/Experience.vue'
import Contact from './views/Contact.vue'
import Footer from './components/Footer.vue'

useTheme()

const activeSection = ref('about')

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  const sections = ['about', 'skills', 'projects', 'experience', 'contact']

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.3 }
  )

  sections.forEach((section) => {
    const el = document.getElementById(section)
    if (el) observer.observe(el)
  })
})
</script>

<template>
  <div class="app">
    <Navbar
      :active-section="activeSection"
      @navigate="scrollToSection"
    />
    <main>
      <Hero
        id="about"
        @navigate="scrollToSection"
      />
      <Skills id="skills" />
      <Projects id="projects" />
      <Experience id="experience" />
      <Contact id="contact" />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss">
.app {
  min-height: 100vh;
  background: $bg-primary;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.05) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
}

main {
  position: relative;
  z-index: 1;
}
</style>