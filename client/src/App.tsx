import React, { useState } from 'react'
import { Router, Route } from 'wouter'
import { Toaster } from '@/components/ui/toaster'
import { WeatherDashboard } from '@/components/WeatherDashboard'
import { WeatherModal } from '@/components/WeatherModal'
import { AnalogClock } from '@/components/AnalogClock'
import { WeatherData } from '@shared/types/weather'
import { motion } from 'framer-motion'

function App() {
  const [selectedWeather, setSelectedWeather] = useState<WeatherData | null>(null)

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
            animate={{ 
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"
            animate={{ 
              x: [0, -80, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-40 h-40 bg-white/8 rounded-full blur-xl"
            animate={{ 
              x: [0, 60, 0],
              y: [0, -70, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <header className="text-center py-8 px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-card inline-block px-8 py-4 rounded-2xl"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Weather Australia
              </h1>
              <p className="text-white/80 text-lg">
                Professional weather forecast for Australian cities
              </p>
            </motion.div>
          </header>

          <main className="container mx-auto px-4 pb-8">
            <Route path="/">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Weather Dashboard */}
                <div className="lg:col-span-3">
                  <WeatherDashboard onWeatherSelect={setSelectedWeather} />
                </div>
                
                {/* Analog Clock */}
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="glass-card p-6 rounded-2xl"
                  >
                    <h3 className="text-white font-semibold mb-4 text-center">
                      Local Time
                    </h3>
                    <AnalogClock timezone="Australia/Sydney" />
                  </motion.div>
                </div>
              </div>
            </Route>
          </main>

          {/* Weather Detail Modal */}
          <WeatherModal
            weather={selectedWeather}
            isOpen={!!selectedWeather}
            onClose={() => setSelectedWeather(null)}
          />

          {/* Toast notifications */}
          <Toaster />
        </div>
      </div>
    </Router>
  )
}

export default App