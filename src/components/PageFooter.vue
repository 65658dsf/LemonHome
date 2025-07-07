<template>
  <div class="footer-container">
    <div class="runtime">
      <span>本站已运行: {{ runningTime }}</span>
    </div>
    <div class="copyright">
      <p>© {{ currentYear }} {{ siteConfig.personal.name }} 版权所有</p>
      <p>备案号：<a :href="siteConfig.footer.beianUrl" target="_blank">{{ siteConfig.footer.beian }}</a></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { siteConfig } from '../config/site'

const runningTime = ref('')
const currentYear = new Date().getFullYear()
const startTime = new Date(siteConfig.footer.startTime)

const calculateRuntime = () => {
  const now = new Date()
  const diff = now - startTime
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  runningTime.value = `${days}天${hours}小时${minutes}分${seconds}秒`
}

onMounted(() => {
  calculateRuntime()
  setInterval(calculateRuntime, 1000)
})
</script>

<style scoped>
.footer-container {
  text-align: center;
  color: var(--text-secondary);
}

.runtime {
  margin-bottom: 15px;
  font-size: 0.9em;
}

.copyright {
  font-size: 0.9em;
}

.copyright p {
  margin: 5px 0;
}

a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--primary-color);
}
</style> 