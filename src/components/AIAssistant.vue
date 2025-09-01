<template>
  <div class="fixed bottom-4 right-20 w-80 glass-card rounded-xl p-4 z-50">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center space-x-2">
        <Bot class="w-5 h-5 text-blue-400" />
        <span class="text-white font-semibold">AI Gaming Assistant</span>
      </div>
      <button @click="$emit('close')" class="text-white/60 hover:text-white">
        <X class="w-4 h-4" />
      </button>
    </div>
    
    <div class="space-y-3 max-h-60 overflow-y-auto">
      <div v-for="message in messages" :key="message.id" 
           :class="['p-3 rounded-lg', message.type === 'ai' ? 'bg-blue-500/20' : 'bg-green-500/20']">
        <p class="text-white text-sm">{{ message.content }}</p>
      </div>
    </div>
    
    <div class="mt-3 flex space-x-2">
      <input 
        v-model="userInput" 
        @keyup.enter="sendMessage"
        placeholder="Ask about your games..."
        class="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/60"
      >
      <button @click="sendMessage" class="cyber-button px-4 py-2 rounded">
        <Send class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Bot, X, Send } from 'lucide-vue-next'

defineProps({
  games: Array,
  profile: Object
})

defineEmits(['close'])

const messages = ref([
  { id: 1, type: 'ai', content: 'Hi! I can help you with game recommendations and library insights.' }
])

const userInput = ref('')

const sendMessage = () => {
  if (!userInput.value.trim()) return
  
  messages.value.push({
    id: Date.now(),
    type: 'user',
    content: userInput.value
  })
  
  // Simulate AI response
  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      type: 'ai', 
      content: 'Based on your playtime patterns, I recommend trying more RPG games!'
    })
  }, 1000)
  
  userInput.value = ''
}
</script>
