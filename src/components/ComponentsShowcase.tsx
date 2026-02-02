import MusicCard from './MusicCard'
import KPICard from './KPICard'
import DeviceStatusCard from './DeviceStatusCard'
import ControlledForm from './Form/ControlledForm'
import Weather from './Weather'
import { useToast } from './ToastContainer'

interface ComponentsShowcaseProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

export default function ComponentsShowcase({ darkMode, setDarkMode }: ComponentsShowcaseProps) {
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
    <section id="components" className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Componentes UI
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            Una colección de componentes reutilizables desarrollados con React y TypeScript.
            Cada componente está diseñado para ser funcional, accesible y fácil de integrar.
          </p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Music Card */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Music Card
              </h3>
              <div className="flex justify-center">
                <MusicCard
                  songTitle="Blinding Lights"
                  artistName="The Weeknd"
                  albumCover="https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/The_Weeknd_-_Blinding_Lights.png/250px-The_Weeknd_-_Blinding_Lights.png"
                  duration={200}
                  dominantColor="#fbca7b"
                  isDark={darkMode}
                />
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                KPI Cards con Gráficos
              </h3>
              <div className="flex flex-col gap-6">
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
              </div>
            </div>
          </div>

          {/* Device Status Cards */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Device Status Cards
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  status="warning"
                  lastSeen="2 minutes ago"
                  href="/devices/server-02"
                />
                <DeviceStatusCard
                  deviceName="SERVER-AWS"
                  status="up"
                  lastSeen="just now"
                  href="/devices/server-AWS"
                />
              </div>
            </div>
          </div>

          {/* Controlled Form */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Controlled Form
              </h3>
              <ControlledForm />
            </div>
          </div>

          {/* Weather Component */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Weather Component
              </h3>
              <Weather />
            </div>
          </div>

          {/* Toast Notifications Demo */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Sistema de Notificaciones (Toast)
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() =>
                    addToast({
                      title: 'Nueva actualización disponible',
                      description: 'Se ha lanzado la versión 2.1.0 con mejoras de rendimiento',
                      variant: 'info',
                      duration: 5000,
                    })
                  }
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  ℹ️ Info Toast
                </button>
                <button
                  onClick={() =>
                    addToast({
                      title: 'Datos guardados exitosamente',
                      description: 'Los cambios se han guardado correctamente',
                      variant: 'success',
                      duration: 4000,
                    })
                  }
                  className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                >
                  ✓ Success Toast
                </button>
                <button
                  onClick={() =>
                    addToast({
                      title: 'Atención',
                      description: 'Hay campos incompletos en el formulario',
                      variant: 'warning',
                      duration: 5000,
                    })
                  }
                  className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                >
                  ⚠ Warning Toast
                </button>
                <button
                  onClick={() =>
                    addToast({
                      title: 'Error de conexión',
                      description: 'No se pudo conectar al servidor. Por favor intenta de nuevo.',
                      variant: 'error',
                      duration: 6000,
                    })
                  }
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  ✕ Error Toast
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

