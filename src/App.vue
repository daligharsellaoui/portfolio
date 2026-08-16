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

const activeSection = ref('home')

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  const sections = ['home', 'work', 'expertise', 'experience', 'contact']

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
        id="home"
        @navigate="scrollToSection"
      />
      <Projects id="work" />
      <Skills id="expertise" />
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
      radial-gradient(ellipse 60% 45% at 78% -10%, rgba(161, 205, 244, 0.09) 0%, transparent 60%),
      radial-gradient(ellipse 45% 40% at 8% 110%, rgba(161, 205, 244, 0.05) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
    opacity: 0.022;
    pointer-events: none;
    z-index: 0;
  }
}

main {
  position: relative;
  z-index: 1;
}
</style>