<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
    <!-- Matrix Digital Rain Background -->
    <div ref="matrixContainer" class="matrix-bg"></div>
    
    <!-- Advanced Background Effects -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <!-- Animated Particles -->
      <div 
        v-for="n in particleCount" 
        :key="n" 
        class="absolute particle opacity-20"
        :style="getParticleStyle(n)"
      >
        <div class="w-1 h-1 bg-blue-400 rounded-full"></div>
      </div>
      
      <!-- Holographic Overlay -->
      <div class="holographic-bg absolute inset-0 opacity-10"></div>
    </div>

    <!-- Enhanced Header -->
    <header class="glass-card sticky top-0 z-50 border-b border-white/10">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <img 
                v-if="profile" 
                :src="profile.avatarfull" 
                :alt="profile.personaname"
                class="w-16 h-16 rounded-full border-2 border-blue-400 shadow-lg neon-border"
              >
              <!-- Level Badge Overlay -->
              <div v-if="playerLevel" class="absolute -top-2 -right-2">
                <div class="level-badge text-xs">
                  <span class="level-number font-bold text-white z-10">{{ playerLevel.level }}</span>
                </div>
              </div>
            </div>
            
            <div v-if="profile">
              <h1 class="text-2xl font-bold text-white glow-text orbitron">
                {{ profile.personaname }}'s Steam Arsenal
              </h1>
              <div class="flex items-center space-x-4 text-blue-300 text-sm">
                <span class="achievement-badge">{{ games.length }} games</span>
                <span class="achievement-badge">{{ totalPlaytime }} playtime</span>
                <span v-if="playerLevel" class="achievement-badge">
                  Level {{ playerLevel.level }} {{ playerLevel.title }}
                </span>
              </div>
            </div>
            <div v-else>
              <h1 class="text-2xl font-bold text-white glow-text orbitron">Steam Arsenal Loading...</h1>
              <div class="animate-pulse text-blue-300">Initializing gaming data...</div>
            </div>
          </div>
          
          <!-- Enhanced Control Panel -->
          <div class="flex items-center space-x-3">
            <!-- AI Assistant Toggle -->
            <button
              @click="toggleAI"
              :class="[
                'p-2 rounded-lg transition-all duration-300 cyber-button',
                aiEnabled ? 'bg-green-500/20 border-green-500/30' : 'bg-white/10 border-white/20'
              ]"
              title="Toggle AI Assistant"
              @mouseenter="playSound('hover')"
            >
              <Bot class="w-5 h-5" :class="aiEnabled ? 'text-green-400' : 'text-white'" />
            </button>

            <!-- Voice Control -->
            <button
              @click="toggleVoiceControl"
              :class="[
                'p-2 rounded-lg transition-all duration-300 cyber-button',
                voiceEnabled ? 'bg-purple-500/20 border-purple-500/30' : 'bg-white/10 border-white/20'
              ]"
              title="Voice Control"
              @mouseenter="playSound('hover')"
            >
              <Mic class="w-5 h-5" :class="voiceEnabled ? 'text-purple-400' : 'text-white'" />
            </button>

            <!-- Settings -->
            <button
              @click="showSettings = true"
              class="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors cyber-button"
              title="Settings"
              @mouseenter="playSound('hover')"
            >
              <Settings class="w-5 h-5 text-white" />
            </button>

            <!-- Refresh Button -->
            <button
              @click="refreshData"
              :disabled="loading"
              class="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors disabled:opacity-50 cyber-button"
              title="Refresh library"
              @mouseenter="playSound('hover')"
            >
              <RefreshCw :class="['w-5 h-5 text-white', { 'animate-spin': loading }]" />
            </button>

            <!-- Export Options -->
            <div class="relative">
              <button
                @click="showExportMenu = !showExportMenu"
                class="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/20 rounded-lg transition-colors cyber-button"
                title="Export data"
                @mouseenter="playSound('hover')"
              >
                <Download class="w-5 h-5 text-green-400" />
              </button>
              
              <div v-if="showExportMenu" class="absolute right-0 top-12 glass-card rounded-lg p-2 min-w-[120px]">
                <button @click="exportData('json')" class="block w-full text-left px-3 py-2 hover:bg-white/10 rounded text-white text-sm">
                  Export JSON
                </button>
                <button @click="exportData('csv')" class="block w-full text-left px-3 py-2 hover:bg-white/10 rounded text-white text-sm">
                  Export CSV
                </button>
              </div>
            </div>

            <!-- Share Button -->
            <button
              v-if="profile"
              @click="shareLibrary"
              class="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/20 rounded-lg transition-colors cyber-button"
              title="Share library"
              @mouseenter="playSound('hover')"
            >
              <Share2 class="w-5 h-5 text-blue-400" />
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8 relative z-10">
      <!-- Loading State with Enhanced Animation -->
      <div v-if="loading" class="flex flex-col items-center justify-center h-96">
        <div class="relative">
          <div class="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-400"></div>
          <div class="absolute inset-0 animate-ping rounded-full border border-blue-400 opacity-20"></div>
        </div>
        <p class="text-white text-lg mt-4 glow-text orbitron">{{ loadingMessages[currentLoadingMessage] }}</p>
        <div class="w-64 bg-white/10 rounded-full h-2 mt-4">
          <div class="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300" 
               :style="{ width: `${loadingProgress}%` }"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex justify-center">
        <div class="glass-card border border-red-500/20 rounded-xl p-8 max-w-md text-center">
          <AlertTriangle class="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 class="text-xl font-semibold text-white mb-2 orbitron">System Error</h2>
          <p class="text-red-200 mb-4">{{ error }}</p>
          <div class="space-y-2">
            <button @click="loadSteamData" class="cyber-button px-6 py-3 rounded-lg" @mouseenter="playSound('hover')">
              <RotateCcw class="w-4 h-4 inline mr-2" />
              Retry Connection
            </button>
            <div class="text-xs text-red-300 mt-2">
              Verify your .env credentials are configured correctly
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else-if="games.length > 0" class="space-y-8">
        <!-- Enhanced Statistics Dashboard -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="stat in enhancedStats" 
            :key="stat.id"
            class="stats-card glass-card rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer"
            @mouseenter="playSound('hover')"
            @click="showStatDetail(stat)"
          >
            <div class="flex items-center space-x-3 mb-3">
              <div class="p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                <component :is="stat.icon" class="w-6 h-6 text-blue-400" />
              </div>
              <h3 class="text-white font-semibold orbitron">{{ stat.title }}</h3>
            </div>
            
            <div class="space-y-2">
              <div class="text-3xl font-bold text-white glow-text">{{ stat.value }}</div>
              <div class="text-sm text-white/60">{{ stat.subtitle }}</div>
              <div v-if="stat.trend" class="text-xs text-blue-400 flex items-center space-x-1">
                <TrendingUp class="w-3 h-3" />
                <span>{{ stat.trend }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity Section -->
        <div v-if="recentGames.length > 0" class="glass-card rounded-xl p-6">
          <h3 class="text-xl font-bold text-white mb-4 flex items-center orbitron glow-text">
            <Activity class="w-5 h-5 mr-2 text-green-400" />
            Recent Gaming Activity
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              v-for="game in recentGames.slice(0, 6)" 
              :key="game.appid"
              class="flex items-center space-x-3 p-3 glass-card rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              @mouseenter="playSound('hover')"
            >
              <img 
                :src="getGameImage(game)" 
                :alt="game.name"
                class="w-12 h-12 rounded object-cover"
                @error="handleImageError"
              >
              <div class="flex-1 min-w-0">
                <h4 class="text-white font-medium text-sm truncate">{{ game.name }}</h4>
                <div class="flex items-center space-x-2 text-xs text-green-400">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>{{ formatPlaytime(game.playtime_2weeks || 0) }} recent</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Search and Filter -->
        <div class="glass-card rounded-xl p-6">
          <div class="flex flex-col lg:flex-row gap-4 mb-4">
            <div class="flex-1 relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="Search your arsenal... (Try voice search!)"
                class="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                @keyup="handleSearchShortcuts"
                @focus="playSound('click')"
              >
            </div>
            
            <div class="flex gap-3">
              <select
                v-model="sortBy"
                class="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                @change="playSound('click')"
              >
                <option value="playtime">Most Played</option>
                <option value="name">Alphabetical</option>
                <option value="recent">Recent Activity</option>
              </select>
              
              <select
                v-model="filterBy"
                class="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                @change="playSound('click')"
              >
                <option value="all">All Games</option>
                <option value="played">Played</option>
                <option value="unplayed">Unplayed</option>
                <option value="recent">Recent</option>
              </select>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="text-sm text-white/60">
              <span class="glow-text-purple">{{ filteredGames.length }}</span> of {{ games.length }} games
            </div>
            
            <div class="flex items-center space-x-2 text-sm text-white/60">
              <span>View:</span>
              <button 
                @click="viewMode = 'grid'; playSound('click')"
                :class="[
                  'px-3 py-1 rounded transition-all duration-300 flex items-center space-x-1',
                  viewMode === 'grid' ? 'cyber-button bg-blue-500/30 border-blue-500/30 text-blue-300' : 'cyber-button'
                ]"
                @mouseenter="playSound('hover')"
              >
                <Grid3X3 class="w-4 h-4" />
                <span>Grid</span>
              </button>
              <button 
                @click="viewMode = 'list'; playSound('click')"
                :class="[
                  'px-3 py-1 rounded transition-all duration-300 flex items-center space-x-1',
                  viewMode === 'list' ? 'cyber-button bg-blue-500/30 border-blue-500/30 text-blue-300' : 'cyber-button'
                ]"
                @mouseenter="playSound('hover')"
              >
                <List class="w-4 h-4" />
                <span>List</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Enhanced Games Display -->
        <div :class="getGridClasses()">
          <div
            v-for="game in paginatedGames"
            :key="game.appid"
            :class="getCardClasses()"
            @click="openGameModal(game)"
            @mouseenter="playSound('hover')"
          >
            <!-- Grid View -->
            <template v-if="viewMode === 'grid'">
              <!-- Game Image -->
              <div class="relative overflow-hidden rounded-t-xl">
                <img
                  :src="getGameImage(game)"
                  :alt="game.name"
                  class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  @error="handleImageError"
                  loading="lazy"
                >
                
                <!-- Playtime Badge -->
                <div class="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span class="text-white text-sm font-medium">{{ formatPlaytime(game.playtime_forever) }}</span>
                </div>

                <!-- Recent Activity -->
                <div v-if="game.playtime_2weeks" class="absolute bottom-4 left-4">
                  <div class="bg-green-500/90 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <div class="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                    {{ formatPlaytime(game.playtime_2weeks) }} recent
                  </div>
                </div>
              </div>
              
              <!-- Game Info -->
              <div class="p-5">
                <h3 class="text-white font-semibold text-lg mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors leading-tight glow-text">
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
                  <div v-if="maxPlaytime > 0 && game.playtime_forever > 0">
                    <div class="flex justify-between text-xs text-white/60 mb-1">
                      <span>Progress</span>
                      <span>{{ Math.round((game.playtime_forever / maxPlaytime) * 100) }}%</span>
                    </div>
                    <div class="w-full bg-white/10 rounded-full h-2">
                      <div
                        class="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        :style="{ width: `${Math.min((game.playtime_forever / maxPlaytime) * 100, 100)}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- List View -->
            <template v-else>
              <div class="flex items-center space-x-4 p-4">
                <img :src="getGameImage(game)" :alt="game.name" class="w-16 h-16 rounded object-cover">
                <div class="flex-1 min-w-0">
                  <h3 class="text-white font-semibold group-hover:text-blue-300 transition-colors truncate">{{ game.name }}</h3>
                  <div class="text-sm text-white/60 flex items-center space-x-4">
                    <span>{{ formatPlaytime(game.playtime_forever) }}</span>
                    <span v-if="game.playtime_2weeks">• {{ formatPlaytime(game.playtime_2weeks) }} recent</span>
                  </div>
                </div>
                <div class="text-right flex-shrink-0">
                  <div class="text-white font-medium">{{ Math.floor(game.playtime_forever / 60) }}h</div>
                  <div v-if="game.playtime_2weeks" class="text-xs text-green-400">Recent</div>
                </div>
              </div>
            </template>
          </div>
        </div>
        
        <!-- Load More Button -->
        <div v-if="hasMoreGames" class="text-center">
          <button
            @click="loadMore"
            class="cyber-button px-8 py-4 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300"
            @mouseenter="playSound('hover')"
          >
            <Zap class="w-4 h-4 inline mr-2" />
            Load More Games ({{ remainingGames }} remaining)
          </button>
        </div>

        <!-- Floating Action Button -->
        <div class="fixed bottom-8 right-8 z-40">
          <div class="flex flex-col space-y-3">
            <button
              v-if="!loading"
              @click="randomGame"
              class="w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              title="Random game suggestion"
              @mouseenter="playSound('hover')"
            >
              <Shuffle class="w-6 h-6 text-white" />
            </button>
            
            <button
              @click="scrollToTop"
              class="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              title="Scroll to top"
              @mouseenter="playSound('hover')"
            >
              <ChevronUp class="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// Icons
import { 
  RefreshCw, AlertTriangle, Search, Clock, Package, Trophy, BarChart3, Download,
  Share2, Activity, Grid3X3, List, Settings, Bot, Mic, RotateCcw, Zap, 
  Shuffle, ChevronUp, TrendingUp
} from 'lucide-vue-next'

// Environment Variables
const STEAM_API_KEY = import.meta.env.VITE_STEAM_API_KEY
const STEAM_ID = import.meta.env.VITE_STEAM_ID

// Core State
const games = ref([])
const profile = ref(null)
const loading = ref(false)
const error = ref(null)

// UI State
const searchQuery = ref('')
const sortBy = ref('playtime')
const filterBy = ref('all')
const displayCount = ref(20)
const viewMode = ref('grid')
const particleCount = ref(50)

// Advanced Features State
const aiEnabled = ref(false)
const voiceEnabled = ref(false)
const showSettings = ref(false)
const showExportMenu = ref(false)

// Loading Animation
const loadingMessages = [
  'Connecting to Steam Network...',
  'Analyzing Gaming Data...',
  'Processing Achievements...',
  'Loading Game Library...',
  'Finalizing Display...'
]
const currentLoadingMessage = ref(0)
const loadingProgress = ref(0)

// Settings
const appSettings = ref({
  theme: 'cyber',
  enableSounds: true,
  audioVolume: 0.3,
  enableAnimations: true,
  particleCount: 50,
  autoRefresh: false,
  notifications: true
})

// Web Audio API Implementation
let audioContext = null

const initAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }
}

const createBeepSound = (frequency, duration, volume, type = 'sine') => {
  if (!appSettings.value.enableSounds) return
  
  try {
    initAudioContext()
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    const filterNode = audioContext.createBiquadFilter()
    
    oscillator.connect(filterNode)
    filterNode.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    oscillator.type = type
    
    filterNode.type = 'lowpass'
    filterNode.frequency.setValueAtTime(frequency * 2, audioContext.currentTime)
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration)
  } catch (error) {
    console.warn('Audio playback failed:', error)
  }
}

const playSound = (soundType) => {
  if (!appSettings.value.enableSounds) return
  
  const sounds = {
    hover: () => createBeepSound(800, 0.1, 0.05, 'sine'),
    click: () => createBeepSound(1000, 0.15, 0.1, 'square'),
    success: () => {
      createBeepSound(523, 0.2, 0.1, 'sine')
      setTimeout(() => createBeepSound(659, 0.2, 0.08, 'sine'), 100)
      setTimeout(() => createBeepSound(784, 0.3, 0.1, 'sine'), 200)
    },
    error: () => createBeepSound(300, 0.4, 0.1, 'sawtooth'),
    notification: () => {
      createBeepSound(880, 0.3, 0.08, 'sine')
      setTimeout(() => createBeepSound(1108, 0.3, 0.06, 'sine'), 150)
    }
  }
  
  if (sounds[soundType]) {
    sounds[soundType]()
  }
}

// API Service
const corsProxy = 'https://api.allorigins.win/get?url='

const formatPlaytime = (minutes) => {
  if (minutes === 0) return 'Never played'
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  if (days > 0) return `${days}d ${hours % 24}h`
  if (hours === 0) return `${minutes}m`
  return `${hours}h`
}

const getGameImage = (game) => {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/460x215/1a202c/4299e1?text=Game+Image'
}

// Computed Properties
const totalPlaytimeMinutes = computed(() => {
  return games.value.reduce((sum, game) => sum + game.playtime_forever, 0)
})

const totalPlaytime = computed(() => {
  return formatPlaytime(totalPlaytimeMinutes.value)
})

const totalHours = computed(() => {
  return Math.floor(totalPlaytimeMinutes.value / 60)
})

const playerLevel = computed(() => {
  const xp = (totalHours.value * 10) + (games.value.length * 50)
  const level = Math.floor(xp / 1000) + 1
  
  const levelTitles = {
    1: "Novice Gamer",
    5: "Gaming Enthusiast", 
    10: "Dedicated Player",
    20: "Gaming Veteran",
    50: "Steam Legend"
  }
  
  const title = Object.keys(levelTitles)
    .reverse()
    .find(l => level >= parseInt(l))
  
  return { 
    level, 
    title: levelTitles[title] || "Steam Master"
  }
})

const enhancedStats = computed(() => [
  {
    id: 'games',
    title: 'Game Arsenal',
    value: games.value.length,
    subtitle: 'Total Games',
    icon: Package,
    trend: '+5 this month'
  },
  {
    id: 'playtime', 
    title: 'Battle Time',
    value: totalPlaytime.value,
    subtitle: 'Epic Sessions',
    icon: Clock,
    trend: `${totalHours.value}+ hours`
  },
  {
    id: 'achievements',
    title: 'Victories',
    value: Math.floor(games.value.length * 0.7),
    subtitle: 'Achievements',
    icon: Trophy,
    trend: '89% completion'
  },
  {
    id: 'level',
    title: 'Gamer Level',
    value: playerLevel.value.level,
    subtitle: playerLevel.value.title,
    icon: BarChart3,
    trend: 'Elite Status'
  }
])

const recentGames = computed(() => {
  return games.value.filter(game => game.playtime_2weeks && game.playtime_2weeks > 0)
    .sort((a, b) => (b.playtime_2weeks || 0) - (a.playtime_2weeks || 0))
})

const filteredGames = computed(() => {
  let filtered = games.value

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(game => game.name.toLowerCase().includes(query))
  }

  switch (filterBy.value) {
    case 'played':
      filtered = filtered.filter(game => game.playtime_forever > 0)
      break
    case 'unplayed':
      filtered = filtered.filter(game => game.playtime_forever === 0)
      break
    case 'recent':
      filtered = filtered.filter(game => game.playtime_2weeks && game.playtime_2weeks > 0)
      break
  }

  return filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'playtime': return b.playtime_forever - a.playtime_forever
      case 'name': return a.name.localeCompare(b.name)
      case 'recent': return (b.playtime_2weeks || 0) - (a.playtime_2weeks || 0)
      default: return 0
    }
  })
})

const paginatedGames = computed(() => {
  return filteredGames.value.slice(0, displayCount.value)
})

const hasMoreGames = computed(() => {
  return displayCount.value < filteredGames.value.length
})

const remainingGames = computed(() => {
  return filteredGames.value.length - displayCount.value
})

const maxPlaytime = computed(() => {
  return Math.max(...games.value.map(game => game.playtime_forever), 0)
})

// Methods
const getGridClasses = () => {
  const baseClasses = {
    grid: 'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    list: 'space-y-4'
  }
  return baseClasses[viewMode.value] || baseClasses.grid
}

const getCardClasses = () => {
  const baseClasses = 'game-card-3d group cursor-pointer transition-all duration-300'
  
  switch (viewMode.value) {
    case 'grid':
      return `${baseClasses} glass-card rounded-xl overflow-hidden hover:shadow-2xl hover:scale-[1.02]`
    case 'list':
      return `${baseClasses} glass-card rounded-xl hover:bg-white/10`
    default:
      return baseClasses
  }
}

const getParticleStyle = (index) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 6
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`
  }
}

