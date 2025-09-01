# 🎮 Steam Library Showcase

> A visually stunning, feature-rich web app to showcase your Steam game library, built with Vue 3, Vite, Tailwind CSS, and the latest 2025 UI/UX trends.

[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## 🚀 Features

### Core Features
- **🎮 Dynamic Steam Library Display** - Connect with Steam Web API to showcase your game collection
- **✨ Beautiful Glassmorphism UI** - Modern, translucent design with blur effects
- **🎨 Animated Backgrounds** - Particle systems and 3D elements powered by Three.js
- **📊 Advanced Analytics** - Detailed statistics, charts, and gaming insights
- **🔍 AI-Powered Search** - Smart search with game recommendations and genre filtering
- **🎵 Web Audio API** - Immersive sound effects for interactions

### Advanced Features
- **🏆 Gamification System** - Achievements, levels, streaks, and progress tracking
- **🎯 Virtual Scrolling** - Optimized performance for large game libraries
- **📱 Progressive Web App** - Installable, offline-capable application
- **🌙 Theme Customization** - Multiple themes with dark/light mode support
- **📤 Data Export** - Export library data in JSON/CSV formats
- **🔗 Social Sharing** - Share your gaming achievements with friends



## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Vue 3** | Frontend framework with Composition API |
| **Vite** | Build tool and development server |
| **Tailwind CSS** | Utility-first CSS framework |
| **Chart.js** | Data visualization and analytics |
| **Three.js** | 3D graphics and particle effects |
| **Web Audio API** | Sound effects and audio feedback |
| **PWA** | Progressive Web App capabilities |

---

## ⚡ Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Steam API key
- Steam account with public profile

### Installation

1. **Clone the repository**
git clone https://github.com/TheGameisYash/SteamShowcaseImproved.git
cd SteamShowcaseImproved

text

2. **Install dependencies**
npm install

text

3. **Set up environment variables**

Create a `.env` file in the root directory:
VITE_STEAM_API_KEY=your_steam_api_key_here
VITE_STEAM_ID=your_steam_id_here

text

**Get your Steam credentials:**
- 🔑 Steam API Key: [steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey)
- 🆔 Steam ID: [steamid.io](https://steamid.io/)

4. **Start development server**
npm run dev

text

5. **Build for production**
npm run build
npm run preview

text



## 🎯 Usage

### Basic Usage

1. **Set up your Steam credentials** in the `.env` file
2. **Ensure your Steam profile is public** for API access
3. **Launch the application** and enjoy your personalized gaming showcase

### Advanced Features

- **🎵 Audio Settings**: Toggle sound effects in the settings panel
- **🎨 Theme Customization**: Choose from multiple color schemes
- **📊 Analytics**: View detailed gaming statistics and trends
- **🔍 Smart Search**: Use natural language to find games
- **📤 Export Data**: Download your library data for backup

---

## 🎮 Features in Detail

### 🏆 Achievement System
- Unlock achievements based on your gaming habits
- Track progress with visual indicators
- Gamified experience with levels and streaks

### 🤖 AI Recommendations
- Personalized game suggestions based on your library
- Genre analysis and preference tracking
- Discovery of hidden gems in your collection

### 📊 Advanced Analytics
- Interactive charts showing gaming trends
- Playtime analysis and statistics
- Gaming habit insights and patterns

### 🎨 Visual Effects
- Real-time particle systems
- Smooth animations and transitions
- Responsive design for all devices

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_STEAM_API_KEY` | Your Steam Web API key | Yes |
| `VITE_STEAM_ID` | Your Steam ID (64-bit) | Yes |

### Build Options

{
"scripts": {
"dev": "vite",
"build": "vite build",
"preview": "vite preview",
"build:analyze": "vite build && vite-bundle-analyzer dist"
}
}

text

---

## 🚀 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages
3. Update the base URL in `vite.config.js`

### Vercel/Netlify
1. Connect your GitHub repository
2. Set environment variables in the dashboard
3. Deploy with automatic builds

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
git checkout -b feature/amazing-feature

text
3. **Commit your changes**
git commit -m 'Add some amazing feature'

text
4. **Push to the branch**
git push origin feature/amazing-feature

text
5. **Open a Pull Request**

### Development Guidelines

- Follow Vue 3 best practices
- Use TypeScript for type safety
- Write descriptive commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 Roadmap

- [ ] **Steam Workshop Integration** - Display workshop items and mods
- [ ] **Friend Comparison** - Compare libraries with Steam friends
- [ ] **Game Recommendations** - Enhanced AI-powered suggestions
- [ ] **Mobile App** - Native mobile application
- [ ] **Steam Achievements** - Full achievement tracking
- [ ] **Community Features** - Social features and leaderboards

---

## 🛡️ Security & Privacy

- **No sensitive data stored** - All API keys are environment variables
- **CORS-safe requests** - Proxied through secure endpoints
- **Privacy-focused** - Only public Steam data is accessed
- **Local storage** - Settings stored locally in browser

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Steam Web API](https://steamcommunity.com/dev)** - For providing game data
- **[Vue.js](https://vuejs.org)** - The progressive JavaScript framework
- **[Tailwind CSS](https://tailwindcss.com)** - For utility-first CSS
- **[Chart.js](https://www.chartjs.org/)** - For beautiful charts
- **[Three.js](https://threejs.org)** - For 3D graphics and animations
- **[Lucide Icons](https://lucide.dev)** - For beautiful SVG icons

---

## 📞 Support

- 📧 **Email**: [thegameisyash@example.com](mailto:thegameisyash@example.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/TheGameisYash/SteamShowcaseImproved/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/TheGameisYash/SteamShowcaseImproved/discussions)

---

<div align="center">

**⭐ Star this repository if you found it helpful! ⭐**

*Built with ❤️ by TheGameisYash*

</div>

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/TheGameisYash/SteamShowcaseImproved)
![GitHub stars](https://img.shields.io/github/stars/TheGameisYash/SteamShowcaseImproved)
![GitHub forks](https://img.shields.io/github/forks/TheGameisYash/SteamShowcaseImproved)
![GitHub issues](https://img.shields.io/github/issues/TheGameisYash/SteamShowcaseImproved)
![GitHub license](https://img.shields.io/github/license/TheGameisYash/SteamShowcaseImproved)

---

> **Made with passion for gaming and clean code by [TheGameisYash](https://github.com/TheGameisYash)**
