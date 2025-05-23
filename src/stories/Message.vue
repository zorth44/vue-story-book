<template>
  <div class="message" :class="{ 'message--user': isUser }">
    <div class="message__content">
      <div class="message__text">{{ text }}</div>
      <div class="message__time">{{ time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  time: string;
  isUser?: boolean;
}>();
</script>

<style scoped>
.message {
  max-width: 80%;
  margin: 8px 0;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: #f0f0f0;
}

.message--user {
  margin-left: auto;
  background-color: #007AFF;
  color: white;
}

.message__content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message__text {
  font-size: 14px;
  line-height: 1.4;
}

.message__time {
  font-size: 12px;
  opacity: 0.7;
  align-self: flex-end;
}
</style> 