const loadSteamData = async () => {
  if (!STEAM_API_KEY || !STEAM_ID) {
    error.value = 'Missing Steam API credentials. Check your .env file.'
    return
  }

  loading.value = true
  error.value = null
  loadingProgress.value = 0

  const progressInterval = setInterval(() => {
    loadingProgress.value += Math.random() * 15
    if (loadingProgress.value >= 90) {
      clearInterval(progressInterval)
    }
  }, 200)

  const messageInterval = setInterval(() => {
    currentLoadingMessage.value = (currentLoadingMessage.value + 1) % loadingMessages.length
  }, 1000)

  try {
    const [gamesResponse, profileResponse] = await Promise.all([
      axios.get(`${corsProxy}${encodeURIComponent(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json&include_appinfo=1&include_played_free_games=1`
      )}`),
      axios.get(`${corsProxy}${encodeURIComponent(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`
      )}`)
    ])

    const gamesData = JSON.parse(gamesResponse.data.contents)
    const profileData = JSON.parse(profileResponse.data.contents)

    games.value = (gamesData.response?.games || []).sort((a, b) => b.playtime_forever - a.playtime_forever)
    profile.value = profileData.response?.players?.[0] || null

    loadingProgress.value = 100
    playSound('success')

  } catch (err) {
    error.value = 'Failed to load Steam data. Check your credentials and connection.'
    console.error('Steam API error:', err)
    playSound('error')
  } finally {
    clearInterval(progressInterval)
    clearInterval(messageInterval)
    loading.value = false
    loadingProgress.value = 0
  }
}

