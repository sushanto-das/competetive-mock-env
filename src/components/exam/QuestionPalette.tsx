import { getQuestionStatus } from '../../lib/scoring'
import type { Question, QuestionState } from '../../types/exam'
import { PaletteLegend } from './PaletteLegend'

type Props = {
  questions: Question[]
  questionStates: Record<string, QuestionState>
  currentQuestionIndex: number
  onGoTo: (index: number) => void
}

export function QuestionPalette({
  questions,
  questionStates,
  currentQuestionIndex,
  onGoTo,
}: Props) {
  let answered = 0
  let notAnswered = 0
  let marked = 0
  let notVisited = 0

  for (const q of questions) {
    const status = getQuestionStatus(questionStates[q.id])
    if (status === 'answered' || status === 'answered-marked') answered += 1
    if (status === 'not-answered') notAnswered += 1
    if (status === 'marked' || status === 'answered-marked') marked += 1
    if (status === 'not-visited') notVisited += 1
  }

  return (
    <aside className="exam-side">
      <div>
        <strong style={{ fontSize: '0.9rem' }}>Question Palette</strong>
        <PaletteLegend />
      </div>

      <div className="palette-summary">
        <div>Answered: {answered}</div>
        <div>Not Answered: {notAnswered}</div>
        <div>Marked for Review: {marked}</div>
        <div>Not Visited: {notVisited}</div>
      </div>

      <div className="palette-grid">
        {questions.map((q, index) => {
          const status = getQuestionStatus(questionStates[q.id])
          const cls = [
            'palette-btn',
            status,
            index === currentQuestionIndex ? 'current' : '',
          ]
            .filter(Boolean)
            .join(' ')
          return (
            <button
              key={q.id}
              type="button"
              className={cls}
              onClick={() => onGoTo(index)}
              title={`Question ${index + 1}`}
            >
              {index + 1}
            </button>
          )
        })}
      </div>
    </aside>
  )
}
