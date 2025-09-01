<template>
  <div class="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
    <!-- Game Image -->
    <div class="relative overflow-hidden">
      <img
        :src="gameImageUrl"
        :alt="game.name"
        class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        @error="handleImageError"
        loading="lazy"
      >
      
      <!-- Playtime Badge -->
      <div class="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
        <span class="text-white text-sm font-medium">
          {{ formatPlaytime(game.playtime_forever) }}
        </span>
      </div>
      
      <!-- Recent Activity Badge -->
      <div v-if="game.playtime_2weeks" class="absolute bottom-4 left-4">
        <div class="bg-green-500/90 text-white text-xs px-2 py-1 rounded-full flex items-center">
          <div class="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
          {{ formatPlaytime(game.playtime_2weeks) }} recent
        </div>
      </div>
      
      <!-- Hover Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="absolute bottom-4 right-4 text-white text-sm">
          {{ Math.floor(game.playtime_forever / 60) }} hours
        </div>
      </div>
    </div>
    
    <!-- Game Info -->
    <div class="p-5">
      <h3 class="text-white font-semibold text-lg mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors leading-tight">
        {{ game.name }}
      </h3>
      
      <div class="space-y-3">
        <!-- Playtime Info -->
        <div class="flex items-center justify-between text-sm">
          <div class="text-blue-300 flex items-center">
            <Clock class="w-4 h-4 mr-2" />
            Total playtime
          </div>
          <div class="text-white font-medium">
            {{ Math.floor(game.playtime_forever / 60) }}h
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div v-if="maxPlaytime > 0">
          <div class="flex justify-between text-xs text-white/60 mb-1">
            <span>Relative Progress</span>
            <span>{{ Math.round(progressPercentage) }}%</span>
          </div>
          <div class="w-full bg-white/10 rounded-full h-2">
            <div
              class="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-out"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Clock } from 'lucide-vue-next'
import type { SteamGame } from '@/types/steam'

interface Props {
  game: SteamGame
  maxPlaytime: number
  formatPlaytime: (minutes: number) => string
}

const props = defineProps<Props>()

const gameImageUrl = computed(() => {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${props.game.appid}/header.jpg`
})

const progressPercentage = computed(() => {
  if (props.maxPlaytime === 0) return 0
  return Math.min((props.game.playtime_forever / props.maxPlaytime) * 100, 100)
})

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/460x215/1a202c/4299e1?text=Game+Image'
}
</script>
