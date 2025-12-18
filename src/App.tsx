import { useState } from 'react'
import MusicCard from './components/MusicCard'
import KPICard from './components/KPICard'
import { useToast } from './components/ToastContainer'
import DeviceStatusCard from './components/DeviceStatusCard'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const { addToast } = useToast()

  const revenueData = [
    120, 135, 150, 165, 180, 200,
    230, 260, 300, 340, 380, 420,
    460, 500, 540, 600, 680, 750,
    820, 900, 980, 1050, 1120, 1200
  ]

  const barDataRevenue = [
    -100, 320, 360, 340, 390, 420,
    410, 450, 480, 100, -300, 500, 950
  ]

  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center gap-6">

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded bg-gray-300 px-4 py-2 dark:bg-gray-700"
        >
          Toggle Dark Mode
        </button>

        {/* 🔔 TOAST EXAMPLES - Todos los tipos */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => addToast({
              title: 'Nueva actualización disponible',
              description: 'Se ha lanzado la versión 2.1.0 con mejoras de rendimiento',
              variant: 'info',
              duration: 5000
            })}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            ℹ️ Info Toast
          </button>

          <button
            onClick={() => addToast({
              title: 'Datos guardados exitosamente',
              description: 'Los cambios en el reporte mensual se han guardado correctamente',
              variant: 'success',
              duration: 4000
            })}
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
          >
            ✓ Success Toast
          </button>

          <button
            onClick={() => addToast({
              title: 'Atención: Datos incompletos',
              description: 'Algunos campos del formulario están vacíos. Por favor, revisa antes de continuar.',
              variant: 'warning',
              duration: 5000
            })}
            className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
          >
            ⚠ Warning Toast
          </button>

          <button
            onClick={() => addToast({
              title: 'Error al procesar la solicitud',
              description: 'No se pudo conectar con el servidor. Por favor, intenta nuevamente en unos momentos.',
              variant: 'error',
              duration: 6000
            })}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            ✕ Error Toast
          </button>

          {/* Ejemplos adicionales más específicos */}
          <button
            onClick={() => addToast({
              title: 'Meta alcanzada 🎉',
              description: 'Has superado el objetivo de ventas del mes. ¡Felicitaciones!',
              variant: 'success',
              duration: 5000
            })}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            🎯 Meta Alcanzada
          </button>

          <button
            onClick={() => addToast({
              title: 'Sincronización en progreso',
              description: 'Los datos se están actualizando. Esto puede tomar unos segundos...',
              variant: 'info',
              duration: 3000
            })}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            🔄 Sincronizando
          </button>

          <button
            onClick={() => addToast({
              title: 'Valores negativos detectados',
              description: 'Algunos períodos muestran pérdidas. Revisa el reporte semanal.',
              variant: 'warning',
              duration: 5000
            })}
            className="px-4 py-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 transition-colors"
          >
            📉 Valores Negativos
          </button>

          <button
            onClick={() => addToast({
              title: 'Conexión perdida',
              description: 'Se perdió la conexión con el servidor. Verifica tu conexión a internet.',
              variant: 'error',
              duration: 6000
            })}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            🔌 Sin Conexión
          </button>
        </div>

        <MusicCard
          songTitle="Blinding Lights"
          artistName="The Weeknd"
          albumCover="https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/The_Weeknd_-_Blinding_Lights.png/250px-The_Weeknd_-_Blinding_Lights.png"
          duration={200}
          dominantColor="#fbca7b"
          isDark={darkMode}
        />

        <KPICard
          title="Monthly Revenue Progress"
          value={1200}
          percentage={12}
          comparisonText="vs last month"
          data={revenueData}
          chartType="line"
          target={1500}
          baseline={500}
        />

        <KPICard
          title="Weekly Revenue"
          value={720}
          percentage={8}
          comparisonText="vs previous week"
          data={barDataRevenue}
          chartType="bar"
        />

        <div className="flex flex-wrap gap-3 flex-row justify-center">

          <DeviceStatusCard
            deviceName="PC-TAL"
            status="down"
            lastSeen="5 minutes ago"
            href="/devices/pc-tal"
          />

          <DeviceStatusCard
            deviceName="SERVER-01"
            status="up"
            lastSeen="just now"
            href="/devices/server-01"
          />

        <DeviceStatusCard
            deviceName="SERVER-02"
            status="down"
            lastSeen="10 minutes ago"
            href="/devices/server-02"
          />

        <DeviceStatusCard
            deviceName="SERVER-AWS"
            status="up"
            lastSeen="just now"
            href="/devices/server-AWS"
          />
        
        </div>

        

      </main>
    </div>
  )
}

export default App