import React from 'react'
import { motion } from 'framer-motion'
import { WeatherData } from '@shared/types/weather'
import { 
  CloudIcon, 
  SunIcon, 
  CloudRainIcon, 
  CloudSnowIcon,
  Eye,
  Wind,
  Droplets,
  Gauge
} from 'lucide-react'

interface WeatherCardProps {
  weather: WeatherData
  onClick: () => void
}

function getWeatherIcon(iconCode: string, description: string) {
  const iconProps = { className: "weather-icon text-white/90", strokeWidth: 1.5 }
  
  if (iconCode.includes('01')) return <SunIcon {...iconProps} />
  if (iconCode.includes('02') || iconCode.includes('03')) return <CloudIcon {...iconProps} />
  if (iconCode.includes('04')) return <CloudIcon {...iconProps} />
  if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRainIcon {...iconProps} />
  if (iconCode.includes('13')) return <CloudSnowIcon {...iconProps} />
  
  // Fallback based on description
  if (description.includes('rain')) return <CloudRainIcon {...iconProps} />
  if (description.includes('cloud')) return <CloudIcon {...iconProps} />
  if (description.includes('clear') || description.includes('sun')) return <SunIcon {...iconProps} />
  
  return <SunIcon {...iconProps} />
}

function getBackgroundGradient(temperature: number, description: string) {
  if (description.includes('rain')) {
    return 'from-slate-600 via-slate-500 to-slate-400'
  }
  if (description.includes('cloud')) {
    return 'from-gray-600 via-gray-500 to-gray-400'
  }
  if (temperature > 25) {
    return 'from-orange-500 via-red-500 to-pink-500'
  }
  if (temperature > 20) {
    return 'from-blue-500 via-purple-500 to-pink-500'
  }
  if (temperature > 15) {
    return 'from-blue-600 via-blue-500 to-purple-500'
  }
  return 'from-blue-800 via-blue-700 to-blue-600'
}

export function WeatherCard({ weather, onClick }: WeatherCardProps) {
  const backgroundGradient = getBackgroundGradient(weather.temperature, weather.description)
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`
        glass-card-hover relative overflow-hidden rounded-2xl p-6 cursor-pointer
        bg-gradient-to-br ${backgroundGradient}
        transform transition-all duration-300
      `}
      onClick={onClick}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/10 rounded-full blur-lg"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="location-text font-bold">
              {weather.city}
            </h3>
            <p className="text-white/70 text-sm font-medium">
              {weather.state}
            </p>
          </div>
          <div className="flex-shrink-0">
            {getWeatherIcon(weather.icon, weather.description)}
          </div>
        </div>

        {/* Temperature */}
        <div className="mb-4">
          <div className="temperature-text">
            {Math.round(weather.temperature)}°
          </div>
          <p className="description-text">
            {weather.description}
          </p>
        </div>

        {/* Weather stats */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-white/70" />
            <span className="text-white/90">{weather.windSpeed} km/h</span>
          </div>
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-white/70" />
            <span className="text-white/90">{weather.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-white/70" />
            <span className="text-white/90">{weather.visibility} km</span>
          </div>
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-white/70" />
            <span className="text-white/90">{weather.pressure} hPa</span>
          </div>
        </div>

        {/* Feels like temperature */}
        <div className="mt-4 pt-3 border-t border-white/20">
          <p className="text-white/70 text-sm">
            Feels like <span className="text-white font-medium">{Math.round(weather.feelsLike)}°</span>
          </p>
        </div>
      </div>

      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 bg-white/5 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}