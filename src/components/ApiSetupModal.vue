<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-slate-800/95 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Key class="w-8 h-8 text-white" />
        </div>
        <h2 class="text-2xl font-bold text-white mb-2">Steam API Setup</h2>
        <p class="text-white/70">Configure your Steam credentials to view your game library</p>
      </div>
      
      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- API Key Input -->
        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">
            Steam API Key
            <span class="text-red-400">*</span>
          </label>
          <input
            v-model="apiKey"
            type="password"
            placeholder="Enter your Steam API key"
            class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
            required
          >
          <p class="text-xs text-white/60 mt-2 flex items-center">
            <ExternalLink class="w-3 h-3 mr-1" />
            Get your key from 
            <a href="https://steamcommunity.com/dev/apikey" target="_blank" class="text-blue-400 hover:text-blue-300 ml-1 underline">
              Steam Web API
            </a>
          </p>
        </div>
        
        <!-- Steam ID Input -->
        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">
            Steam ID (64-bit)
            <span class="text-red-400">*</span>
          </label>
          <input
            v-model="steamId"
            type="text"
            placeholder="Your 17-digit Steam ID"
            class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
            required
          >
          <p class="text-xs text-white/60 mt-2 flex items-center">
            <ExternalLink class="w-3 h-3 mr-1" />
            Find your ID at 
            <a href="https://steamid.io/" target="_blank" class="text-blue-400 hover:text-blue-300 ml-1 underline">
              steamid.io
            </a>
          </p>
        </div>
        
        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="!apiKey || !steamId || loading"
          class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
        >
          <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
          <span v-else>Save & Load Library</span>
        </button>
      </form>
      
      <!-- Privacy Notice -->
      <div class="mt-6 p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
        <div class="flex items-start space-x-3">
          <Shield class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div class="text-sm">
            <p class="font-medium text-blue-200 mb-1">Privacy Notice</p>
            <p class="text-xs text-blue-200/80">
              Your credentials are stored locally in your browser and only used to fetch data from Steam's official API.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Key, ExternalLink, Loader2, Shield } from 'lucide-vue-next'

interface Props {
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  submit: [{ apiKey: string; steamId: string }]
}>()

const apiKey = ref('')
const steamId = ref('')

const handleSubmit = () => {
  if (apiKey.value && steamId.value) {
    emit('submit', { apiKey: apiKey.value, steamId: steamId.value })
  }
}
</script>
