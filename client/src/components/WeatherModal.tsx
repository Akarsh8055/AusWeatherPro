import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WeatherData } from '@shared/types/weather'
import { 
  X, 
  Sunrise, 
  Sunset, 
  Wind, 
  Droplets, 
  Eye, 
  Gauge, 
  Thermometer,
  Sun,
  CloudIcon,
  MapPin,
  Clock
} from 'lucide-react'

interface WeatherModalProps {
  weather: WeatherData | null
  isOpen: boolean
  onClose: () => void
}

function formatTime(timeString: string, timezone: string) {
  try {
    const date = new Date()
    const [hours, minutes] = timeString.split(':')
    date.setHours(parseInt(hours), parseInt(minutes), 0, 0)
    
    return date.toLocaleTimeString('en-AU', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone
    })
  } catch {
    return timeString
  }
}

export function WeatherModal({ weather, isOpen, onClose }: WeatherModalProps) {
  if (!weather) return null

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 100 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 100,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative glass-card rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus-ring"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 text-white/70 mr-2" />
                <h2 className="text-2xl font-bold text-white">
                  {weather.city}, {weather.state}
                </h2>
              </div>
              
              <div className="text-5xl font-bold text-white mb-2">
                {Math.round(weather.temperature)}°
              </div>
              
              <p className="text-white/80 text-lg capitalize mb-4">
                {weather.description}
              </p>

              <div className="flex items-center justify-center text-white/70 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <span>Updated: {new Date(weather.lastUpdated).toLocaleTimeString('en-AU')}</span>
              </div>
            </div>

            {/* Weather details grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="weather-stat">
                <div className="flex items-center">
                  <Thermometer className="w-4 h-4 text-white/70 mr-2" />
                  <span className="weather-stat-label">Feels like</span>
                </div>
                <span className="weather-stat-value">{Math.round(weather.feelsLike)}°</span>
              </div>

              <div className="weather-stat">
                <div className="flex items-center">
                  <Wind className="w-4 h-4 text-white/70 mr-2" />
                  <span className="weather-stat-label">Wind</span>
                </div>
                <span className="weather-stat-value">{weather.windSpeed} km/h</span>
              </div>

              <div className="weather-stat">
                <div className="flex items-center">
                  <Droplets className="w-4 h-4 text-white/70 mr-2" />
                  <span className="weather-stat-label">Humidity</span>
                </div>
                <span className="weather-stat-value">{weather.humidity}%</span>
              </div>

              <div className="weather-stat">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 text-white/70 mr-2" />
                  <span className="weather-stat-label">Visibility</span>
                </div>
                <span className="weather-stat-value">{weather.visibility} km</span>
              </div>

              <div className="weather-stat">
                <div className="flex items-center">
                  <Gauge className="w-4 h-4 text-white/70 mr-2" />
                  <span className="weather-stat-label">Pressure</span>
                </div>
                <span className="weather-stat-value">{weather.pressure} hPa</span>
              </div>

              <div className="weather-stat">
                <div className="flex items-center">
                  <Sun className="w-4 h-4 text-white/70 mr-2" />
                  <span className="weather-stat-label">UV Index</span>
                </div>
                <span className="weather-stat-value">{weather.uvIndex}</span>
              </div>
            </div>

            {/* Sun times */}
            <div className="glass-card p-4 rounded-xl">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <CloudIcon className="w-5 h-5 mr-2" />
                Sun & Moon
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Sunrise className="w-5 h-5 text-orange-300 mr-3" />
                  <div>
                    <div className="text-white/70 text-sm">Sunrise</div>
                    <div className="text-white font-medium">
                      {formatTime(weather.sunrise, weather.timezone)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Sunset className="w-5 h-5 text-orange-500 mr-3" />
                  <div>
                    <div className="text-white/70 text-sm">Sunset</div>
                    <div className="text-white font-medium">
                      {formatTime(weather.sunset, weather.timezone)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated background effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/3 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}