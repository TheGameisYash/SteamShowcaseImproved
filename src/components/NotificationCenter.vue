<template>
  <div class="fixed top-20 right-4 space-y-3 z-50">
    <TransitionGroup name="notification" tag="div">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'glass-card rounded-lg p-4 max-w-sm shadow-lg border-l-4',
          getNotificationClasses(notification.type)
        ]"
      >
        <div class="flex items-start space-x-3">
          <component 
            :is="getNotificationIcon(notification.type)"
            :class="['w-5 h-5 flex-shrink-0', getIconClasses(notification.type)]"
          />
          <div class="flex-1 min-w-0">
            <h4 class="text-white font-semibold text-sm">{{ notification.title }}</h4>
            <p class="text-white/70 text-sm mt-1">{{ notification.message }}</p>
          </div>
          <button 
            @click="$emit('dismiss', notification.id)"
            class="text-white/50 hover:text-white flex-shrink-0"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { CheckCircle, AlertCircle, Info, X } from 'lucide-vue-next'

defineProps({
  notifications: { type: Array, required: true }
})

defineEmits(['dismiss'])

const getNotificationIcon = (type) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  }
  return icons[type] || Info
}

const getNotificationClasses = (type) => {
  const classes = {
    success: 'border-green-500',
    error: 'border-red-500',
    info: 'border-blue-500'
  }
  return classes[type] || 'border-blue-500'
}

const getIconClasses = (type) => {
  const classes = {
    success: 'text-green-400',
    error: 'text-red-400',
    info: 'text-blue-400'
  }
  return classes[type] || 'text-blue-400'
}
</script>

<style scoped>
.notification-enter-active {
  transition: all 0.3s ease-out;
}

.notification-leave-active {
  transition: all 0.3s ease-in;
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
