<template>
  <Teleport to="body">
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="glass-card rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-white orbitron">Settings</h2>
          <button @click="$emit('close')" class="text-white/60 hover:text-white">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="space-y-6">
          <!-- Audio Settings -->
          <div>
            <h3 class="text-white font-semibold mb-3 flex items-center">
              <Volume2 class="w-4 h-4 mr-2" />
              Audio
            </h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-white/70">Sound Effects</span>
                <input 
                  type="checkbox" 
                  v-model="localSettings.enableSounds"
                  class="toggle"
                >
              </div>
              <div class="flex items-center justify-between">
                <span class="text-white/70">Volume</span>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1"
                  v-model="localSettings.audioVolume"
                  class="w-20 accent-blue-500"
                >
              </div>
            </div>
          </div>
          
          <!-- Visual Settings -->
          <div>
            <h3 class="text-white font-semibold mb-3 flex items-center">
              <Eye class="w-4 h-4 mr-2" />
              Visual
            </h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-white/70">Animations</span>
                <input 
                  type="checkbox" 
                  v-model="localSettings.enableAnimations"
                  class="toggle"
                >
              </div>
              <div class="flex items-center justify-between">
                <span class="text-white/70">Particles</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  v-model="localSettings.particleCount"
                  class="w-20 accent-blue-500"
                >
              </div>
            </div>
          </div>
          
          <!-- Privacy Settings -->
          <div>
            <h3 class="text-white font-semibold mb-3 flex items-center">
              <Shield class="w-4 h-4 mr-2" />
              Privacy
            </h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-white/70">Auto Refresh</span>
                <input 
                  type="checkbox" 
                  v-model="localSettings.autoRefresh"
                  class="toggle"
                >
              </div>
              <div class="flex items-center justify-between">
                <span class="text-white/70">Notifications</span>
                <input 
                  type="checkbox" 
                  v-model="localSettings.notifications"
                  class="toggle"
                >
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex space-x-3 mt-6 pt-4 border-t border-white/10">
          <button 
            @click="saveSettings"
            class="flex-1 cyber-button py-3 rounded-lg font-semibold"
          >
            Save Settings
          </button>
          <button 
            @click="resetSettings"
            class="px-4 py-3 glass-card rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { X, Volume2, Eye, Shield } from 'lucide-vue-next'

const props = defineProps({
  settings: { type: Object, required: true }
})

const emit = defineEmits(['close', 'settings-changed'])

const localSettings = ref({ ...props.settings })

const saveSettings = () => {
  emit('settings-changed', localSettings.value)
  emit('close')
}

const resetSettings = () => {
  localSettings.value = {
    theme: 'cyber',
    enableSounds: true,
    audioVolume: 0.3,
    enableAnimations: true,
    particleCount: 50,
    autoRefresh: false,
    notifications: true
  }
}
</script>

<style scoped>
.toggle {
  appearance: none;
  width: 3rem;
  height: 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
}

.toggle:checked {
  background: #3b82f6;
}

.toggle::before {
  content: '';
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: white;
  top: 0.125rem;
  left: 0.125rem;
  transition: transform 0.3s;
}

.toggle:checked::before {
  transform: translateX(1.5rem);
}
</style>
