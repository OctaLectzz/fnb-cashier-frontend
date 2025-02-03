<template>
  <q-page class="flex flex-center bg-dark">
    <div class="clockStyle text-h1 text-bold text-secondary" id="clock">{{ time }}</div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Time
const time = ref('')
const updateTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  time.value = `${hours}:${minutes}:${seconds}`
}
onMounted(() => {
  updateTime()
  const interval = setInterval(updateTime, 1000)

  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>

<style scoped>
.clockStyle {
  font-size: 8rem;
  letter-spacing: 1rem;
  text-shadow: 4px 2px 5px var(--q-primary);
}
</style>
