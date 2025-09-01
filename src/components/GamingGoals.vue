<template>
  <div class="glass-card rounded-xl p-6 mb-8">
    <h3 class="text-xl font-bold text-white mb-4 flex items-center orbitron glow-text">
      <Target class="w-5 h-5 mr-2 text-green-400" />
      Gaming Goals
    </h3>
    
    <div class="space-y-6">
      <!-- Weekly Goal -->
      <div class="goal-card">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-2">
            <Calendar class="w-4 h-4 text-green-400" />
            <span class="text-white font-medium">Weekly Playtime Goal</span>
          </div>
          <span class="text-sm text-white/60">{{ currentWeeklyHours }}h / {{ weeklyGoal }}h</span>
        </div>
        
        <div class="relative">
          <div class="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <div 
              class="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out relative"
              :style="{ width: `${Math.min(weeklyProgress, 100)}%` }"
            >
              <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <div class="absolute -top-6 left-0 text-xs text-green-400 font-medium" 
               :style="{ left: `${Math.min(weeklyProgress, 95)}%` }">
            {{ weeklyProgress }}%
          </div>
        </div>
        
        <div class="flex items-center justify-between mt-2 text-xs">
          <span :class="weeklyProgress >= 100 ? 'text-green-400' : 'text-white/50'">
            {{ weeklyProgress >= 100 ? '🎉 Goal achieved!' : `${weeklyGoal - currentWeeklyHours}h remaining` }}
          </span>
          <span class="text-white/40">Resets in {{ daysUntilWeekReset }} days</span>
        </div>
      </div>

      <!-- Monthly Challenge -->
      <div class="goal-card">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-2">
            <Trophy class="w-4 h-4 text-purple-400" />
            <span class="text-white font-medium">Monthly Challenge</span>
          </div>
          <span class="text-sm text-purple-400">{{ newGamesThisMonth }}/5 completed</span>
        </div>
        
        <div class="flex space-x-1 mb-2">
          <div 
            v-for="n in 5" 
            :key="n"
            :class="[
              'flex-1 h-2 rounded-full transition-all duration-500',
              n <= newGamesThisMonth 
                ? 'bg-gradient-to-r from-purple-400 to-pink-500' 
                : 'bg-white/20'
            ]"
          ></div>
        </div>
        
        <div class="text-xs text-white/60">
          Try 5 new games this month
        </div>
      </div>

      <!-- Gaming Streak -->
      <div class="goal-card">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-2">
            <Flame class="w-4 h-4 text-orange-400" />
            <span class="text-white font-medium">Gaming Streak</span>
          </div>
          <span class="text-sm text-orange-400">{{ gamingStreak }} days</span>
        </div>
        
        <div class="grid grid-cols-10 gap-1 mb-2">
          <div 
            v-for="day in 30" 
            :key="day"
            :class="[
              'aspect-square rounded-sm transition-all duration-300 cursor-pointer',
              day <= gamingStreak 
                ? 'bg-gradient-to-br from-orange-400 to-red-500 hover:scale-125' 
                : 'bg-white/20 hover:bg-white/30'
            ]"
            :title="day <= gamingStreak ? `Day ${day} - Gaming day!` : `Day ${day} - No activity`"
          ></div>
        </div>
        
        <div class="flex items-center justify-between text-xs">
          <span class="text-orange-400">
            {{ gamingStreak > 7 ? '🔥 On fire!' : gamingStreak > 3 ? '⚡ Great streak!' : '📈 Keep going!' }}
          </span>
          <span class="text-white/40">Longest: {{ longestStreak }} days</span>
        </div>
      </div>

      <!-- Achievement Progress -->
      <div class="goal-card">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-2">
            <Star class="w-4 h-4 text-yellow-400" />
            <span class="text-white font-medium">Achievement Hunter</span>
          </div>
          <span class="text-sm text-yellow-400">{{ achievementProgress }}%</span>
        </div>
        
        <div class="space-y-2">
          <div class="w-full bg-white/10 rounded-full h-2">
            <div 
              class="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-1000"
              :style="{ width: `${achievementProgress}%` }"
            ></div>
          </div>
          
          <div class="text-xs text-white/60">
            Complete achievements across your game library
          </div>
        </div>
      </div>

      <!-- Custom Goal -->
      <div class="goal-card border border-dashed border-white/20 hover:border-blue-400/50 transition-colors cursor-pointer"
           @click="showCustomGoalModal = true">
        <div class="flex items-center justify-center space-x-2 py-4">
          <Plus class="w-5 h-5 text-blue-400" />
          <span class="text-blue-400 font-medium">Add Custom Goal</span>
        </div>
      </div>
    </div>
    
    <!-- Goal Summary -->
    <div class="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
      <div>
        <div class="text-lg font-bold text-green-400">{{ completedGoals }}</div>
        <div class="text-xs text-white/60">Completed</div>
      </div>
      <div>
        <div class="text-lg font-bold text-blue-400">{{ activeGoals }}</div>
        <div class="text-xs text-white/60">Active</div>
      </div>
      <div>
        <div class="text-lg font-bold text-purple-400">{{ totalXP }}</div>
        <div class="text-xs text-white/60">Goal XP</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Target, Calendar, Trophy, Flame, Star, Plus } from 'lucide-vue-next'

const props = defineProps({
  totalPlaytime: { type: Number, required: true },
  recentGames: { type: Array, required: true }
})

const showCustomGoalModal = ref(false)

// Goal settings
const weeklyGoal = 20 // hours
const longestStreak = 45 // days

const currentWeeklyHours = computed(() => {
  const recentMinutes = props.recentGames.reduce((sum, game) => sum + (game.playtime_2weeks || 0), 0)
  return Math.floor(recentMinutes / 60)
})

const weeklyProgress = computed(() => {
  return Math.round((currentWeeklyHours.value / weeklyGoal) * 100)
})

const daysUntilWeekReset = computed(() => {
  const now = new Date()
  const sunday = new Date(now)
  sunday.setDate(now.getDate() - now.getDay() + 7)
  return Math.ceil((sunday - now) / (1000 * 60 * 60 * 24))
})

const gamingStreak = computed(() => {
  return Math.min(props.recentGames.length > 0 ? 15 : 0, 30)
})

const newGamesThisMonth = computed(() => {
  return Math.min(props.recentGames.filter(game => (game.playtime_2weeks || 0) > 0).length, 5)
})

const achievementProgress = computed(() => {
  return Math.floor(Math.random() * 30) + 60 // Mock achievement progress
})

const completedGoals = computed(() => {
  let completed = 0
  if (weeklyProgress.value >= 100) completed++
  if (newGamesThisMonth.value >= 5) completed++
  if (gamingStreak.value >= 7) completed++
  return completed
})

const activeGoals = 4 // Total number of active goals

const totalXP = computed(() => {
  return completedGoals.value * 250 + (gamingStreak.value * 10)
})
</script>

<style scoped>
.goal-card {
  @apply glass-card p-4 rounded-lg hover:bg-white/10 transition-all duration-300;
}
</style>
