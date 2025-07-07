<template>
  <div class="app-container">
    <div class="theme-toggle">
      <button @click="toggleTheme" class="theme-switch" :title="isDark ? '切换到亮色模式' : '切换到暗色模式'">
        <svg v-if="isDark" class="icon" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5M2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1m18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1M11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1m0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1M5.99 4.58a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58m12.37 12.37a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06m1.06-10.96a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06M7.05 18.36a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
        </svg>
        <svg v-else class="icon" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M11.01 3.05C6.51 3.54 3 7.36 3 12a9 9 0 0 0 9 9c4.63 0 8.45-3.5 8.95-8c.09-.79-.78-1.42-1.54-.95A5.403 5.403 0 0 1 11.1 7.5c0-1.06.31-2.06.84-2.89c.45-.67-.04-1.63-.93-1.56z"/>
        </svg>
      </button>
    </div>
    <nav class="main-nav">
      <router-link to="/" class="nav-link">首页</router-link>
      <router-link to="/friend" class="nav-link">友情链接</router-link>
      <router-link to="/honors" class="nav-link">我的荣誉</router-link>
    </nav>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Transition name="fade" appear>
      <footer>
        <PageFooter />
      </footer>
    </Transition>
    <StagewiseToolbar v-if="isDev" :config="{ plugins: [VuePlugin] }" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PageFooter from './components/PageFooter.vue'
import { StagewiseToolbar } from '@stagewise/toolbar-vue'
import { VuePlugin } from '@stagewise-plugins/vue'

const isDev = import.meta.env.DEV
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = prefersDark
  document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
})
</script>

<style>
.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.theme-switch {
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  box-shadow: var(--card-shadow);
  padding: 0;
}

.theme-switch:hover {
  background: var(--background-color);
}

.icon {
  width: 24px;
  height: 24px;
}

.main-nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  padding: 10px;
  background: var(--card-background);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background: var(--background-color);
}

.nav-link.router-link-active {
  background: var(--background-color);
  font-weight: bold;
}

footer {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 