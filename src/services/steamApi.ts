import axios from 'axios'
import type { SteamGame, SteamProfile } from '@/types/steam'

export class SteamApiService {
  private corsProxy = 'https://api.allorigins.win/get?url='

  constructor(
    private apiKey: string,
    private steamId: string
  ) {}

  async getOwnedGames(): Promise<SteamGame[]> {
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${this.apiKey}&steamid=${this.steamId}&format=json&include_appinfo=1&include_played_free_games=1`
    
    try {
      const response = await axios.get(`${this.corsProxy}${encodeURIComponent(url)}`)
      const data = JSON.parse(response.data.contents)
      return data.response?.games || []
    } catch (error) {
      console.error('Failed to fetch games:', error)
      throw new Error('Failed to load Steam games')
    }
  }

  async getPlayerSummary(): Promise<SteamProfile> {
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${this.apiKey}&steamids=${this.steamId}`
    
    try {
      const response = await axios.get(`${this.corsProxy}${encodeURIComponent(url)}`)
      const data = JSON.parse(response.data.contents)
      
      if (!data.response?.players?.[0]) {
        throw new Error('Player not found')
      }
      
      return data.response.players[0]
    } catch (error) {
      console.error('Failed to fetch player:', error)
      throw new Error('Failed to load Steam profile')
    }
  }

  getGameImageUrl(appId: number): string {
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`
  }

  formatPlaytime(minutes: number): string {
    if (minutes === 0) return 'Never played'
    
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const remainingHours = hours % 24
    
    if (days > 0) {
      return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`
    }
    
    if (hours === 0) {
      return `${minutes}m`
    }
    
    return `${hours}h`
  }

  calculateProgress(gameMinutes: number, maxMinutes: number): number {
    if (maxMinutes === 0) return 0
    return Math.min((gameMinutes / maxMinutes) * 100, 100)
  }
}
