<template>
  <div class="honors-page">
    <h1>我的荣誉</h1>
    <HonorsTimeline />
  </div>
</template>

<script setup>
import HonorsTimeline from '../components/HonorsTimeline.vue'
</script>

<style scoped>
.honors-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: var(--text-color);
  margin-bottom: 30px;
  text-align: center;
}
</style> 