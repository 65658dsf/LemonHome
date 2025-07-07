<template>
  <div class="friend-links-container">
    <div class="my-info-section">
      <h2>欢迎交换友链！</h2>
      <div class="my-link-info">
        <div class="info-card">
          <div class="info-item">
            <span class="label">链接：</span>
            <a :href="myLinkInfo.url" target="_blank">{{ myLinkInfo.url }}</a>
          </div>
          <div class="info-item">
            <span class="label">名称：</span>
            <span>{{ myLinkInfo.name }}</span>
          </div>
          <div class="info-item">
            <span class="label">头像：</span>
            <a :href="myLinkInfo.avatar" target="_blank" class="avatar-link">
              <img :src="myLinkInfo.avatar" alt="我的头像" class="my-avatar" />
            </a>
          </div>
          <div class="info-item">
            <span class="label">描述：</span>
            <span>{{ myLinkInfo.description }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="friends-section">
      <h2>友情链接</h2>
      <div class="friends-grid">
        <div v-for="(link, index) in friendLinks" :key="index" class="friend-card">
          <a :href="link.url" target="_blank" class="friend-link">
            <div class="friend-header">
              <img :src="link.avatar" :alt="link.name" class="friend-avatar" />
              <h3 class="friend-name">{{ link.name }}</h3>
            </div>
            <p class="friend-description">{{ link.description }}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { friendLinks, myLinkInfo } from '../config/friends'
</script>

<style scoped>
.friend-links-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.my-info-section, .friends-section {
  background: var(--card-background);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
}

h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  font-size: 1.5rem;
}

.info-card {
  background: var(--background-color);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
}

.info-item {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.label {
  font-weight: bold;
  color: var(--text-color);
  min-width: 60px;
}

.my-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  vertical-align: middle;
}

.avatar-link {
  display: inline-block;
}

.friends-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.friend-card {
  display: block;
  text-decoration: none;
  color: inherit;
  background: var(--background-color);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  box-sizing: border-box;
}

.friend-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--card-shadow);
}

.friend-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.2rem;
  box-sizing: border-box;
}

.friend-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
}

.friend-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
  border: 2px solid var(--card-background);
}

.friend-name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
}

.friend-description {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .friends-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .friends-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .info-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .label {
    margin-bottom: 0.3rem;
  }
}
</style> 