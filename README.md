# Weather Australia - Professional Weather App

A beautiful, professional weather application for Australian cities featuring iOS-style glass morphism design, real-time weather data, and an analog clock. Built with React, TypeScript, and Tailwind CSS, ready for deployment on Netlify.

## ✨ Features

- 🌤️ **Real-time weather data** for 8 major Australian cities
- 🎨 **Professional glass morphism design** with iOS-style aesthetics
- 📱 **Fully responsive** - works on desktop, tablet, and mobile
- 🎭 **Beautiful animations** with Framer Motion
- 🕒 **Analog clock** with timezone support
- 📊 **Detailed weather modal** with comprehensive stats
- 🌈 **Dynamic backgrounds** that change based on weather conditions
- ⚡ **Fast and modern** - built with Vite and React 18
- 🚀 **Ready for deployment** - optimized for Netlify

## 🏙️ Supported Cities

- Sydney, NSW
- Melbourne, VIC
- Brisbane, QLD
- Perth, WA
- Adelaide, SA
- Hobart, TAS
- Darwin, NT
- Canberra, ACT

## 🚀 Quick Deployment to Netlify

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy Weather Australia app"
   git push origin main
   ```

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select this repository
   - Settings are auto-detected from `netlify.toml`

### Option 2: Manual Upload

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist/public` folder

### Option 3: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## 🛠️ Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run start
   ```

## 🔧 Environment Variables

For live weather data, add these environment variables in Netlify Dashboard:

- `OPENWEATHER_API_KEY` - Your OpenWeather API key (optional)

**Note**: The app works perfectly without API keys using realistic demo data.

## 📁 Project Structure

```
weather-australia/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── styles/         # CSS and styling
│   │   └── main.tsx        # App entry point
│   └── index.html          # HTML template
├── server/                 # Express backend (for local dev)
│   └── index.ts            # Server entry point
├── netlify/
│   └── functions/          # Serverless functions
│       └── weather.ts      # Weather API endpoint
├── shared/                 # Shared types and utilities
│   └── types/
│       └── weather.ts      # TypeScript interfaces
├── netlify.toml            # Netlify configuration
├── package.json            # Dependencies and scripts
└── vite.config.ts          # Build configuration
```

## 🎨 Design Features

- **Glass Morphism**: Modern iOS-style transparent glass effects
- **Dynamic Backgrounds**: Weather-responsive gradient backgrounds
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Professional Typography**: Inter font family
- **Accessibility**: Focus states and ARIA labels

## 🔄 API Endpoints

- **Production**: `/.netlify/functions/weather`
- **Development**: `http://localhost:3000/.netlify/functions/weather`

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🚦 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking

## 🔍 Technical Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Query (TanStack Query)
- **Build Tool**: Vite
- **Deployment**: Netlify Functions
- **Styling**: Tailwind CSS with custom glass morphism classes

## 🌐 Live Demo

Once deployed on Netlify, your app will be available at your custom Netlify URL with features:

- Real-time weather updates every 10 minutes
- Interactive weather cards with hover effects
- Detailed modal views with comprehensive weather data
- Working analog clock with timezone support
- Smooth animations and transitions

## 📝 License

MIT License - feel free to use this project for your own purposes.

---

**Ready to deploy!** 🚀 Your professional weather app is fully configured and ready for Netlify deployment.