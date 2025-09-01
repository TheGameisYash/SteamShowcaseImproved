<template>
  <div class="glass-card rounded-xl p-6 mb-8">
    <h3 class="text-xl font-bold text-white mb-4 flex items-center orbitron glow-text">
      <TrendingUp class="w-5 h-5 mr-2 text-blue-400" />
      Playtime Analytics
    </h3>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Chart -->
      <div class="lg:col-span-2">
        <div class="h-64 relative">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>
      
      <!-- Top Games List -->
      <div class="space-y-3">
        <h4 class="text-lg font-semibold text-white mb-3">Top 5 Games</h4>
        <div 
          v-for="(game, index) in topGames" 
          :key="game.appid"
          class="flex items-center space-x-3 p-3 glass-card rounded-lg hover:bg-white/10 transition-colors"
        >
          <div class="text-2xl font-bold text-blue-400 w-8">{{ index + 1 }}</div>
          <img 
            :src="getGameImage(game.appid)" 
            :alt="game.name"
            class="w-10 h-10 rounded object-cover"
            @error="handleImageError"
          >
          <div class="flex-1 min-w-0">
            <div class="text-white font-medium text-sm truncate">{{ game.name }}</div>
            <div class="text-xs text-blue-300">{{ Math.floor(game.playtime_forever / 60) }}h</div>
          </div>
          <div class="w-16 bg-white/10 rounded-full h-2">
            <div
              class="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-1000"
              :style="{ width: `${(game.playtime_forever / maxPlaytime) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { TrendingUp } from 'lucide-vue-next'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const props = defineProps({
  games: { type: Array, required: true }
})

const topGames = computed(() => {
  return props.games
    .sort((a, b) => b.playtime_forever - a.playtime_forever)
    .slice(0, 10)
})

const maxPlaytime = computed(() => {
  return Math.max(...props.games.map(game => game.playtime_forever), 1)
})

const chartData = computed(() => ({
  labels: topGames.value.slice(0, 7).map(game => 
    game.name.length > 12 ? game.name.substring(0, 12) + '...' : game.name
  ),
  datasets: [{
    label: 'Playtime (hours)',
    data: topGames.value.slice(0, 7).map(game => Math.floor(game.playtime_forever / 60)),
    borderColor: 'rgba(59, 130, 246, 1)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    fill: true,
    tension: 0.4,
    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
    pointBorderColor: 'rgba(30, 64, 175, 1)',
    pointHoverBackgroundColor: 'rgba(147, 51, 234, 1)',
    pointHoverBorderColor: 'rgba(126, 34, 206, 1)',
    pointRadius: 6,
    pointHoverRadius: 8
  }]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      titleColor: '#60A5FA',
      bodyColor: 'white',
      borderColor: 'rgba(59, 130, 246, 0.5)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: false
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)',
        maxRotation: 45,
        font: { size: 11 }
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
        drawTicks: false
      },
      border: { display: false }
    },
    y: {
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)',
        font: { size: 11 }
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
        drawTicks: false
      },
      border: { display: false }
    }
  },
  elements: {
    point: {
      hoverBackgroundColor: '#8B5CF6',
      hoverBorderColor: '#7C3AED'
    }
  }
}))

const getGameImage = (appId) => {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/40x40/1a202c/4299e1?text=G'
}
</script>
