import { useState } from 'react'

type ChartType = 'bar' | 'line'

type KPICardProps = {
  title: string
  value: number
  percentage: number
  comparisonText: string
  data: number[]
  chartType: ChartType
  baseline?: number
  target?: number
}

export default function KPICard({
  title,
  value,
  percentage,
  comparisonText,
  data,
  chartType,
  baseline,
  target,
}: KPICardProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null)
  const isPositive = percentage >= 0

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)

  
  // For bar charts with negative values, we need a zero baseline
  const hasNegativeValues = minValue < 0
  const barRange = hasNegativeValues ? maxValue - minValue : maxValue
  // Zero position from top: if min is -1500 and max is 520, zero is at (0 - min) / range from bottom
  // Which is (0 - (-1500)) / 2020 = 1500/2020 from bottom = 1 - 1500/2020 from top
  const zeroPositionFromBottom = hasNegativeValues ? (0 - minValue) / barRange : 0
  const zeroPositionFromTop = hasNegativeValues ? 1 - zeroPositionFromBottom : 1

  // ─────────────────────────────
  // Helpers LINE
  // ─────────────────────────────
  const getYPosition = (v: number) =>
    100 - ((v - min) / range) * 100

  const generateLinePoints = (values: number[]) =>
    values
      .map((v, i) => {
        const x = (i / (values.length - 1)) * 100
        const y = 100 - ((v - min) / range) * 100
        return `${x},${y}`
      })
      .join(' ')

  const progressToTarget =
    target !== undefined ? (value / target) * 100 : null

  // ─────────────────────────────
  return (
    <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="flex flex-col gap-5">

        {/* ───────── HEADER ───────── */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h2 className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
            {value.toLocaleString()}
          </h2>

          <div className="mt-1 flex items-center gap-2 text-sm">
            <span
              className={`font-medium ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isPositive ? '▲' : '▼'} {Math.abs(percentage)}%
            </span>

            <span className="text-gray-500 dark:text-gray-400">
              {comparisonText}
            </span>
          </div>

          {/* Target context (solo LINE) */}
          {chartType === 'line' &&
            target !== undefined &&
            progressToTarget !== null && (
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Meta: {target.toLocaleString()} ·{' '}
                {progressToTarget >= 100
                  ? 'Meta alcanzada'
                  : `${progressToTarget.toFixed(0)}% completado`}
              </p>
            )}
        </div>

        {/* ───────── CHART ───────── */}
        <div className="flex h-40 items-end relative">
          {/* Tooltip - Only for line chart */}
          {chartType === 'line' && hoveredIndex !== null && hoverPosition && (
            <div
              className="absolute z-50 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg pointer-events-none whitespace-nowrap"
              style={{
                left: `${hoverPosition.x}px`,
                top: `${hoverPosition.y}px`,
                transform: 'translate(-50%, -100%)',
                marginTop: '-8px',
              }}
            >
              <div className="font-semibold">
                {data[hoveredIndex].toLocaleString()}
              </div>
              <div className="text-xs text-gray-300 mt-0.5">
                Point {hoveredIndex + 1} of {data.length}
              </div>
              {/* Tooltip arrow */}
              <div
                className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"
              />
            </div>
          )}

          {/* ───── BAR CHART ───── */}
          {chartType === 'bar' && (
            <div className="flex h-full w-full gap-1 relative">
              {/* Zero baseline line for negative values */}
              {hasNegativeValues && (
                <div
                  className="absolute left-0 right-0 border-t border-gray-300 dark:border-gray-600 z-10"
                  style={{
                    top: `${zeroPositionFromTop * 100}%`,
                  }}
                />
              )}
              
              <div className="flex h-full w-full gap-1">
                {data.map((v, i) => {
                  const prev = data[i - 1]
                  const isDrop = i > 0 && v < prev
                  const isNegative = v < 0

                  // Calculate height as percentage of the range
                  const heightPercent = (Math.abs(v) / barRange) * 100
                  
                  // Position bars relative to zero line using absolute positioning within flex item
                  const wrapperStyle = hasNegativeValues
                    ? {
                        position: 'relative' as const,
                        flex: 1,
                        height: '100%',
                      }
                    : {
                        display: 'flex',
                        alignItems: 'flex-end',
                        height: '100%',
                        flex: 1,
                      }

                  const barStyle = hasNegativeValues
                    ? {
                        position: 'absolute' as const,
                        left: 0,
                        right: 0,
                        height: `${heightPercent}%`,
                        ...(isNegative
                          ? {
                              top: `${zeroPositionFromTop * 100}%`, // Start at zero, extend down
                            }
                          : {
                              bottom: `${zeroPositionFromBottom * 100}%`, // Start at zero, extend up
                            }),
                      }
                    : {
                        width: '100%',
                        height: `${heightPercent}%`,
                      }

                  return (
                    <div 
                      key={i} 
                      style={wrapperStyle}
                      onMouseEnter={() => {
                        setHoveredIndex(i)
                      }}
                      onMouseLeave={() => {
                        setHoveredIndex(null)
                      }}
                    >
                      <div
                        className={`rounded-md transition-all duration-300 cursor-pointer relative ${
                          isNegative ? 'bg-red-500' : (isDrop ? 'bg-red-500' : 'bg-blue-500')
                        } ${hoveredIndex === i ? 'opacity-90' : ''}`}
                        style={barStyle}
                      >
                        {/* Value displayed inside bar on hover */}
                        {hoveredIndex === i && (
                          <div
                            className="absolute inset-0 flex items-center justify-center text-white font-semibold text-xs pointer-events-none"
                            style={{
                              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                            }}
                          >
                            {v.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {/* ───── LINE CHART ───── */}
          {chartType === 'line' && (
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full"
              preserveAspectRatio="none"
              onMouseLeave={() => {
                setHoveredIndex(null)
                setHoverPosition(null)
              }}
            >
              {baseline !== undefined && (
                <line
                  x1="0"
                  x2="100"
                  y1={getYPosition(baseline)}
                  y2={getYPosition(baseline)}
                  stroke="#9ca3af"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              )}

              {target !== undefined && (
                <>
                  <line
                    x1="0"
                    x2="100"
                    y1={getYPosition(target)}
                    y2={getYPosition(target)}
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />
                  <text
                    x="100"
                    y={getYPosition(target) - 2}
                    textAnchor="end"
                    fontSize="4"
                    fill="#16a34a"
                  >
                    Target
                  </text>
                </>
              )}

              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="round"
                strokeLinecap="round"
                points={generateLinePoints(data)}
                className="pointer-events-none"
              />

              {/* Interactive hover points - rendered after polyline to be on top */}
              {data.map((v, i) => {
                // Calculate X position: handle edge cases for first and last points
                const x = data.length === 1 
                  ? 50 // Center if only one point
                  : (i / (data.length - 1)) * 100
                const y = getYPosition(v)
                
                // Calculate non-overlapping hit area boundaries
                let hitAreaX = 0
                let hitAreaWidth = 100
                
                if (data.length > 1) {
                  if (i === 0) {
                    // First point: from 0 to midpoint with next point
                    const nextX = (1 / (data.length - 1)) * 100
                    hitAreaX = 0
                    hitAreaWidth = nextX / 2
                  } else if (i === data.length - 1) {
                    // Last point: from midpoint with previous point to 100
                    const prevX = ((i - 1) / (data.length - 1)) * 100
                    hitAreaX = prevX + (x - prevX) / 2
                    hitAreaWidth = 100 - hitAreaX
                  } else {
                    // Middle points: between midpoints of adjacent points
                    const prevX = ((i - 1) / (data.length - 1)) * 100
                    const nextX = ((i + 1) / (data.length - 1)) * 100
                    hitAreaX = prevX + (x - prevX) / 2
                    hitAreaWidth = (nextX + (x - nextX) / 2) - hitAreaX
                  }
                }
                
                // Helper function to set hover state
                const handleMouseEnter = (e: React.MouseEvent<SVGElement>) => {
                  const svg = e.currentTarget.ownerSVGElement
                  const chartContainer = svg?.closest('.flex.h-40')
                  if (svg && chartContainer) {
                    const containerRect = chartContainer.getBoundingClientRect()
                    const point = svg.createSVGPoint()
                    point.x = x
                    point.y = y
                    const screenCTM = svg.getScreenCTM()
                    if (screenCTM) {
                      const screenPoint = point.matrixTransform(screenCTM)
                      setHoverPosition({
                        x: screenPoint.x - containerRect.left,
                        y: screenPoint.y - containerRect.top,
                      })
                    }
                  }
                  setHoveredIndex(i)
                }
                
                return (
                  <g key={i}>
                    {/* Non-overlapping rectangular hit area for reliable hover detection */}
                    <rect
                      x={hitAreaX}
                      y={0}
                      width={hitAreaWidth}
                      height={100}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={handleMouseEnter}
                    />
                    {/* Additional circular hit area at exact point for precision */}
                    <circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={handleMouseEnter}
                    />
                    {/* Visible circle on hover */}
                    {hoveredIndex === i && (
                      <>
                        <circle
                          cx={x}
                          cy={y}
                          r="4"
                          fill="#3b82f6"
                          stroke="white"
                          strokeWidth="1.5"
                          className="pointer-events-none"
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r="6"
                          fill="#3b82f6"
                          fillOpacity="0.2"
                          className="pointer-events-none"
                        />
                      </>
                    )}
                  </g>
                )
              })}
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}