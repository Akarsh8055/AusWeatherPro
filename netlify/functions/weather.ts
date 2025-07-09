import { Handler } from '@netlify/functions'
import { WeatherData, AUSTRALIAN_CITIES, ApiResponse } from '../../shared/types/weather'

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY

// Demo data as fallback
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

async function fetchWeatherForCity(city: any): Promise<WeatherData | null> {
  if (!OPENWEATHER_API_KEY) {
    return null // Will use demo data
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()
    
    return {
      id: city.id,
      city: city.name,
      state: city.state,
      country: city.country,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      pressure: data.main.pressure,
      visibility: Math.round((data.visibility || 10000) / 1000), // Convert to km
      uvIndex: 5, // UV data requires separate API call
      feelsLike: Math.round(data.main.feels_like),
      sunrise: new Date(data.sys.sunrise * 1000).toTimeString().slice(0, 5),
      sunset: new Date(data.sys.sunset * 1000).toTimeString().slice(0, 5),
      timezone: city.timezone,
      lastUpdated: new Date().toISOString()
    }
  } catch (error) {
    console.error(`Error fetching weather for ${city.name}:`, error)
    return null
  }
}

export const handler: Handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  try {
    console.log('Fetching weather data for Australian cities...')
    
    let weatherData: WeatherData[] = []

    if (OPENWEATHER_API_KEY) {
      // Try to fetch real weather data
      const weatherPromises = AUSTRALIAN_CITIES.map(city => fetchWeatherForCity(city))
      const weatherResults = await Promise.allSettled(weatherPromises)
      
      weatherData = weatherResults
        .map((result, index) => {
          if (result.status === 'fulfilled' && result.value) {
            return result.value
          }
          // Fallback to demo data for this city
          return demoWeatherData[index]
        })
        .filter(Boolean)
    } else {
      console.log('No API key found, using demo data')
      weatherData = demoWeatherData
    }

    const response: ApiResponse<WeatherData[]> = {
      data: weatherData,
      success: true
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
    }
  } catch (error) {
    console.error('Error in weather function:', error)
    
    // Fallback to demo data on any error
    const response: ApiResponse<WeatherData[]> = {
      data: demoWeatherData,
      success: true
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
    }
  }
}