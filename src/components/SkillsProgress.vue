<template>
  <div class="skills-container">
    <h2>技能熟练度</h2>
    <div class="skills-grid">
      <div v-for="skill in siteConfig.skills" 
           :key="skill.name" 
           class="skill-item">
        <div class="skill-content">
          <div class="skill-header">
            <img :src="skill.icon" :alt="skill.name" class="skill-icon" />
            <span class="skill-name">{{ skill.name }}</span>
            <span class="skill-level">{{ skill.level }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress" 
                 :style="{ width: skill.level + '%' }">
            </div>
          </div>
        </div>
        <div class="skill-overlay">
          <p>{{ skill.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { siteConfig } from '../config/site'
</script>

<style scoped>
.skills-container {
  padding: 20px;
  background: var(--card-background);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
}

h2 {
  margin: 0 0 20px 0;
  color: var(--text-color);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

@media (max-width: 1200px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}

.skill-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  transition: transform 0.2s ease;
}

.skill-item:hover {
  transform: translateY(-2px);
}

.skill-content {
  padding: 15px;
}

.skill-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.skill-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.skill-name {
  font-weight: 500;
  color: var(--text-color);
  flex-grow: 1;
}

.skill-level {
  color: var(--text-secondary);
  font-size: 0.9em;
  margin-left: 10px;
}

.progress-bar {
  height: 8px;
  background: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), #8BC34A);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.skill-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.skill-overlay p {
  color: #fff;
  margin: 0;
  text-align: center;
  font-size: 0.95em;
  line-height: 1.5;
}

.skill-item:hover .skill-overlay {
  opacity: 1;
  visibility: visible;
}

/* 暗色主题适配 */
:root[data-theme="dark"] .skill-overlay {
  background: rgba(0, 0, 0, 0.85);
}
</style> 