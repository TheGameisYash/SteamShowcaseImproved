<template>
  <Teleport to="body">
    <div 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="$emit('close')"
    >
      <div 
        class="glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Header -->
        <div class="relative h-64 rounded-t-2xl overflow-hidden">
          <img 
            :src="getGameImage(game)"
            :alt="game.name"
            class="w-full h-full object-cover"
            @error="handleImageError"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          
          <!-- Close Button -->
          <button 
            @click="$emit('close')"
            class="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <X class="w-6 h-6 text-white" />
          </button>
          
          <!-- Game Info Overlay -->
          <div class="absolute bottom-4 left-4 right-4">
            <h1 class="text-3xl font-bold text-white mb-2 glow-text orbitron">{{ game.name }}</h1>
            <div class="flex items-center space-x-4 text-white/80">
              <span class="achievement-badge">{{ formatPlaytime(game.playtime_forever) }}</span>
              <span v-if="game.achievementProgress" class="achievement-badge">
                {{ game.achievementProgress }}% Complete
              </span>
              <div class="flex items-center space-x-1">
                <Star v-for="n in 5" :key="n" 
                      :class="['w-4 h-4', n <= (game.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-500']" />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-6 space-y-6">
          <!-- Quick Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center p-4 glass-card rounded-lg">
              <Clock class="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div class="text-2xl font-bold text-white">{{ Math.floor(game.playtime_forever / 60) }}h</div>
              <div class="text-sm text-white/60">Total Playtime</div>
            </div>
            
            <div class="text-center p-4 glass-card rounded-lg">
              <Calendar class="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div class="text-2xl font-bold text-white">{{ formatDate(game.lastPlayed) }}</div>
              <div class="text-sm text-white/60">Last Played</div>
            </div>
            
            <div class="text-center p-4 glass-card rounded-lg">
              <Trophy class="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div class="text-2xl font-bold text-white">{{ game.achievementProgress || 0 }}%</div>
              <div class="text-sm text-white/60">Achievements</div>
            </div>
            
            <div class="text-center p-4 glass-card rounded-lg">
              <Users class="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div class="text-2xl font-bold text-white">{{ game.friends || 0 }}</div>
              <div class="text-sm text-white/60">Friends Playing</div>
            </div>
          </div>
          
          <!-- Playtime Chart -->
          <div class="glass-card rounded-lg p-4">
            <h3 class="text-lg font-semibold text-white mb-4">Playtime History</h3>
            <div class="h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-end justify-between p-4">
              <div v-for="week in 12" :key="week" class="flex-1 mx-1">
                <div 
                  class="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                  :style="{ height: `${Math.random() * 100}%` }"
                ></div>
              </div>
            </div>
            <div class="flex justify-between text-xs text-white/60 mt-2">
              <span>12 weeks ago</span>
              <span>Now</span>
            </div>
          </div>
          
          <!-- Screenshots -->
          <div v-if="game.screenshots && game.screenshots.length" class="space-y-4">
            <h3 class="text-lg font-semibold text-white">Screenshots</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div 
                v-for="(screenshot, index) in game.screenshots.slice(0, 6)" 
                :key="index"
                class="aspect-video rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                @click="openLightbox(screenshot, index)"
              >
                <img :src="screenshot" :alt="`Screenshot ${index + 1}`" class="w-full h-full object-cover">
              </div>
            </div>
          </div>
          
          <!-- Achievements -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white">Recent Achievements</h3>
            <div class="space-y-3">
              <div 
                v-for="achievement in mockAchievements" 
                :key="achievement.id"
                class="flex items-center space-x-3 p-3 glass-card rounded-lg"
              >
                <div class="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Trophy class="w-6 h-6 text-yellow-400" />
                </div>
                <div class="flex-1">
                  <h4 class="text-white font-medium">{{ achievement.name }}</h4>
                  <p class="text-sm text-white/60">{{ achievement.description }}</p>
                </div>
                <div class="text-right text-sm text-white/60">
                  {{ achievement.date }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex space-x-4">
            <button class="flex-1 cyber-button py-3 px-6 rounded-lg font-semibold">
              <ExternalLink class="w-4 h-4 inline mr-2" />
              Open in Steam
            </button>
            <button class="flex-1 cyber-button py-3 px-6 rounded-lg font-semibold">
              <Heart class="w-4 h-4 inline mr-2" />
              Add to Favorites
            </button>
            <button class="cyber-button py-3 px-6 rounded-lg font-semibold">
              <Share2 class="w-4 h-4 inline mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { 
  X, Clock, Calendar, Trophy, Users, Star, ExternalLink, Heart, Share2
} from 'lucide-vue-next'

const props = defineProps({
  game: { type: Object, required: true },
  profile: { type: Object, required: true }
})

defineEmits(['close'])

const mockAchievements = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete the tutorial",
    date: "2 days ago"
  },
  {
    id: 2,
    name: "Level Up",
    description: "Reach level 10",
    date: "1 week ago"
  },
  {
    id: 3,
    name: "Explorer",
    description: "Discover 50 locations",
    date: "2 weeks ago"
  }
]

const getGameImage = (game) => {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/800x400/1a202c/4299e1?text=Game+Image'
}

const formatPlaytime = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  if (days > 0) return `${days}d ${hours % 24}h`
  return `${hours}h`
}

const formatDate = (date) => {
  if (!date) return 'Never'
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}

const openLightbox = (screenshot, index) => {
  // Open screenshot in lightbox
  console.log('Open lightbox for screenshot:', screenshot, index)
}
</script>
