<template>
  <div class="home-page">
    <Transition name="fade" appear>
      <header>
        <PersonalInfo />
      </header>
    </Transition>
    <main class="three-column-layout">
      <Transition name="slide-fade" appear>
        <div class="column left-column">
          <ProjectList />
        </div>
      </Transition>
      <Transition name="slide-fade" appear>
        <div class="column middle-column">
          <SkillsProgress />
        </div>
      </Transition>
      <Transition name="slide-fade" appear>
        <div class="column right-column">
          <AboutMe />
        </div>
      </Transition>
    </main>
  </div>
</template>

<script setup>
import PersonalInfo from '../components/PersonalInfo.vue'
import AboutMe from '../components/AboutMe.vue'
import SkillsProgress from '../components/SkillsProgress.vue'
import ProjectList from '../components/ProjectList.vue'
</script>

<style scoped>
.home-page {
  padding: 20px;
}

header {
  margin-bottom: 40px;
}

.three-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
  align-items: stretch;
}

.column {
  display: flex;
  flex-direction: column;
}

.column > * {
  height: 100%;
  flex: 1;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .three-column-layout {
    grid-template-columns: 1fr 1fr;
  }
  
  .right-column {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .three-column-layout {
    grid-template-columns: 1fr;
  }
  
  .column {
    grid-column: span 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style> 