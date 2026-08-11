import type { QuestionFigure as Figure } from '../../types/exam'

type Props = {
  figure: Figure
}

function LineChart({
  title,
  yLabel,
  xLabel,
  points,
}: Extract<Figure, { type: 'line' }>) {
  const width = 520
  const height = 280
  const padL = 48
  const padR = 16
  const padT = 28
  const padB = 40
  const plotW = width - padL - padR
  const plotH = height - padT - padB

  const values = points.map((p) => p.value)
  const minV = Math.min(...values)
  const maxV = Math.max(...values)
  const span = maxV - minV || 1
  // Nice padding on y-axis
  const yMin = Math.max(0, Math.floor((minV - span * 0.1) / 10) * 10)
  const yMax = Math.ceil((maxV + span * 0.1) / 10) * 10
  const ySpan = yMax - yMin || 1

  const coords = points.map((p, i) => {
    const x =
      padL + (points.length === 1 ? plotW / 2 : (i / (points.length - 1)) * plotW)
    const y = padT + plotH - ((p.value - yMin) / ySpan) * plotH
    return { x, y, ...p }
  })

  const path = coords
    .map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(' ')

  const gridLines = 4
  const ticks = Array.from({ length: gridLines + 1 }, (_, i) => {
    const value = yMin + (ySpan * i) / gridLines
    const y = padT + plotH - ((value - yMin) / ySpan) * plotH
    return { value, y }
  })

  return (
    <div className="q-figure">
      <div className="q-figure-title">{title}</div>
      <svg
        className="q-figure-svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={title}
      >
        {/* grid + axes */}
        {ticks.map((t) => (
          <g key={t.value}>
            <line
              x1={padL}
              y1={t.y}
              x2={padL + plotW}
              y2={t.y}
              stroke="#d0d0d0"
              strokeWidth={1}
            />
            <text
              x={padL - 8}
              y={t.y + 4}
              textAnchor="end"
              fontSize={11}
              fill="#444"
            >
              {Math.round(t.value)}
            </text>
          </g>
        ))}
        <line
          x1={padL}
          y1={padT}
          x2={padL}
          y2={padT + plotH}
          stroke="#333"
          strokeWidth={1.5}
        />
        <line
          x1={padL}
          y1={padT + plotH}
          x2={padL + plotW}
          y2={padT + plotH}
          stroke="#333"
          strokeWidth={1.5}
        />
        {yLabel && (
          <text
            x={14}
            y={padT + plotH / 2}
            transform={`rotate(-90 14 ${padT + plotH / 2})`}
            textAnchor="middle"
            fontSize={11}
            fill="#333"
          >
            {yLabel}
          </text>
        )}
        <path d={path} fill="none" stroke="#1a5fb4" strokeWidth={2.5} />
        {coords.map((c) => (
          <g key={c.label}>
            <circle cx={c.x} cy={c.y} r={4.5} fill="#1a5fb4" />
            <text
              x={c.x}
              y={c.y - 10}
              textAnchor="middle"
              fontSize={11}
              fontWeight={600}
              fill="#111"
            >
              {c.value}
            </text>
            <text
              x={c.x}
              y={padT + plotH + 18}
              textAnchor="middle"
              fontSize={11}
              fill="#333"
            >
              {c.label}
            </text>
          </g>
        ))}
        {xLabel && (
          <text
            x={padL + plotW / 2}
            y={height - 6}
            textAnchor="middle"
            fontSize={11}
            fill="#333"
          >
            {xLabel}
          </text>
        )}
      </svg>
    </div>
  )
}

function BarChart({
  title,
  yLabel,
  bars,
}: Extract<Figure, { type: 'bar' }>) {
  const width = 520
  const height = 280
  const padL = 48
  const padR = 16
  const padT = 28
  const padB = 40
  const plotW = width - padL - padR
  const plotH = height - padT - padB
  const maxV = Math.max(...bars.map((b) => b.value), 1)
  const yMax = Math.ceil(maxV * 1.1)
  const gap = 12
  const barW = (plotW - gap * (bars.length + 1)) / bars.length

  const gridLines = 4
  const ticks = Array.from({ length: gridLines + 1 }, (_, i) => {
    const value = (yMax * i) / gridLines
    const y = padT + plotH - (value / yMax) * plotH
    return { value, y }
  })

  return (
    <div className="q-figure">
      <div className="q-figure-title">{title}</div>
      <svg
        className="q-figure-svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={title}
      >
        {ticks.map((t) => (
          <g key={t.value}>
            <line
              x1={padL}
              y1={t.y}
              x2={padL + plotW}
              y2={t.y}
              stroke="#d0d0d0"
              strokeWidth={1}
            />
            <text
              x={padL - 8}
              y={t.y + 4}
              textAnchor="end"
              fontSize={11}
              fill="#444"
            >
              {Math.round(t.value)}
            </text>
          </g>
        ))}
        <line
          x1={padL}
          y1={padT}
          x2={padL}
          y2={padT + plotH}
          stroke="#333"
          strokeWidth={1.5}
        />
        <line
          x1={padL}
          y1={padT + plotH}
          x2={padL + plotW}
          y2={padT + plotH}
          stroke="#333"
          strokeWidth={1.5}
        />
        {yLabel && (
          <text
            x={14}
            y={padT + plotH / 2}
            transform={`rotate(-90 14 ${padT + plotH / 2})`}
            textAnchor="middle"
            fontSize={11}
            fill="#333"
          >
            {yLabel}
          </text>
        )}
        {bars.map((b, i) => {
          const h = (b.value / yMax) * plotH
          const x = padL + gap + i * (barW + gap)
          const y = padT + plotH - h
          return (
            <g key={b.label}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={h}
                fill="#2f5f8f"
                stroke="#1e3f5f"
              />
              <text
                x={x + barW / 2}
                y={y - 6}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill="#111"
              >
                {b.value}
              </text>
              <text
                x={x + barW / 2}
                y={padT + plotH + 18}
                textAnchor="middle"
                fontSize={11}
                fill="#333"
              >
                {b.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function DataTable({ title, headers, rows }: Extract<Figure, { type: 'table' }>) {
  return (
    <div className="q-figure">
      <div className="q-figure-title">{title}</div>
      <div className="q-figure-table-wrap">
        <table className="q-figure-table">
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function QuestionFigureView({ figure }: Props) {
  if (figure.type === 'line') return <LineChart {...figure} />
  if (figure.type === 'bar') return <BarChart {...figure} />
  return <DataTable {...figure} />
}
