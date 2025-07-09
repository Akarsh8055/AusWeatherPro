import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AnalogClockProps {
  timezone: string
  size?: number
}

export function AnalogClock({ timezone, size = 200 }: AnalogClockProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Get current time in specified timezone
  const currentTime = new Date(time.toLocaleString("en-US", { timeZone: timezone }))
  
  const hours = currentTime.getHours() % 12
  const minutes = currentTime.getMinutes()
  const seconds = currentTime.getSeconds()

  // Calculate angles for hands
  const secondAngle = (seconds * 6) - 90 // 6 degrees per second
  const minuteAngle = (minutes * 6) + (seconds * 0.1) - 90 // 6 degrees per minute + smooth seconds
  const hourAngle = (hours * 30) + (minutes * 0.5) - 90 // 30 degrees per hour + smooth minutes

  const clockSize = size
  const centerX = clockSize / 2
  const centerY = clockSize / 2
  const radius = clockSize / 2 - 20

  // Generate hour markers
  const hourMarkers = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30) * (Math.PI / 180)
    const x1 = centerX + (radius - 15) * Math.cos(angle)
    const y1 = centerY + (radius - 15) * Math.sin(angle)
    const x2 = centerX + (radius - 5) * Math.cos(angle)
    const y2 = centerY + (radius - 5) * Math.sin(angle)
    
    return { x1, y1, x2, y2, number: i === 0 ? 12 : i }
  })

  // Generate minute markers
  const minuteMarkers = Array.from({ length: 60 }, (_, i) => {
    if (i % 5 === 0) return null // Skip hour positions
    
    const angle = (i * 6) * (Math.PI / 180)
    const x1 = centerX + (radius - 8) * Math.cos(angle)
    const y1 = centerY + (radius - 8) * Math.sin(angle)
    const x2 = centerX + (radius - 3) * Math.cos(angle)
    const y2 = centerY + (radius - 3) * Math.sin(angle)
    
    return { x1, y1, x2, y2 }
  }).filter(Boolean)

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <svg
          width={clockSize}
          height={clockSize}
          className="drop-shadow-lg"
        >
          {/* Outer ring */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="rgba(255, 255, 255, 0.1)"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="2"
          />
          
          {/* Inner ring */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius - 10}
            fill="rgba(255, 255, 255, 0.05)"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
          />

          {/* Hour markers */}
          {hourMarkers.map((marker, i) => (
            <g key={i}>
              <line
                x1={marker.x1}
                y1={marker.y1}
                x2={marker.x2}
                y2={marker.y2}
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Hour numbers */}
              <text
                x={centerX + (radius - 25) * Math.cos((i * 30) * (Math.PI / 180))}
                y={centerY + (radius - 25) * Math.sin((i * 30) * (Math.PI / 180)) + 5}
                textAnchor="middle"
                fontSize="14"
                fill="rgba(255, 255, 255, 0.9)"
                fontWeight="600"
                fontFamily="Inter, sans-serif"
              >
                {marker.number}
              </text>
            </g>
          ))}

          {/* Minute markers */}
          {minuteMarkers.map((marker, i) => (
            <line
              key={i}
              x1={marker!.x1}
              y1={marker!.y1}
              x2={marker!.x2}
              y2={marker!.y2}
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          ))}

          {/* Hour hand */}
          <motion.line
            x1={centerX}
            y1={centerY}
            x2={centerX + (radius * 0.5) * Math.cos(hourAngle * (Math.PI / 180))}
            y2={centerY + (radius * 0.5) * Math.sin(hourAngle * (Math.PI / 180))}
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ rotate: 0 }}
            animate={{ rotate: hourAngle + 90 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ transformOrigin: `${centerX}px ${centerY}px` }}
          />

          {/* Minute hand */}
          <motion.line
            x1={centerX}
            y1={centerY}
            x2={centerX + (radius * 0.7) * Math.cos(minuteAngle * (Math.PI / 180))}
            y2={centerY + (radius * 0.7) * Math.sin(minuteAngle * (Math.PI / 180))}
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ rotate: 0 }}
            animate={{ rotate: minuteAngle + 90 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ transformOrigin: `${centerX}px ${centerY}px` }}
          />

          {/* Second hand */}
          <motion.line
            x1={centerX}
            y1={centerY}
            x2={centerX + (radius * 0.8) * Math.cos(secondAngle * (Math.PI / 180))}
            y2={centerY + (radius * 0.8) * Math.sin(secondAngle * (Math.PI / 180))}
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ rotate: 0 }}
            animate={{ rotate: secondAngle + 90 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ transformOrigin: `${centerX}px ${centerY}px` }}
          />

          {/* Center dot */}
          <circle
            cx={centerX}
            cy={centerY}
            r="8"
            fill="rgba(255, 255, 255, 0.9)"
            stroke="#ef4444"
            strokeWidth="2"
          />
          
          {/* Inner center dot */}
          <circle
            cx={centerX}
            cy={centerY}
            r="4"
            fill="#ef4444"
          />
        </svg>
      </div>

      {/* Digital time display */}
      <div className="text-center">
        <div className="text-white text-lg font-semibold">
          {currentTime.toLocaleTimeString('en-AU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          })}
        </div>
        <div className="text-white/70 text-sm">
          {currentTime.toLocaleDateString('en-AU', {
            weekday: 'long',
            day: 'numeric',
            month: 'short'
          })}
        </div>
      </div>
    </div>
  )
}