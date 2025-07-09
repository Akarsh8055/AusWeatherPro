import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { WeatherData, AUSTRALIAN_CITIES, ApiResponse } from '../shared/types/weather.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  next()
})

// Demo weather data (same as Netlify function)
const demoWeatherData: WeatherData[] = [
  {
    id: 'sydney',
    city: 'Sydney',
    state: 'NSW',
    country: 'Australia',
    temperature: 24,
    description: 'partly cloudy',
    icon: '02d',
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    visibility: 10,
    uvIndex: 6,
    feelsLike: 26,
    sunrise: '06:30',
    sunset: '17:45',
    timezone: 'Australia/Sydney',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'melbourne',
    city: 'Melbourne',
    state: 'VIC',
    country: 'Australia',
    temperature: 18,
    description: 'overcast clouds',
    icon: '04d',
    humidity: 78,
    windSpeed: 8,
    pressure: 1008,
    visibility: 8,
    uvIndex: 3,
    feelsLike: 16,
    sunrise: '06:45',
    sunset: '17:30',
    timezone: 'Australia/Melbourne',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'brisbane',
    city: 'Brisbane',
    state: 'QLD',
    country: 'Australia',
    temperature: 28,
    description: 'clear sky',
    icon: '01d',
    humidity: 55,
    windSpeed: 15,
    pressure: 1016,
    visibility: 12,
    uvIndex: 8,
    feelsLike: 32,
    sunrise: '05:50',
    sunset: '17:55',
    timezone: 'Australia/Brisbane',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'perth',
    city: 'Perth',
    state: 'WA',
    country: 'Australia',
    temperature: 22,
    description: 'few clouds',
    icon: '02d',
    humidity: 60,
    windSpeed: 10,
    pressure: 1015,
    visibility: 15,
    uvIndex: 7,
    feelsLike: 24,
    sunrise: '06:15',
    sunset: '18:10',
    timezone: 'Australia/Perth',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'adelaide',
    city: 'Adelaide',
    state: 'SA',
    country: 'Australia',
    temperature: 20,
    description: 'light rain',
    icon: '10d',
    humidity: 85,
    windSpeed: 6,
    pressure: 1005,
    visibility: 6,
    uvIndex: 2,
    feelsLike: 18,
    sunrise: '06:30',
    sunset: '17:40',
    timezone: 'Australia/Adelaide',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'hobart',
    city: 'Hobart',
    state: 'TAS',
    country: 'Australia',
    temperature: 15,
    description: 'broken clouds',
    icon: '04d',
    humidity: 72,
    windSpeed: 14,
    pressure: 1010,
    visibility: 9,
    uvIndex: 4,
    feelsLike: 13,
    sunrise: '06:50',
    sunset: '17:20',
    timezone: 'Australia/Hobart',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'darwin',
    city: 'Darwin',
    state: 'NT',
    country: 'Australia',
    temperature: 32,
    description: 'scattered clouds',
    icon: '03d',
    humidity: 70,
    windSpeed: 18,
    pressure: 1011,
    visibility: 10,
    uvIndex: 9,
    feelsLike: 38,
    sunrise: '06:00',
    sunset: '18:30',
    timezone: 'Australia/Darwin',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'canberra',
    city: 'Canberra',
    state: 'ACT',
    country: 'Australia',
    temperature: 16,
    description: 'mist',
    icon: '50d',
    humidity: 88,
    windSpeed: 4,
    pressure: 1012,
    visibility: 3,
    uvIndex: 1,
    feelsLike: 15,
    sunrise: '06:40',
    sunset: '17:35',
    timezone: 'Australia/Sydney',
    lastUpdated: new Date().toISOString()
  }
]

// Simulate the Netlify functions API endpoint
app.get('/.netlify/functions/weather', async (req, res) => {
  try {
    console.log('Local development: Serving demo weather data')
    
    // Add some realistic variation to the demo data
    const weatherData = demoWeatherData.map(weather => ({
      ...weather,
      temperature: weather.temperature + (Math.random() - 0.5) * 4, // ±2 degrees variation
      lastUpdated: new Date().toISOString()
    }))

    const response: ApiResponse<WeatherData[]> = {
      data: weatherData,
      success: true
    }

    res.json(response)
  } catch (error) {
    console.error('Error serving weather data:', error)
    res.status(500).json({
      data: [],
      success: false,
      error: 'Internal server error'
    })
  }
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const publicPath = path.join(__dirname, '../dist/public')
  app.use(express.static(publicPath))
  
  // SPA fallback - serve index.html for all routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })
}

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🌤️  Weather Australia Server`)
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`📊 Weather API: http://localhost:${PORT}/.netlify/functions/weather`)
    console.log(`🏥 Health check: http://localhost:${PORT}/health`)
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`📝 Using demo weather data for development`)
      console.log(`🔑 Set OPENWEATHER_API_KEY environment variable for real data`)
    }
  })
}

export default app