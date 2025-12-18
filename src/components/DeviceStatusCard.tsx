import { useNavigate } from 'react-router-dom'

type DeviceStatus = 'up' | 'warning' | 'down'

type DeviceStatusCardProps = {
  deviceName: string
  status: DeviceStatus
  lastSeen: string
  href: string
}

const STATUS_STYLES: Record<DeviceStatus, {
  label: string
  color: string
  dot: string
}> = {
  up: {
    label: 'UP',
    color: 'text-green-600',
    dot: 'bg-green-500',
  },
  warning: {
    label: 'WARNING',
    color: 'text-yellow-600',
    dot: 'bg-yellow-500',
  },
  down: {
    label: 'DOWN',
    color: 'text-red-600',
    dot: 'bg-red-500',
  },
}

export default function DeviceStatusCard({
  deviceName,
  status,
  lastSeen,
  href,
}: DeviceStatusCardProps) {
  const navigate = useNavigate()
  const styles = STATUS_STYLES[status]

  return (
    <button
      onClick={() => navigate(href)}
      className="w-full max-w-xs rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:shadow-md hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800"
    >
      {/* Device name */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {deviceName}
      </h3>

      {/* Status */}
      <div className="mt-2 flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${styles.dot}`} />
        <span className={`text-sm font-medium ${styles.color}`}>
          {styles.label}
        </span>
      </div>

      {/* Last seen */}
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Last seen: {lastSeen}
      </p>
    </button>
  )
}