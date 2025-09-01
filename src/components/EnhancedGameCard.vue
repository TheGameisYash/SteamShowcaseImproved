<template>
  <div 
    :class="getCardClasses()"
    @click="$emit('click', game)"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousemove="handle3DEffect"
  >
    <!-- Grid View -->
    <template v-if="viewMode === 'grid'">
      <div class="relative overflow-hidden rounded-t-xl">
        <img
          :src="getGameImage(game)"
          :alt="game.name"
          class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          @error="handleImageError"
          loading="lazy"
        >
        
        <!-- Overlay Effects -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <!-- Achievement Progress -->
          <div class="absolute top-4 left-4">
            <div class="bg-yellow-500/90 text-black text-xs px-2 py-1 rounded-full font-bold">
              {{ game.achievementProgress || 0 }}% Complete
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="absolute top-4 right-4 flex space-x-2">
            <button 
              @click.stop="$emit('favorite', game)"
              class="p-2 bg-black/60 rounded-full hover:bg-red-500/80 transition-colors"
            >
              <Heart :class="['w-4 h-4', isFavorite ? 'text-red-500 fill-current' : 'text-white']" />
            </button>
            <button class="p-2 bg-black/60 rounded-full hover:bg-blue-500/80 transition-colors">
              <ExternalLink class="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <!-- Playtime Badge -->
        <div class="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
          <span class="text-white text-sm font-medium">{{ formatPlaytime(game.playtime_forever) }}</span>
        </div>

        <!-- Recent Activity -->
        <div v-if="game.playtime_2weeks" class="absolute bottom-4 left-4">
          <div class="bg-green-500/90 text-white text-xs px-2 py-1 rounded-full flex items-center neon-border">
            <div class="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
            {{ formatPlaytime(game.playtime_2weeks) }} recent
          </div>
        </div>

        <!-- Achievement Badges -->
        <div v-if="game.achievements && game.achievements.length" class="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div class="flex space-x-1">
            <div v-for="achievement in game.achievements.slice(0, 3)" :key="achievement.id" 
                 class="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs">
              🏆
            </div>
          </div>
        </div>
      </div>
      
      <!-- Game Info -->
      <div class="p-5 space-y-3">
        <h3 class="text-white font-semibold text-lg line-clamp-2 group-hover:text-blue-300 transition-colors leading-tight glow-text">
          {{ game.name }}
        </h3>
        
        <!-- Game Stats -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span class="text-blue-300 flex items-center">
              <Clock class="w-4 h-4 mr-2" />
              Playtime
            </span>
            <span class="text-white font-medium">{{ Math.floor(game.playtime_forever / 60) }}h</span>
          </div>
          
          <div class="flex items-center justify-between text-sm">
            <span class="text-purple-300 flex items-center">
              <Star class="w-4 h-4 mr-2" />
              Rating
            </span>
            <div class="flex items-center space-x-1">
              <Star v-for="n in 5" :key="n" 
                    :class="['w-3 h-3', n <= (game.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-600']" />
            </div>
          </div>

          <div v-if="game.friends" class="flex items-center justify-between text-sm">
            <span class="text-green-300 flex items-center">
              <Users class="w-4 h-4 mr-2" />
              Friends
            </span>
            <span class="text-white">{{ game.friends }} playing</span>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div v-if="maxPlaytime > 0 && game.playtime_forever > 0" class="space-y-2">
          <div class="flex justify-between text-xs text-white/60">
            <span>Relative Progress</span>
            <span>{{ Math.round((game.playtime_forever / maxPlaytime) * 100) }}%</span>
          </div>
          <div class="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                 :style="{ width: `${Math.min((game.playtime_forever / maxPlaytime) * 100, 100)}%` }">
              <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        <!-- Genre Tags -->
        <div v-if="game.genres" class="flex flex-wrap gap-1">
          <span v-for="genre in game.genres.slice(0, 2)" :key="genre" 
                class="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
            {{ genre }}
          </span>
        </div>
      </div>
    </template>

    <!-- List View -->
    <template v-else-if="viewMode === 'list'">
      <div class="flex items-center space-x-4 p-4">
        <img :src="getGameImage(game)" :alt="game.name" class="w-16 h-16 rounded object-cover">
        <div class="flex-1 min-w-0">
          <h3 class="text-white font-semibold group-hover:text-blue-300 transition-colors truncate">{{ game.name }}</h3>
          <div class="text-sm text-white/60 flex items-center space-x-4">
            <span>{{ formatPlaytime(game.playtime_forever) }}</span>
            <span v-if="game.playtime_2weeks">• {{ formatPlaytime(game.playtime_2weeks) }} recent</span>
            <span v-if="game.achievementProgress">• {{ game.achievementProgress }}% achievements</span>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <div class="text-white font-medium">{{ Math.floor(game.playtime_forever / 60) }}h</div>
          <div class="flex items-center space-x-1">
            <Star v-for="n in 5" :key="n" 
                  :class="['w-3 h-3', n <= (game.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-600']" />
          </div>
        </div>
      </div>
    </template>

    <!-- Cards View -->
    <template v-else-if="viewMode === 'cards'">
      <div class="aspect-video relative overflow-hidden rounded-xl">
        <img :src="getGameImage(game)" :alt="game.name" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
          <div class="absolute bottom-4 left-4 right-4">
            <h3 class="text-white font-bold text-xl mb-2">{{ game.name }}</h3>
            <div class="flex items-center justify-between">
              <span class="text-blue-300">{{ formatPlaytime(game.playtime_forever) }}</span>
              <div class="flex items-center space-x-1">
                <Star v-for="n in 5" :key="n" 
                      :class="['w-4 h-4', n <= (game.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-400']" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Clock, Heart, ExternalLink, Star, Users } from 'lucide-vue-next'

const props = defineProps({
  game: { type: Object, required: true },
  viewMode: { type: String, default: 'grid' },
  maxPlaytime: { type: Number, default: 0 },
  formatPlaytime: { type: Function, required: true },
  showDetails: { type: Boolean, default: true }
})

defineEmits(['click', 'favorite'])

const isFavorite = computed(() => {
  // This would check if the game is in favorites
  return false
})

const getCardClasses = () => {
  const baseClasses = 'game-card-3d group cursor-pointer transition-all duration-300'
  
  switch (props.viewMode) {
    case 'grid':
      return `${baseClasses} glass-card rounded-xl overflow-hidden hover:shadow-2xl`
    case 'list':
      return `${baseClasses} glass-card rounded-xl hover:bg-white/10`
    case 'cards':
      return `${baseClasses} glass-card rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105`
    default:
      return baseClasses
  }
}

const getGameImage = (game) => {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/460x215/1a202c/4299e1?text=Game+Image'
}

const handleMouseEnter = () => {
  // Play hover sound effect
}

const handleMouseLeave = (event) => {
  // Reset 3D transform
  event.currentTarget.style.transform = ''
}

const handle3DEffect = (e) => {
  if (props.viewMode !== 'grid') return
  
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = (y - centerY) / 20
  const rotateY = (centerX - x) / 20
  
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
}
</script>
