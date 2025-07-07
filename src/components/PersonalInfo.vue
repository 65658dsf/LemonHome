<template>
  <div class="personal-info">
    <div class="avatar-container">
      <img :src="siteConfig.personal.avatar" :alt="siteConfig.personal.name" class="avatar" />
    </div>
    <div class="info-content">
      <h1>{{ siteConfig.personal.name }}</h1>
      <p class="bio">{{ siteConfig.personal.bio }}</p>
      <div class="hitokoto-container">
        <template v-if="loading">
          <div class="loading">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="loading-text">获取中</span>
          </div>
        </template>
        <template v-else-if="hitokoto">
          <p class="hitokoto">{{ hitokoto.hitokoto }}</p>
          <p class="hitokoto-from">—— {{ hitokoto.from }}</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { siteConfig } from '../config/site'

const hitokoto = ref(null)
const loading = ref(true)

const fetchHitokoto = async () => {
  loading.value = true
  try {
    const response = await fetch('https://international.v1.hitokoto.cn/', {
      headers: {
        'Accept': 'application/json'
      }
    })
    const data = await response.json()
    hitokoto.value = data
  } catch (error) {
    console.error('获取一言失败：', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchHitokoto()
})
</script>

<style scoped>
.personal-info {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 20px;
  background: var(--card-background);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
}

.avatar-container {
  flex-shrink: 0;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  object-fit: cover;
  border: 3px solid var(--card-background);
  box-shadow: var(--card-shadow);
}

.info-content {
  flex-grow: 1;
  min-width: 0;
}

h1 {
  margin: 0 0 10px 0;
  font-size: 2em;
  color: var(--text-color);
  word-break: break-word;
}

.bio {
  margin: 0 0 15px 0;
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1.1em;
  word-wrap: break-word;
}

.hitokoto-container {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed var(--border-color);
  min-height: 60px;
}

.hitokoto {
  margin: 0;
  color: var(--text-secondary);
  font-size: 1em;
  font-style: italic;
  line-height: 1.6;
  word-wrap: break-word;
}

.hitokoto-from {
  margin: 5px 0 0 0;
  color: var(--text-tertiary);
  font-size: 0.9em;
  text-align: right;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
}

.loading-text {
  color: var(--text-secondary);
  font-size: 0.9em;
}

.dot {
  width: 6px;
  height: 6px;
  background: var(--text-secondary);
  border-radius: 50%;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}

.dot:nth-child(2) {
  animation-delay: 1s;
}

.dot:nth-child(3) {
  animation-delay: 1.5s;
}

@keyframes dot-flashing {
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .personal-info {
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 15px;
  }

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }

  h1 {
    font-size: 1.6em;
  }

  .bio {
    font-size: 1em;
  }

  .hitokoto {
    font-size: 0.95em;
  }
}

@media (max-width: 480px) {
  .personal-info {
    padding: 12px;
    gap: 15px;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }

  h1 {
    font-size: 1.4em;
  }

  .bio {
    font-size: 0.95em;
  }

  .hitokoto-container {
    margin-top: 12px;
    padding-top: 12px;
  }

  .hitokoto {
    font-size: 0.9em;
  }
}
</style> 