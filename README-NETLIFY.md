# Netlify Deployment Guide

## What to Upload to Netlify

For successful deployment, upload the **entire project folder** to Netlify.

### Quick Deploy Steps:

1. **Zip the entire project folder** (all files and folders)
2. **Upload to Netlify** via drag & drop or GitHub
3. **Set Environment Variable** (optional):
   - `OPENWEATHER_API_KEY` - Your OpenWeather API key for live data

### Netlify Build Settings:

- **Build command**: `npm run build`
- **Publish directory**: `dist/public`
- **Functions directory**: `netlify/functions`

### Project Structure Included:

```
project/
├── client/           # React frontend
├── server/           # Express backend (for local dev)
├── netlify/
│   └── functions/    # Serverless functions for Netlify
├── shared/           # Common types and schemas
├── netlify.toml      # Netlify configuration
├── package.json      # Dependencies and scripts
└── vite.config.ts    # Build configuration
```

### Features Ready for Deployment:

✅ Professional weather app design with iOS-style glass effects  
✅ Realistic cloud animations and weather backgrounds  
✅ Responsive design for all devices  
✅ Serverless API functions for weather data  
✅ Fallback demo data when API unavailable  
✅ Proper routing with SPA support  

The app will work immediately after deployment, even without API keys (using demo data).

### Live Demo Features:

- Real-time weather for all Australian states
- Interactive weather cards with detailed modal views
- Analog clock with timezone support
- Dynamic weather backgrounds and effects
- Professional glass morphism design

**Ready to deploy!** Just upload the entire project folder to Netlify.