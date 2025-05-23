<template>
  <div class="notification" :class="[`notification--${type}`, { 'notification--dismissible': dismissible }]">
    <div class="notification__icon" v-if="icon">
      <span class="notification__icon-text">{{ icon }}</span>
    </div>
    <div class="notification__content">
      <div class="notification__title" v-if="title">{{ title }}</div>
      <div class="notification__message">{{ message }}</div>
    </div>
    <button v-if="dismissible" class="notification__close" @click="$emit('dismiss')">×</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  icon?: string;
  dismissible?: boolean;
}>();

defineEmits<{
  (e: 'dismiss'): void;
}>();
</script>

<style scoped>
.notification {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border-radius: 8px;
  margin: 8px 0;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.notification--success {
  background-color: #e6f4ea;
  border-left: 4px solid #34a853;
}

.notification--error {
  background-color: #fce8e6;
  border-left: 4px solid #ea4335;
}

.notification--warning {
  background-color: #fef7e0;
  border-left: 4px solid #fbbc04;
}

.notification--info {
  background-color: #e8f0fe;
  border-left: 4px solid #4285f4;
}

.notification__icon {
  margin-right: 12px;
  font-size: 20px;
}

.notification__content {
  flex: 1;
}

.notification__title {
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 16px;
}

.notification__message {
  font-size: 14px;
  line-height: 1.4;
}

.notification__close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0 4px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.notification__close:hover {
  opacity: 1;
}
</style> 