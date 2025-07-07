<template>
  <div class="about-container">
    <h2>{{ siteConfig.aboutMe.title }}</h2>
    <div class="tags-container" ref="tagsContainer">
      <div v-for="(tag, index) in siteConfig.aboutMe.tags" 
           :key="index"
           class="tag"
           :style="getTagStyle(tag, index)"
           @mouseenter="handleMouseEnter(index)"
           @mouseleave="handleMouseLeave(index)">
        {{ tag.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { siteConfig } from '../config/site'

const tagsContainer = ref(null)
let animationFrameId = null
const tagPositions = ref([])

// 生成随机数的辅助函数
const random = (min, max) => Math.random() * (max - min) + min
const randomInt = (min, max) => Math.floor(random(min, max))

// 初始化标签位置和动画参数
const initTagPositions = () => {
  const containerWidth = tagsContainer.value.offsetWidth
  const containerHeight = tagsContainer.value.offsetHeight

  tagPositions.value = siteConfig.aboutMe.tags.map(() => ({
    x: random(0, containerWidth - 120),
    y: random(0, containerHeight - 40),
    vx: random(-0.8, 0.8),
    vy: random(-0.8, 0.8),
    scale: random(0.8, 1.2),
    rotation: random(-15, 15),
    opacity: 0,
    delay: random(0, 1000), // 添加随机延迟
    amplitude: random(20, 40), // 随机振幅
    frequency: random(0.001, 0.003), // 随机频率
    phase: random(0, Math.PI * 2), // 随机相位
    isHovered: false
  }))
}

// 更新标签位置
const updatePositions = (timestamp = 0) => {
  const containerWidth = tagsContainer.value.offsetWidth
  const containerHeight = tagsContainer.value.offsetHeight

  tagPositions.value.forEach((pos, index) => {
    // 淡入动画
    if (timestamp < pos.delay) {
      pos.opacity = 0
    } else {
      pos.opacity = Math.min(1, (timestamp - pos.delay) / 500)
    }

    if (!pos.isHovered) {
      // 正弦运动
      const wave = Math.sin(timestamp * pos.frequency + pos.phase) * pos.amplitude
      
      // 更新位置
      pos.x += pos.vx
      pos.y += pos.vy + Math.cos(timestamp * 0.001) * 0.2

      // 添加随机性
      if (Math.random() < 0.02) {
        pos.vx += random(-0.1, 0.1)
        pos.vy += random(-0.1, 0.1)
        
        // 限制速度
        pos.vx = Math.max(-1, Math.min(1, pos.vx))
        pos.vy = Math.max(-1, Math.min(1, pos.vy))
      }

      // 边界检测和反弹
      if (pos.x < 0 || pos.x > containerWidth - 120) {
        pos.vx *= -0.8
        pos.x = Math.max(0, Math.min(pos.x, containerWidth - 120))
        pos.rotation = random(-15, 15) // 碰撞时随机旋转
      }
      if (pos.y < 0 || pos.y > containerHeight - 40) {
        pos.vy *= -0.8
        pos.y = Math.max(0, Math.min(pos.y, containerHeight - 40))
        pos.rotation = random(-15, 15) // 碰撞时随机旋转
      }

      // 缓慢改变旋转
      pos.rotation += random(-0.2, 0.2)
      pos.rotation = Math.max(-20, Math.min(20, pos.rotation))
    }
  })

  animationFrameId = requestAnimationFrame(updatePositions)
}

// 处理鼠标悬停
const handleMouseEnter = (index) => {
  tagPositions.value[index].isHovered = true
  tagPositions.value[index].scale = 1.1
}

const handleMouseLeave = (index) => {
  tagPositions.value[index].isHovered = false
  tagPositions.value[index].scale = random(0.8, 1.2)
}

// 获取标签样式
const getTagStyle = (tag, index) => {
  if (!tagPositions.value[index]) return {}
  const pos = tagPositions.value[index]
  
  return {
    transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale}) rotate(${pos.rotation}deg)`,
    backgroundColor: tag.color,
    color: isLightColor(tag.color) ? '#000' : '#fff',
    opacity: pos.opacity,
  }
}

// 判断颜色是否为浅色
const isLightColor = (color) => {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128
}

// 监听窗口大小变化
const handleResize = () => {
  if (tagsContainer.value) {
    initTagPositions()
  }
}

onMounted(() => {
  initTagPositions()
  updatePositions()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.about-container {
  padding: 20px;
  background: var(--card-background);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  height: 100%;
}

h2 {
  margin: 0 0 20px 0;
  color: var(--text-color);
}

.tags-container {
  position: relative;
  height: calc(100% - 60px);
  overflow: hidden;
  min-height: 300px;
}

.tag {
  position: absolute;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.95em;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  will-change: transform, opacity;
  transition: box-shadow 0.3s ease;
}

.tag:hover {
  z-index: 10;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .tags-container {
    min-height: 400px;
  }
}
</style> 