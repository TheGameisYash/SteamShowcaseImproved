export interface SteamGame {
  appid: number
  name: string
  playtime_forever: number
  img_icon_url?: string
  img_logo_url?: string
  playtime_2weeks?: number
}

export interface SteamProfile {
  steamid: string
  personaname: string
  avatar: string
  avatarfull: string
  profileurl: string
  realname?: string
}

export interface GameStats {
  totalGames: number
  totalPlaytime: string
  mostPlayed: SteamGame | null
  averagePlaytime: string
}
