export interface WeatherData {
  id: string;
  city: string;
  state: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  feelsLike: number;
  sunrise: string;
  sunset: string;
  timezone: string;
  lastUpdated: string;
}

export interface WeatherLocation {
  id: string;
  name: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
  timezone: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export const AUSTRALIAN_CITIES: WeatherLocation[] = [
  {
    id: 'sydney',
    name: 'Sydney',
    state: 'NSW',
    country: 'Australia',
    lat: -33.8688,
    lon: 151.2093,
    timezone: 'Australia/Sydney'
  },
  {
    id: 'melbourne',
    name: 'Melbourne',
    state: 'VIC',
    country: 'Australia',
    lat: -37.8136,
    lon: 144.9631,
    timezone: 'Australia/Melbourne'
  },
  {
    id: 'brisbane',
    name: 'Brisbane',
    state: 'QLD',
    country: 'Australia',
    lat: -27.4698,
    lon: 153.0251,
    timezone: 'Australia/Brisbane'
  },
  {
    id: 'perth',
    name: 'Perth',
    state: 'WA',
    country: 'Australia',
    lat: -31.9505,
    lon: 115.8605,
    timezone: 'Australia/Perth'
  },
  {
    id: 'adelaide',
    name: 'Adelaide',
    state: 'SA',
    country: 'Australia',
    lat: -34.9285,
    lon: 138.6007,
    timezone: 'Australia/Adelaide'
  },
  {
    id: 'hobart',
    name: 'Hobart',
    state: 'TAS',
    country: 'Australia',
    lat: -42.8821,
    lon: 147.3272,
    timezone: 'Australia/Hobart'
  },
  {
    id: 'darwin',
    name: 'Darwin',
    state: 'NT',
    country: 'Australia',
    lat: -12.4634,
    lon: 130.8456,
    timezone: 'Australia/Darwin'
  },
  {
    id: 'canberra',
    name: 'Canberra',
    state: 'ACT',
    country: 'Australia',
    lat: -35.2809,
    lon: 149.1300,
    timezone: 'Australia/Sydney'
  }
];