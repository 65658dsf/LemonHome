<template>
  <div class="honors-timeline">
    <div v-for="(honor, index) in honors" :key="index" class="timeline-item">
      <div class="timeline-content">
        <span class="timeline-date">{{ honor.date }}</span>
        <h3 class="timeline-title">{{ honor.title }}</h3>
        <p class="timeline-description">{{ honor.description }}</p>
        <div v-if="honor.certificate" class="certificate-viewer">
          <img :src="honor.certificate" 
               alt="证书" 
               @click="showCertificate(honor.certificate)"
               class="certificate-thumbnail">
          <small>点击图片查看大图</small>
        </div>
      </div>
    </div>
    <div v-if="lightboxVisible" class="lightbox" @click="hideCertificate">
      <img :src="currentCertificate" alt="证书大图" class="lightbox-image">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { honors } from '../config/honors'

const lightboxVisible = ref(false)
const currentCertificate = ref('')

const showCertificate = (cert) => {
  currentCertificate.value = cert
  lightboxVisible.value = true
}

const hideCertificate = () => {
  lightboxVisible.value = false
}
</script>

<style scoped>
.honors-timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.honors-timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background-color: var(--border-color);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  width: 50%;
}

.timeline-item:nth-child(odd) {
  left: 0;
  padding-right: 2rem;
}

.timeline-item:nth-child(even) {
  left: 50%;
  padding-left: 2rem;
}

.timeline-content {
  background: var(--card-background);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  box-shadow: var(--card-shadow);
  position: relative;
}

.timeline-item::after {
  content: '';
  position: absolute;
  top: 20px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--primary-color);
  border: 2px solid var(--background-color);
  z-index: 1;
}

.timeline-item:nth-child(odd)::after {
  right: -6px;
  transform: translateX(50%);
}

.timeline-item:nth-child(even)::after {
  left: -6px;
  transform: translateX(-50%);
}

.timeline-date {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  display: block;
}

.timeline-title {
  margin: 0 0 0.8rem 0;
  font-size: 1.2rem;
  color: var(--text-color);
}

.timeline-description {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.5;
}

.certificate-viewer {
  margin-top: 1rem;
}

.certificate-thumbnail {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid var(--border-color);
  transition: transform 0.2s;
}

.certificate-thumbnail:hover {
  transform: scale(1.05);
}

small {
  display: block;
  text-align: center;
  margin-top: 0.5rem;
  color: var(--text-tertiary);
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}

.lightbox-image {
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .honors-timeline::before {
    left: 20px;
  }
  
  .timeline-item,
  .timeline-item:nth-child(even) {
    width: 100%;
    left: 0;
    padding-left: 45px;
    padding-right: 0;
  }
  
  .timeline-item:nth-child(odd) {
    padding-right: 0;
  }

  .timeline-item::after,
  .timeline-item:nth-child(even)::after {
    left: 14px;
  }
}
</style> 