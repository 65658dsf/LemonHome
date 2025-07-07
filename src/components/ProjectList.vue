<template>
  <div class="projects-container">
    <h2>项目展示</h2>
    <div class="projects-grid">
      <template v-for="(project, index) in displayedProjects" :key="project.name">
        <a :href="project.url" 
           target="_blank" 
           class="project-card"
           :style="{ animationDelay: `${index * 100}ms` }">
          <div class="project-content">
            <div class="project-header">
              <h3>{{ project.name }}</h3>
              <p class="project-description">{{ project.description }}</p>
            </div>
            <div class="project-tags">
              <span v-for="tag in project.tags" 
                    :key="tag" 
                    class="tag">{{ tag }}</span>
            </div>
          </div>
        </a>
      </template>
    </div>
    <div v-if="hasMoreProjects" class="show-more">
      <button @click="toggleShowMore" class="show-more-btn">
        {{ isShowingMore ? '收起' : '查看更多' }}
        <span class="arrow" :class="{ 'arrow-up': isShowingMore }">▼</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { siteConfig } from '../config/site'

const DISPLAY_COUNT = 3
const isShowingMore = ref(false)
const randomIndices = ref([])

// 随机打乱数组
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// 初始化随机索引
const initRandomIndices = () => {
  randomIndices.value = shuffleArray(Array.from({ length: siteConfig.projects.length }, (_, i) => i))
}

// 计算显示的项目
const displayedProjects = computed(() => {
  const projects = randomIndices.value.map(index => siteConfig.projects[index])
  return isShowingMore.value ? projects : projects.slice(0, DISPLAY_COUNT)
})

// 是否有更多项目
const hasMoreProjects = computed(() => {
  return siteConfig.projects.length > DISPLAY_COUNT
})

// 切换显示更多
const toggleShowMore = () => {
  isShowingMore.value = !isShowingMore.value
}

// 组件挂载时初始化随机顺序
onMounted(() => {
  initRandomIndices()
})

// 监听显示状态变化，添加动画类
watch(isShowingMore, (newValue) => {
  if (!newValue) {
    // 当收起时，滚动到容器顶部
    const container = document.querySelector('.projects-container')
    if (container) {
      container.scrollIntoView({ behavior: 'smooth' })
    }
  }
})
</script>

<style scoped>
.projects-container {
  padding: 20px;
  background: var(--card-background);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  height: 100%;
  display: flex;
  flex-direction: column;
}

h2 {
  margin: 0 0 20px 0;
  color: var(--text-color);
}

.projects-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  flex-grow: 1;
}

.project-card {
  display: block;
  text-decoration: none;
  color: inherit;
  background: var(--background-color);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
  will-change: transform, opacity;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--card-shadow);
}

.project-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}

.project-header {
  flex-grow: 1;
  margin-bottom: 15px;
}

h3 {
  margin: 0 0 10px 0;
  color: var(--text-color);
  font-size: 1.2em;
}

.project-description {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.5;
  font-size: 0.95em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px dashed var(--border-color);
}

.tag {
  padding: 4px 8px;
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 0.85em;
  color: var(--text-secondary);
  white-space: nowrap;
}

.show-more {
  text-align: center;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px dashed var(--border-color);
}

.show-more-btn {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 0.95em;
  padding: 8px 16px;
  border-radius: 20px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0 auto;
}

.show-more-btn:hover {
  background: var(--background-color);
}

.arrow {
  display: inline-block;
  transition: transform 0.3s ease;
  font-size: 0.8em;
}

.arrow-up {
  transform: rotate(180deg);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .projects-grid {
    gap: 15px;
  }
}
</style> 