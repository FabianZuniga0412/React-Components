import { useState } from 'react'
import MusicCard from './components/MusicCard'
import KPICard from './components/KPICard'
import { useToast } from './components/ToastContainer'
import DeviceStatusCard from './components/DeviceStatusCard'
import { ControlledForm } from './components/Form'

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
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col gap-12 p-8">

        {/* Toggle Dark Mode */}
        <div className="flex justify-center">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded bg-gray-300 px-4 py-2 dark:bg-gray-700"
          >
            Toggle Dark Mode
          </button>
        </div>

        {/* 🔔 Toast examples */}
        <section className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() =>
              addToast({
                title: 'Nueva actualización disponible',
                description: 'Se ha lanzado la versión 2.1.0 con mejoras de rendimiento',
                variant: 'info',
                duration: 5000,
              })
            }
            className="px-4 py-2 rounded-lg bg-blue-500 text-white"
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
            className="px-4 py-2 rounded-lg bg-green-500 text-white"
          >
            ✓ Success Toast
          </button>

          <button
            onClick={() =>
              addToast({
                title: 'Atención',
                description: 'Hay campos incompletos',
                variant: 'warning',
                duration: 5000,
              })
            }
            className="px-4 py-2 rounded-lg bg-yellow-500 text-white"
          >
            ⚠ Warning Toast
          </button>

          <button
            onClick={() =>
              addToast({
                title: 'Error',
                description: 'No se pudo conectar al servidor',
                variant: 'error',
                duration: 6000,
              })
            }
            className="px-4 py-2 rounded-lg bg-red-500 text-white"
          >
            ✕ Error Toast
          </button>
        </section>

        {/* 🎵 Music Card */}
        <section className="flex justify-center">
          <MusicCard
            songTitle="Blinding Lights"
            artistName="The Weeknd"
            albumCover="https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/The_Weeknd_-_Blinding_Lights.png/250px-The_Weeknd_-_Blinding_Lights.png"
            duration={200}
            dominantColor="#fbca7b"
            isDark={darkMode}
          />
        </section>

        {/* 📊 KPI Cards */}
        <section className="flex flex-col gap-6 items-center">
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
        </section>

        {/* 🖥 Device Status Cards */}
        <section className="flex flex-wrap gap-3 justify-center">
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
        </section>

        {/* 📝 Controlled Form */}
        <section className="flex justify-center">
          <ControlledForm />
        </section>

      </main>
    </div>
  )
}

export default App