const refreshData = () => {
  playSound('click')
  loadSteamData()
}

const loadMore = () => {
  playSound('click')
  displayCount.value += 20
}

const openGameModal = (game) => {
  playSound('click')
  console.log('Opening game modal for:', game.name)
}

const randomGame = () => {
  const unplayedGames = games.value.filter(game => game.playtime_forever === 0)
  if (unplayedGames.length > 0) {
    const randomGame = unplayedGames[Math.floor(Math.random() * unplayedGames.length)]
    console.log(`Random suggestion: ${randomGame.name}`)
    playSound('notification')
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  playSound('click')
}

const toggleAI = () => {
  aiEnabled.value = !aiEnabled.value
  playSound('click')
}

const toggleVoiceControl = () => {
  voiceEnabled.value = !voiceEnabled.value
  playSound('click')
}

const shareLibrary = async () => {
  const shareData = {
    title: `${profile.value?.personaname || 'My'} Steam Arsenal`,
    text: `Check out my Steam library: ${games.value.length} games, ${totalHours.value}+ hours!`,
    url: window.location.href
  }

  if (navigator.share) {
    try {
      await navigator.share(shareData)
      playSound('success')
    } catch (err) {
      console.log('Share cancelled')
    }
  } else {
    try {
      await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`)
      playSound('success')
    } catch (err) {
      console.log('Copy failed')
    }
  }
}

const exportData = (format) => {
  playSound('click')
  showExportMenu.value = false
  
  const data = {
    profile: profile.value,
    games: games.value,
    exportDate: new Date().toISOString()
  }
  
  if (format === 'json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `steam-library-${profile.value?.personaname || 'export'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }
  
  playSound('success')
}

const showStatDetail = (stat) => {
  playSound('click')
  console.log('Showing stat detail for:', stat.title)
}

const handleSearchShortcuts = (event) => {
  if (event.ctrlKey || event.metaKey) {
    if (event.key === 'k') {
      event.preventDefault()
      searchInput.value?.focus()
    }
  }
}

// Initialize audio on user interaction
const initializeAudio = () => {
  document.addEventListener('click', () => {
    initAudioContext()
  }, { once: true })
}

// Lifecycle
onMounted(() => {
  loadSteamData()
  initializeAudio()
  
  const savedSettings = localStorage.getItem('steamShowcaseSettings')
  if (savedSettings) {
    appSettings.value = { ...appSettings.value, ...JSON.parse(savedSettings) }
  }
})
</script>
