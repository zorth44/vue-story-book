<template>
  <div class="bg-white rounded-lg shadow-md max-w-2xl mx-auto">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Notifications</h2>
        <button 
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
          @click="markAllAsRead"
          :disabled="!hasUnreadNotifications"
        >
          Mark all as read
        </button>
      </div>
      
      <!-- Search and Filter -->
      <div class="flex gap-4 mb-4">
        <div class="flex-1">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search notifications..."
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          v-model="selectedType"
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="message">Messages</option>
          <option value="system">System</option>
          <option value="task">Tasks</option>
          <option value="alert">Alerts</option>
        </select>
      </div>
    </div>

    <!-- Notification List -->
    <div class="max-h-[500px] overflow-y-auto">
      <div v-if="filteredNotifications.length === 0" class="p-8 text-center text-gray-500">
        No notifications found
      </div>
      
      <div 
        v-for="notification in filteredNotifications" 
        :key="notification.id"
        class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
        :class="{ 'bg-gray-50': !notification.read }"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-semibold">{{ notification.title }}</span>
              <span 
                class="px-2 py-0.5 text-xs rounded-full"
                :class="{
                  'bg-blue-100 text-blue-800': notification.type === 'message',
                  'bg-gray-100 text-gray-800': notification.type === 'system',
                  'bg-yellow-100 text-yellow-800': notification.type === 'task',
                  'bg-red-100 text-red-800': notification.type === 'alert'
                }"
              >
                {{ notification.type }}
              </span>
            </div>
            <div class="text-gray-600 mb-1">{{ notification.message }}</div>
            <div class="text-sm text-gray-400">{{ notification.time }}</div>
          </div>
          
          <div class="flex gap-2">
            <button 
              v-if="!notification.read"
              @click="markAsRead(notification.id)"
              class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
            >
              Mark as read
            </button>
            <button 
              @click="removeNotification(notification.id)"
              class="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'message' | 'system' | 'task' | 'alert';
}

const notifications = ref<Notification[]>([
  {
    id: 1,
    title: 'New Message',
    message: 'You have received a new message from John',
    time: '2 minutes ago',
    read: false,
    type: 'message'
  },
  {
    id: 2,
    title: 'System Update',
    message: 'System maintenance scheduled for tomorrow',
    time: '1 hour ago',
    read: true,
    type: 'system'
  },
  {
    id: 3,
    title: 'Task Reminder',
    message: 'Your task "Complete project" is due today',
    time: '3 hours ago',
    read: false,
    type: 'task'
  },
  {
    id: 4,
    title: 'Security Alert',
    message: 'Unusual login attempt detected',
    time: '5 hours ago',
    read: false,
    type: 'alert'
  }
]);

const searchQuery = ref('');
const selectedType = ref('all');

const hasUnreadNotifications = computed(() => {
  return notifications.value.some(notification => !notification.read);
});

const filteredNotifications = computed(() => {
  return notifications.value.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesType = selectedType.value === 'all' || notification.type === selectedType.value;
    return matchesSearch && matchesType;
  });
});

const markAsRead = (id: number) => {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true;
  });
};

const removeNotification = (id: number) => {
  notifications.value = notifications.value.filter(n => n.id !== id);
};
</script>

<style scoped>
.notification-center {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.notification-center__header {
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-center__title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.notification-center__action-btn {
  background: #007AFF;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.notification-center__action-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.notification-center__list {
  max-height: 500px;
  overflow-y: auto;
}

.notification-center__empty {
  padding: 32px;
  text-align: center;
  color: #666;
}

.notification-item {
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: background-color 0.2s;
}

.notification-item--unread {
  background-color: #f8f9fa;
}

.notification-item__content {
  flex: 1;
}

.notification-item__title {
  font-weight: 600;
  margin-bottom: 4px;
}

.notification-item__message {
  color: #666;
  margin-bottom: 4px;
}

.notification-item__time {
  font-size: 12px;
  color: #999;
}

.notification-item__actions {
  display: flex;
  gap: 8px;
}

.notification-item__action-btn {
  background: none;
  border: 1px solid #ddd;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: #666;
}

.notification-item__action-btn:hover {
  background: #f0f0f0;
}

.notification-item__action-btn--delete {
  color: #dc3545;
  border-color: #dc3545;
}

.notification-item__action-btn--delete:hover {
  background: #dc3545;
  color: white;
}
</style> 