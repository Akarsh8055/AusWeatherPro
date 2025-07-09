import React from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { WeatherCard } from './WeatherCard'
import { LoadingSpinner } from './LoadingSpinner'
import { WeatherData, AUSTRALIAN_CITIES } from '@shared/types/weather'
import { toast } from './ui/toaster'

interface WeatherDashboardProps {
  onWeatherSelect: (weather: WeatherData) => void
}

// Demo data for fallback when API is unavailable
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

async function fetchWeatherData(): Promise<WeatherData[]> {
  try {
    const response = await fetch('/.netlify/functions/weather')
    if (!response.ok) {
      throw new Error('Weather API unavailable')
    }
    const data = await response.json()
    return data.success ? data.data : demoWeatherData
  } catch (error) {
    console.warn('Using demo weather data:', error)
    toast('Using demo weather data - API unavailable', 'info')
    return demoWeatherData
  }
}

export function WeatherDashboard({ onWeatherSelect }: WeatherDashboardProps) {
  const { data: weatherData, isLoading, error } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeatherData,
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (error) {
    toast('Failed to load weather data', 'error')
  }

  const data = weatherData || demoWeatherData

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-4 rounded-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          Current Weather Conditions
        </h2>
        <p className="text-white/70">
          Real-time weather data for major Australian cities
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {data.map((weather, index) => (
          <motion.div
            key={weather.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100 
            }}
          >
            <WeatherCard
              weather={weather}
              onClick={() => onWeatherSelect(weather)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}