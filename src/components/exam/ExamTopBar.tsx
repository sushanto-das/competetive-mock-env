import { formatTime } from '../../lib/scoring'
import type { Paper } from '../../types/exam'

type Props = {
  paper: Paper
  currentSectionIndex: number
  remainingMs: number
  remainingMsBySection: Record<string, number>
  onSelectSection: (sectionIndex: number) => void
}

export function ExamTopBar({
  paper,
  currentSectionIndex,
  remainingMs,
  remainingMsBySection,
  onSelectSection,
}: Props) {
  return (
    <header className="exam-topbar">
      <div className="candidate">
        <div>
          <strong>Candidate:</strong> Practice User
        </div>
        <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>{paper.title}</div>
      </div>

      <div className="sections" role="tablist" aria-label="Exam sections">
        {paper.sections.map((section, index) => {
          const sectionLeft = remainingMsBySection[section.id] ?? 0
          const expired = sectionLeft <= 0
          const cls = [
            'section-tab',
            index === currentSectionIndex ? 'active' : '',
            expired ? 'expired' : '',
          ]
            .filter(Boolean)
            .join(' ')
          return (
            <button
              key={section.id}
              type="button"
              role="tab"
              aria-selected={index === currentSectionIndex}
              className={cls}
              title={
                expired
                  ? `${section.name} — time over (view only)`
                  : `${section.name} — ${formatTime(sectionLeft)} left`
              }
              onClick={() => onSelectSection(index)}
            >
              {section.name}
            </button>
          )
        })}
      </div>

      <div className="timer-box" aria-live="polite">
        Time Left: {formatTime(remainingMs)}
      </div>
    </header>
  )
}
