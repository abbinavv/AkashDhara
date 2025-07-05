# AkashDhara - Flow of the Sky 🚀

A beautiful, interactive space exploration website that displays NASA's Astronomy Picture of the Day, historical space events, and features an AI-powered chatbot for space education.

![AkashDhara Preview](https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

- 🌌 **NASA APOD Integration** - Daily astronomy pictures with detailed explanations
- 🚀 **Space Launch Timeline** - Historical space events and launches for any date
- 🤖 **AstroBot AI Assistant** - Conversational AI guide for space exploration
- 📅 **Date Selection** - Explore space history for any date
- 🎨 **Beautiful UI** - Immersive space-themed design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- ⭐ **Animated Star Background** - Dynamic starfield with twinkling effects

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **APIs**: NASA APOD, Launch Library 2, OpenAI GPT

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager
- API keys (see configuration section below)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd akashdhara
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure API keys** (see API Configuration section)

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔑 API Configuration

### Required API Keys

#### 1. NASA API Key (Required)
- Visit [NASA API Portal](https://api.nasa.gov/)
- Sign up for a free account
- Generate your API key
- Add to `.env` file:
  ```
  VITE_NASA_API_KEY=your_nasa_api_key_here
  ```

#### 2. OpenAI API Key (Optional - for AstroBot)
- Visit [OpenAI Platform](https://platform.openai.com/api-keys)
- Create an account and generate an API key
- Add to `.env` file:
  ```
  VITE_OPENAI_API_KEY=your_openai_api_key_here
  ```
- **Note**: AstroBot will work in demo mode without this key

### Environment Variables

Create a `.env` file in the root directory:

```env
# NASA API Key (Get from https://api.nasa.gov/)
VITE_NASA_API_KEY=your_nasa_api_key_here

# OpenAI API Key (Get from https://platform.openai.com/api-keys)
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

## 📱 Running on Different Devices

### Desktop Development
```bash
npm run dev
```
Access at `http://localhost:5173`

### Mobile/Tablet Testing
```bash
npm run dev -- --host
```
This exposes the dev server to your local network. Access using your computer's IP address from mobile devices.

### Production Build
```bash
npm run build
npm run preview
```

## 🌐 Deployment

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Or connect your GitHub repository for automatic deployments

3. **Set environment variables**
   - Go to Site Settings → Environment Variables
   - Add your API keys:
     - `VITE_NASA_API_KEY`
     - `VITE_OPENAI_API_KEY`

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables**
   ```bash
   vercel env add VITE_NASA_API_KEY
   vercel env add VITE_OPENAI_API_KEY
   ```

## 🎯 Usage Guide

### Exploring Space History
1. Use the date picker in the header to select any date
2. View NASA's Astronomy Picture of the Day for that date
3. Explore historical space events and launches

### Using AstroBot
1. Click the "AstroBot" button in the header
2. Ask questions about:
   - Space missions and discoveries
   - Indian space achievements (ISRO, Chandrayaan, Mangalyaan)
   - Famous astronauts like Kalpana Chawla
   - Cosmic phenomena and astronomy

### Example Questions for AstroBot
- "Tell me about Chandrayaan missions"
- "Who was Kalpana Chawla?"
- "What is ISRO's Mars mission?"
- "Explain black holes"
- "Recent space discoveries"

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
│   ├── APODSection.tsx     # NASA APOD display
│   ├── AstroBot.tsx        # AI chatbot component
│   ├── Header.tsx          # Navigation header
│   ├── LaunchTimeline.tsx  # Space events timeline
│   └── StarBackground.tsx  # Animated background
├── services/            # API services
│   ├── nasaApi.ts          # NASA API integration
│   ├── openaiApi.ts        # OpenAI API integration
│   └── launchLibraryApi.ts # Launch Library API
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── App.tsx             # Main application component
```

## 🔧 Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure your `.env` file is in the root directory
   - Verify API keys are correct and active
   - Restart the development server after adding keys

2. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Update dependencies: `npm update`

3. **Network Issues**
   - Check if APIs are accessible from your network
   - Some corporate networks may block external API calls

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NASA Open Data Portal](https://api.nasa.gov/) for APOD API
- [The Space Devs](https://thespacedevs.com/) for Launch Library API
- [OpenAI](https://openai.com/) for GPT API
- [Pexels](https://pexels.com/) for space imagery

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information

---

**Made with ❤️ for space enthusiasts everywhere**

*AkashDhara - Sanskrit for "Flow of the Sky" - Explore the cosmos and discover the wonders of space exploration.*