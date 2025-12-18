import { useEffect, useState } from 'react'

type MusicCardProps = {
  songTitle: string
  artistName: string
  albumCover: string
  duration: number
  dominantColor?: string
  isDark: boolean
}

// ─────────────────────────────
// Utilidad: oscurecer color HEX usando HSL
// ─────────────────────────────
function darkenColor(hex: string, amount = 35): string {
  const cleanHex = hex.replace('#', '')

  const r = parseInt(cleanHex.slice(0, 2), 16) / 255
  const g = parseInt(cleanHex.slice(2, 4), 16) / 255
  const b = parseInt(cleanHex.slice(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  let l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  l = Math.max(0, l - amount / 100)

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  let r2, g2, b2
  if (s === 0) {
    r2 = g2 = b2 = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r2 = hue2rgb(p, q, h + 1 / 3)
    g2 = hue2rgb(p, q, h)
    b2 = hue2rgb(p, q, h - 1 / 3)
  }

  const toHex = (x: number) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, '0')

  return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`
}

export default function MusicCard({
  songTitle,
  artistName,
  albumCover,
  duration,
  dominantColor,
  isDark,
}: MusicCardProps) {
  // ─────────────────────────────
  // Estados
  // ─────────────────────────────
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  // ─────────────────────────────
  // Simulación de reproducción
  // ─────────────────────────────
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) return duration
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, duration])

  // ─────────────────────────────
  // Cálculos
  // ─────────────────────────────
  const progress = (currentTime / duration) * 100

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const baseColor = dominantColor ?? '#3b82f6'
  const finalColor = isDark ? darkenColor(baseColor, 35) : baseColor

  const backgroundStyle = {
    background: `linear-gradient(
      180deg,
      ${finalColor} 0%,
      ${finalColor} 70%,
      ${isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)'} 100%
    )`,
  }

  // ─────────────────────────────
  // Render
  // ─────────────────────────────
  return (
    <div
      className="w-80 rounded-2xl p-4 shadow-lg transition-colors"
      style={backgroundStyle}
    >
      {/* Portada */}
      <img
        src={albumCover}
        alt={`${songTitle} cover`}
        className="h-48 w-full rounded-xl object-cover"
      />

      {/* Info */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {songTitle}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {artistName}
        </p>
      </div>

      {/* Progreso */}
      <div className="mt-5">
        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Botón */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="mt-4 w-full rounded-full bg-blue-500 px-4 py-2 font-medium text-white transition-colors duration-300 hover:bg-blue-600"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}