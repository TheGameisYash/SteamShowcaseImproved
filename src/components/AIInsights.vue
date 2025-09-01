<template>
  <div class="glass-card rounded-xl p-6 mb-8">
    <h3 class="text-xl font-bold text-white mb-4 flex items-center orbitron glow-text">
      <Brain class="w-5 h-5 mr-2 text-purple-400" />
      AI Gaming Insights
    </h3>
    
    <div class="space-y-4">
      <div 
        v-for="insight in insights" 
        :key="insight.type"
        class="p-4 glass-card rounded-lg hover:bg-white/10 transition-colors"
      >
        <div class="flex items-start space-x-3">
          <div :class="getInsightIconClasses(insight.type)">
            <component :is="getInsightIcon(insight.type)" class="w-5 h-5" />
          </div>
          <div class="flex-1">
            <h4 class="text-white font-semibold mb-1">{{ insight.title }}</h4>
            <p class="text-white/70 text-sm mb-2">{{ insight.content }}</p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-white/50">
                AI Confidence: {{ insight.confidence }}%
              </span>
              <div class="w-16 bg-white/10 rounded-full h-1">
                <div 
                  class="bg-gradient-to-r from-purple-400 to-blue-500 h-1 rounded-full"
                  :style="{ width: `${insight.confidence}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Brain, Target, Trophy, TrendingUp, Gamepad2 } from 'lucide-vue-next'

defineProps({
  insights: { type: Array, required: true }
})

const getInsightIcon = (type) => {
  const icons = {
    recommendation: Target,
    achievement: Trophy,
    habit: TrendingUp,
    gaming: Gamepad2
  }
  return icons[type] || Brain
}

const getInsightIconClasses = (type) => {
  const classes = {
    recommendation: 'p-2 bg-blue-500/20 rounded-lg',
    achievement: 'p-2 bg-yellow-500/20 rounded-lg',
    habit: 'p-2 bg-green-500/20 rounded-lg',
    gaming: 'p-2 bg-purple-500/20 rounded-lg'
  }
  return classes[type] || 'p-2 bg-purple-500/20 rounded-lg'
}
</script>
