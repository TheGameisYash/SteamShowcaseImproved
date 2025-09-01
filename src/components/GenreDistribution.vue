<template>
  <div class="glass-card rounded-xl p-6 mb-8">
    <h3 class="text-xl font-bold text-white mb-4 flex items-center orbitron glow-text">
      <PieChart class="w-5 h-5 mr-2 text-purple-400" />
      Genre Distribution
    </h3>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Chart -->
      <div class="h-64">
        <Doughnut :data="chartData" :options="chartOptions" />
      </div>
      
      <!-- Legend -->
      <div class="space-y-3">
        <div 
          v-for="(genre, index) in genreStats" 
          :key="genre.name"
          class="flex items-center justify-between p-3 glass-card rounded-lg hover:bg-white/10 transition-colors"
        >
          <div class="flex items-center space-x-3">
            <div 
              class="w-4 h-4 rounded-full"
              :style="{ backgroundColor: genreColors[index % genreColors.length] }"
            ></div>
            <span class="text-white font-medium">{{ genre.name }}</span>
          </div>
          <div class="text-right">
            <div class="text-white font-bold">{{ genre.count }}</div>
            <div class="text-xs text-white/60">{{ genre.percentage.toFixed(1) }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { PieChart } from 'lucide-vue-next'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  games: { type: Array, required: true }
})

const genreColors = [
  '#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B',
  '#EF4444', '#6366F1', '#14B8A6', '#F97316', '#84CC16'
]

// Mock genre data - in real implementation, this would come from Steam API
const genreStats = computed(() => {
  const genres = {
    'Action': Math.floor(props.games.length * 0.25),
    'RPG': Math.floor(props.games.length * 0.20),
    'Strategy': Math.floor(props.games.length * 0.15),
    'Simulation': Math.floor(props.games.length * 0.12),
    'Adventure': Math.floor(props.games.length * 0.10),
    'Sports': Math.floor(props.games.length * 0.08),
    'Racing': Math.floor(props.games.length * 0.06),
    'Other': Math.floor(props.games.length * 0.04)
  }

  return Object.entries(genres).map(([name, count]) => ({
    name,
    count,
    percentage: (count / props.games.length) * 100
  })).filter(genre => genre.count > 0)
})

const chartData = computed(() => ({
  labels: genreStats.value.map(genre => genre.name),
  datasets: [{
    data: genreStats.value.map(genre => genre.count),
    backgroundColor: genreColors,
    borderColor: genreColors.map(color => color + '40'),
    borderWidth: 2,
    hoverOffset: 10
  }]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      titleColor: '#60A5FA',
      bodyColor: 'white',
      borderColor: 'rgba(59, 130, 246, 0.5)',
      borderWidth: 1,
      cornerRadius: 8,
      callbacks: {
        label: (context) => {
          const percentage = ((context.parsed / props.games.length) * 100).toFixed(1)
          return `${context.label}: ${context.parsed} games (${percentage}%)`
        }
      }
    }
  },
  cutout: '60%'
}))
</script>
