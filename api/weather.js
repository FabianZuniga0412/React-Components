/**
 * Vercel Serverless Function - Proxy para Weather API
 * Protege la API key del cliente manteniéndola en el servidor
 */
export default async function handler(req, res) {
  // Habilitar CORS para todas las solicitudes
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Solo permitir GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  try {
    const { lat, lon } = req.query

    // Validar parámetros requeridos
    if (!lat || !lon) {
      return res.status(400).json({ 
        error: 'Se requieren los parámetros lat y lon' 
      })
    }

    // Obtener API key de variables de entorno (segura en Vercel)
    const apiKey = process.env.WEATHER_API_KEY

    if (!apiKey) {
      console.error('WEATHER_API_KEY no configurada')
      return res.status(500).json({ 
        error: 'Configuración del servidor incompleta' 
      })
    }

    // Llamar a WeatherAPI
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return res.status(response.status).json({ 
        error: errorData.error?.message || 'Error al obtener datos del clima' 
      })
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    console.error('Error en proxy de Weather API:', error)
    return res.status(500).json({ 
      error: 'Error interno del servidor' 
    })
  }
}
