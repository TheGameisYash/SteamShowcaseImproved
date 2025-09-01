<template>
  <div class="glass-card rounded-xl p-6 mb-8">
    <h3 class="text-xl font-bold text-white mb-4 flex items-center orbitron glow-text">
      <Calendar class="w-5 h-5 mr-2 text-green-400" />
      Gaming Activity Heatmap
    </h3>
    
    <div class="space-y-4">
      <!-- Year selector -->
      <div class="flex items-center justify-between">
        <div class="text-sm text-white/70">
          {{ activities.length }} days tracked
        </div>
        <div class="text-sm text-white/70">
          Less <span class="inline-flex space-x-1 mx-2">
            <div class="w-3 h-3 bg-white/20 rounded-sm"></div>
            <div class="w-3 h-3 bg-green-400/40 rounded-sm"></div>
            <div class="w-3 h-3 bg-green-400/60 rounded-sm"></div>
            <div class="w-3 h-3 bg-green-400/80 rounded-sm"></div>
            <div class="w-3 h-3 bg-green-400 rounded-sm"></div>
          </span> More
        </div>
      </div>
      
      <!-- Heatmap Grid -->
      <div class="grid grid-cols-53 gap-1 p-4 glass-card rounded-lg">
        <div
          v-for="(activity, index) in activities"
          :key="index"
          class="heatmap-day cursor-pointer relative group"
          :style="{ backgroundColor: getHeatmapColor(activity.intensity) }"
          :title="`${activity.date}: ${activity.hours}h gaming, ${activity.games} games`"
          @click="showDayDetails(activity)"
        >
          <!-- Tooltip -->
          <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 glass-card rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
            <div class="font-semibold">{{ formatDate(activity.date) }}</div>
            <div>{{ activity.hours }} hours gaming</div>
            <div>{{ activity.games }} games played</div>
          </div>
        </div>
      </div>
      
      <!-- Month labels -->
      <div class="flex justify-between text-xs text-white/60 px-4">
        <span v-for="month in monthLabels" :key="month">{{ month }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Calendar } from 'lucide-vue-next'

const props = defineProps({
  activities: { type: Array, required: true }
})

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const getHeatmapColor = (intensity) => {
  const colors = [
    'rgba(255, 255, 255, 0.1)',  // 0 - no activity
    'rgba(34, 197, 94, 0.3)',    // 1 - low activity
    'rgba(34, 197, 94, 0.5)',    // 2 - medium activity  
    'rgba(34, 197, 94, 0.7)',    // 3 - high activity
    'rgba(34, 197, 94, 1)'       // 4 - very high activity
  ]
  
  const index = Math.min(Math.floor(intensity), 4)
  return colors[index]
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  })
}

const showDayDetails = (activity) => {
  // Emit event to show detailed day view
  console.log('Show details for:', activity)
}
</script>
