<template>
  <div 
    class="stats-card glass-card rounded-xl p-6 cursor-pointer hover:scale-105 transform transition-all duration-300"
    :class="`hover:border-${stat.color}-500/50`"
    @click="$emit('click', stat)"
    @mouseenter="playHoverSound"
  >
    <div class="flex items-center space-x-3 mb-4">
      <div :class="`p-3 rounded-lg bg-gradient-to-r from-${stat.color}-500/20 to-${stat.color}-600/20`">
        <component :is="stat.icon" :class="`w-6 h-6 text-${stat.color}-400`" />
      </div>
      <h3 class="text-white font-semibold orbitron">{{ stat.title }}</h3>
    </div>
    
    <div class="space-y-2">
      <div class="text-3xl font-bold text-white glow-text">{{ stat.value }}</div>
      <div class="text-sm text-white/60">{{ stat.subtitle }}</div>
      <div v-if="stat.trend" :class="`text-xs text-${stat.color}-400 flex items-center space-x-1`">
        <TrendingUp class="w-3 h-3" />
        <span>{{ stat.trend }}</span>
      </div>
    </div>
    
    <!-- Animated background -->
    <div class="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
      <div :class="`absolute inset-0 bg-gradient-to-r from-${stat.color}-500/10 to-transparent rounded-xl`"></div>
    </div>
  </div>
</template>

<script setup>
import { TrendingUp } from 'lucide-vue-next'

defineProps({
  stat: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])

const playHoverSound = () => {
  // Sound effect logic would go here
}
</script>
