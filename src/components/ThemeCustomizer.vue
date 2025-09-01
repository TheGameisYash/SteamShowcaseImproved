<template>
  <Teleport to="body">
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="glass-card rounded-2xl p-6 max-w-md w-full">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-white orbitron">Theme Customizer</h2>
          <button @click="$emit('close')" class="text-white/60 hover:text-white">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="space-y-6">
          <!-- Theme Presets -->
          <div>
            <h3 class="text-white font-semibold mb-3">Presets</h3>
            <div class="grid grid-cols-2 gap-3">
              <button 
                v-for="preset in themePresets" 
                :key="preset.name"
                @click="applyPreset(preset)"
                class="p-3 glass-card rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <div class="flex space-x-2 mb-2">
                  <div 
                    v-for="color in preset.colors" 
                    :key="color"
                    class="w-4 h-4 rounded-full"
                    :style="{ backgroundColor: color }"
                  ></div>
                </div>
                <div class="text-white text-sm font-medium">{{ preset.name }}</div>
              </button>
            </div>
          </div>
          
          <!-- Custom Colors -->
          <div>
            <h3 class="text-white font-semibold mb-3">Custom Colors</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-white/70 text-sm mb-2">Primary Color</label>
                <input 
                  type="color" 
                  v-model="customTheme.primary"
                  class="w-full h-10 rounded border-none bg-transparent"
                >
              </div>
              <div>
                <label class="block text-white/70 text-sm mb-2">Secondary Color</label>
                <input 
                  type="color" 
                  v-model="customTheme.secondary"
                  class="w-full h-10 rounded border-none bg-transparent"
                >
              </div>
            </div>
          </div>
          
          <div class="flex space-x-3">
            <button 
              @click="applyCustomTheme"
              class="flex-1 cyber-button py-3 rounded-lg font-semibold"
            >
              Apply Theme
            </button>
            <button 
              @click="resetTheme"
              class="px-4 py-3 glass-card rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { X } from 'lucide-vue-next'

defineEmits(['close', 'theme-changed'])

const themePresets = [
  { name: 'Cyber Blue', colors: ['#3b82f6', '#8b5cf6'] },
  { name: 'Neon Pink', colors: ['#ec4899', '#f97316'] },
  { name: 'Matrix Green', colors: ['#10b981', '#22c55e'] },
  { name: 'Gaming Red', colors: ['#ef4444', '#dc2626'] }
]

const customTheme = ref({
  primary: '#3b82f6',
  secondary: '#8b5cf6'
})

const applyPreset = (preset) => {
  console.log('Apply preset:', preset)
}

const applyCustomTheme = () => {
  console.log('Apply custom theme:', customTheme.value)
}

const resetTheme = () => {
  customTheme.value = { primary: '#3b82f6', secondary: '#8b5cf6' }
}
</script>
