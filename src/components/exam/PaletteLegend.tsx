export function PaletteLegend() {
  return (
    <div className="legend-inline">
      <span className="legend-item">
        <span className="swatch not-visited" /> Not Visited
      </span>
      <span className="legend-item">
        <span className="swatch not-answered" /> Not Answered
      </span>
      <span className="legend-item">
        <span className="swatch answered" /> Answered
      </span>
      <span className="legend-item">
        <span className="swatch marked" /> Marked for Review
      </span>
      <span className="legend-item">
        <span className="swatch answered-marked" /> Answered &amp; Marked
      </span>
    </div>
  )
}
