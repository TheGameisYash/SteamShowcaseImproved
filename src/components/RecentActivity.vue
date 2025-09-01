<template>
  <div class="glass-card rounded-xl p-6 mb-8">
    <h3 class="text-xl font-bold text-white mb-4 flex items-center orbitron glow-text">
      <Activity class="w-5 h-5 mr-2 text-green-400" />
      Recent Activity
    </h3>
    
    <div v-if="recentGames.length > 0" class="space-y-3">
      <div 
        v-for="game in recentGames.slice(0, 8)" 
        :key="game.appid"
        class="flex items-center space-x-3 p-3 glass-card rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer group"
        @click="$emit('game-selected', game)"
      >
        <div class="relative">
          <img 
            :src="getGameImage(game.appid)" 
            :alt="game.name"
            class="w-12 h-12 rounded object-cover transition-transform duration-300 group-hover:scale-110"
            @error="handleImageError"
          >
          <div class="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
            <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div class="flex-1 min-w-0">
          <h4 class="text-white font-medium text-sm truncate group-hover:text-green-300 transition-colors">
            {{ game.name }}
          </h4>
          <div class="flex items-center space-x-2 text-xs">
            <span class="text-green-400 flex items-center">
              <Clock class="w-3 h-3 mr-1" />
              {{ formatPlaytime(game.playtime_2weeks || 0) }}
            </span>
            <span class="text-white/60">this week</span>
            <div class="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-white/60">{{ getTimeAgo(game.lastPlayed) }}</span>
          </div>
        </div>
        
        <div class="text-right flex-shrink-0">
          <div class="text-white font-medium text-sm">
            {{ Math.floor((game.playtime_2weeks || 0) / 60) }}h
          </div>
          <div class="text-xs text-green-400 font-medium">
            Recent
          </div>
        </div>
        
        <!-- Activity indicator -->
        <div class="flex flex-col space-y-1">
          <div 
            v-for="n in 5" 
            :key="n" 
            :class="[
              'w-1 h-2 rounded-full transition-all duration-300',
              n <= getActivityLevel(game.playtime_2weeks) ? 'bg-green-400' : 'bg-white/20'
            ]"
          ></div>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-8">
      <Activity class="w-16 h-16 text-white/20 mx-auto mb-3" />
      <p class="text-white/60">No recent gaming activity</p>
      <p class="text-white/40 text-sm">Games played in the last 2 weeks will appear here</p>
    </div>
    
    <!-- Activity Summary -->
    <div v-if="recentGames.length > 0" class="mt-6 pt-4 border-t border-white/10">
      <div class="grid grid-cols-2 gap-4 text-center">
        <div>
          <div class="text-xl font-bold text-green-400">{{ recentGames.length }}</div>
          <div class="text-sm text-white/60">Games Played</div>
        </div>
        <div>
          <div class="text-xl font-bold text-green-400">{{ totalRecentHours }}h</div>
          <div class="text-sm text-white/60">This Week</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Activity, Clock } from 'lucide-vue-next'

const props = defineProps({
  recentGames: { type: Array, required: true },
  formatPlaytime: { type: Function, required: true }
})

defineEmits(['game-selected'])

const totalRecentHours = computed(() => {
  return Math.floor(props.recentGames.reduce((sum, game) => sum + (game.playtime_2weeks || 0), 0) / 60)
})

const getGameImage = (appId) => {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/48x48/1a202c/4299e1?text=G'
}

const getTimeAgo = (lastPlayed) => {
  if (!lastPlayed) return 'Recently'
  
  const now = new Date()
  const played = new Date(lastPlayed)
  const diffHours = Math.floor((now - played) / (1000 * 60 * 60))
  
  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays}d ago`
  return 'This week'
}

const getActivityLevel = (playtime2weeks) => {
  if (!playtime2weeks) return 0
  const hours = playtime2weeks / 60
  if (hours >= 20) return 5
  if (hours >= 15) return 4
  if (hours >= 10) return 3
  if (hours >= 5) return 2
  return 1
}
</script>
