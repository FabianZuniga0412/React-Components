import { useState, useEffect } from 'react'

type WeatherData = {
    city: string
    country: string
    temperature: number
    icon: string
}

interface UserLocation {
    lat: number
    lon: number
}

interface StoredLocation extends UserLocation {
    timestamp: number
}

const STORAGE_KEY = 'weather_location'
const LOCATION_VALIDITY_HOURS = 24

function getStoredLocation(): StoredLocation | null {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (!stored) return null
        
        const location: StoredLocation = JSON.parse(stored)
        const now = Date.now()
        const hoursSinceStored = (now - location.timestamp) / (1000 * 60 * 60)
        
        // Si las coordenadas tienen menos de 24 horas, son válidas
        if (hoursSinceStored < LOCATION_VALIDITY_HOURS) {
            return location
        }
        
        // Si son muy antiguas, eliminar del storage
        localStorage.removeItem(STORAGE_KEY)
        return null
    } catch (error) {
        // Si hay error al leer, limpiar y retornar null
        localStorage.removeItem(STORAGE_KEY)
        return null
    }
}

function saveLocation(location: UserLocation): void {
    try {
        const storedLocation: StoredLocation = {
            ...location,
            timestamp: Date.now()
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedLocation))
    } catch (error) {
        // Si falla al guardar, continuar sin error
        console.warn('No se pudo guardar la ubicación en localStorage', error)
    }
}

async function getUserLocation(): Promise<UserLocation> {
    // Primero intentar obtener de localStorage
    const storedLocation = getStoredLocation()
    if (storedLocation) {
        return { lat: storedLocation.lat, lon: storedLocation.lon }
    }
    
    // Si no hay coordenadas válidas, solicitar geolocalización
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalización no soportada"))
        return
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
          // Guardar en localStorage para próximas veces
          saveLocation(location)
          resolve(location)
        },
        (error) => {
          reject(error)
        }
      )
    })
  }
  
async function getWeather(lat: number, lon: number): Promise<WeatherData> {
    // Usa la función serverless de Vercel en /api/weather
    // En desarrollo local, usa 'vercel dev' para simular el entorno
    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || 'Error al obtener el clima')
    }
    
    const data = await response.json()
    
    return {
      city: data.location.name,
      country: data.location.country,
      temperature: data.current.temp_c,
      icon: data.current.condition.icon
    }
}

export default function Weather() {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchWeather() {
            try {
                setLoading(true)
                setError(null)
                const location = await getUserLocation()
                const weatherData = await getWeather(location.lat, location.lon)
                setWeather(weatherData)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar el clima')
            } finally {
                setLoading(false)
            }
        }

        fetchWeather()
    }, [])

    if (loading) {
        return (
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400">Cargando clima...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <p className="text-red-600 dark:text-red-400">Error: {error}</p>
            </div>
        )
    }

    if (!weather) {
        return null
    }

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {weather.city}, {weather.country}
            </h1>
            <div className="flex items-center gap-4 mb-4">
                <h2 className="text-4xl font-semibold text-gray-800 dark:text-gray-200">
                    {weather.temperature}°C
                </h2>
                <img src={weather.icon} alt="weather icon" className="w-16 h-16" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Powered by{' '}
                <a 
                    href="https://www.weatherapi.com/" 
                    title="Free Weather API"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                    WeatherAPI.com
                </a>
            </p>
        </div>
    )
}
  
