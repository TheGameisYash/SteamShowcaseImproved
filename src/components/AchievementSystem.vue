<template>
  <div class="glass-card rounded-xl p-6 mb-8">
    <h3 class="text-xl font-bold text-white mb-4 flex items-center orbitron glow-text">
      <Award class="w-5 h-5 mr-2 text-yellow-400" />
      Achievement System
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="achievement in achievements" 
        :key="achievement.id"
        :class="[
          'border rounded-xl p-4 transition-all duration-300 cursor-pointer',
          achievement.unlocked 
            ? 'glass-card border-yellow-500/30 hover:border-yellow-500/50' 
            : 'glass-card border-white/10 hover:border-white/20'
        ]"
        @click="achievement.unlocked && showAchievementDetails(achievement)"
      >
        <div class="flex items-start space-x-3">
          <div :class="[
            'p-3 rounded-full flex-shrink-0',
            achievement.unlocked ? 'bg-yellow-500/20' : 'bg-white/10'
          ]">
            <component 
              :is="achievement.icon" 
              :class="[
                'w-6 h-6',
                achievement.unlocked ? 'text-yellow-400' : 'text-white/40'
              ]" 
            />
          </div>
          
          <div class="flex-1">
            <h4 :class="[
              'font-semibold mb-1',
              achievement.unlocked ? 'text-yellow-200 glow-text' : 'text-white/60'
            ]">
              {{ achievement.name }}
            </h4>
            <p class="text-sm text-white/70 mb-2">{{ achievement.description }}</p>
            
            <!-- Achievement Rewards -->
            <div v-if="achievement.unlocked" class="space-y-2">
              <div class="achievement-badge">
                <Trophy class="w-3 h-3 mr-1" />
                Unlocked!
              </div>
              <div class="text-xs text-yellow-300">
                +{{ achievement.xp }} XP • {{ formatDate(achievement.unlockedDate) }}
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div v-if="!achievement.unlocked && achievement.progress !== undefined" class="mt-3">
              <div class="flex justify-between text-xs text-white/60 mb-1">
                <span>Progress</span>
                <span>{{ achievement.progress }}%</span>
              </div>
              <div class="w-full bg-white/10 rounded-full h-2">
                <div 
                  class="bg-gradient-to-r from-blue-400 to-yellow-500 h-2 rounded-full transition-all duration-1000"
                  :style="{ width: `${achievement.progress}%` }"
                ></div>
              </div>
              <div class="text-xs text-white/50 mt-1">
                {{ achievement.progressText }}
              </div>
            </div>
            
            <!-- Rarity Badge -->
            <div v-if="achievement.rarity" class="mt-2">
              <span :class="[
                'text-xs px-2 py-1 rounded-full',
                getRarityClasses(achievement.rarity)
              ]">
                {{ achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Achievement Summary -->
    <div class="mt-6 pt-4 border-t border-white/10">
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <div class="text-2xl font-bold text-yellow-400">{{ unlockedCount }}</div>
          <div class="text-sm text-white/60">Unlocked</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-blue-400">{{ totalXP }}</div>
          <div class="text-sm text-white/60">Total XP</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-purple-400">{{ completionRate }}%</div>
          <div class="text-sm text-white/60">Complete</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Award, Trophy, Clock, Star, Zap, Target, Users, Crown } from 'lucide-vue-next'

const props = defineProps({
  games: { type: Array, required: true },
  totalPlaytime: { type: Number, required: true },
  profile: { type: Object, required: true }
})

const achievements = computed(() => {
  const totalHours = Math.floor(props.totalPlaytime / 60)
  const gameCount = props.games.length
  const mostPlayedHours = Math.floor((props.games[0]?.playtime_forever || 0) / 60)
  
  return [
    {
      id: 1,
      name: "Gaming Enthusiast",
      description: "Play for 100+ total hours",
      icon: Clock,
      unlocked: totalHours >= 100,
      progress: totalHours < 100 ? Math.min((totalHours / 100) * 100, 99) : 100,
      progressText: totalHours < 100 ? `${totalHours}/100 hours played` : 'Complete!',
      xp: 500,
      rarity: 'common',
      unlockedDate: totalHours >= 100 ? new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000) : null
    },
    {
      id: 2,
      name: "Collector Supreme",
      description: "Own 50+ games in your library",
      icon: Star,
      unlocked: gameCount >= 50,
      progress: gameCount < 50 ? Math.min((gameCount / 50) * 100, 99) : 100,
      progressText: gameCount < 50 ? `${gameCount}/50 games owned` : 'Complete!',
      xp: 750,
      rarity: 'uncommon',
      unlockedDate: gameCount >= 50 ? new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000) : null
    },
    {
      id: 3,
      name: "Dedication Master",
      description: "Spend 200+ hours in a single game",
      icon: Target,
      unlocked: mostPlayedHours >= 200,
      progress: mostPlayedHours < 200 ? Math.min((mostPlayedHours / 200) * 100, 99) : 100,
      progressText: mostPlayedHours < 200 ? `${mostPlayedHours}/200 hours in top game` : 'Complete!',
      xp: 1000,
      rarity: 'rare',
      unlockedDate: mostPlayedHours >= 200 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) : null
    },
    {
      id: 4,
      name: "Speed Demon",
      description: "Complete 10+ games quickly",
      icon: Zap,
      unlocked: false,
      progress: 65,
      progressText: '6/10 games completed quickly',
      xp: 800,
      rarity: 'uncommon'
    },
    {
      id: 5,
      name: "Night Warrior",
      description: "Play games after midnight regularly",
      icon: Crown,
      unlocked: true,
      xp: 600,
      rarity: 'rare',
      unlockedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
    },
    {
      id: 6,
      name: "Gaming Legend",
      description: "Reach 1000+ total gaming hours",
      icon: Award,
      unlocked: totalHours >= 1000,
      progress: totalHours < 1000 ? Math.min((totalHours / 1000) * 100, 99) : 100,
      progressText: totalHours < 1000 ? `${totalHours}/1000 hours played` : 'Complete!',
      xp: 2000,
      rarity: 'legendary',
      unlockedDate: totalHours >= 1000 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : null
    }
  ]
})

const unlockedCount = computed(() => {
  return achievements.value.filter(achievement => achievement.unlocked).length
})

const totalXP = computed(() => {
  return achievements.value
    .filter(achievement => achievement.unlocked)
    .reduce((sum, achievement) => sum + achievement.xp, 0)
})

const completionRate = computed(() => {
  return Math.round((unlockedCount.value / achievements.value.length) * 100)
})

const getRarityClasses = (rarity) => {
  const rarityClasses = {
    common: 'bg-gray-500/20 text-gray-300',
    uncommon: 'bg-green-500/20 text-green-300',
    rare: 'bg-blue-500/20 text-blue-300',
    epic: 'bg-purple-500/20 text-purple-300',
    legendary: 'bg-yellow-500/20 text-yellow-300'
  }
  return rarityClasses[rarity] || rarityClasses.common
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric'
  })
}

const showAchievementDetails = (achievement) => {
  // Show detailed achievement modal
  console.log('Show achievement details:', achievement)
}
</script>
