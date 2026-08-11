import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPaperById } from '../lib/papers'
import { loadResult } from '../lib/persistence'

export function ResultPage() {
  const { attemptId = '' } = useParams()
  const result = useMemo(() => loadResult(attemptId), [attemptId])
  const paper = result ? getPaperById(result.paperId) : undefined
  const [showReview, setShowReview] = useState(false)

  if (!result) {
    return (
      <div className="app-page">
        <h1>Result not found</h1>
        <p className="lede">No saved result for this attempt.</p>
        <Link className="btn" to="/">
          Back to home
        </Link>
      </div>
    )
  }

  const attempted = result.sections.reduce((s, x) => s + x.attempted, 0)
  const correct = result.sections.reduce((s, x) => s + x.correct, 0)
  const accuracy =
    attempted > 0 ? Math.round((correct / attempted) * 1000) / 10 : 0

  return (
    <div className="app-page">
      <h1>Score Card</h1>
      <p className="lede">
        {result.paperTitle}
        <br />
        Submitted: {new Date(result.submittedAt).toLocaleString()}
      </p>

      <div className="result-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="result-stat">
          <span>Total Score</span>
          <strong>
            {result.totalMarks} / {result.maxMarks}
          </strong>
        </div>
        <div className="result-stat">
          <span>Attempted</span>
          <strong>{attempted}</strong>
        </div>
        <div className="result-stat">
          <span>Accuracy</span>
          <strong>{accuracy}%</strong>
        </div>
      </div>

      <h2 style={{ fontSize: '1.1rem', marginBottom: 0 }}>Section-wise</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>Section</th>
            <th>Attempted</th>
            <th>Correct</th>
            <th>Incorrect</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {result.sections.map((s) => (
            <tr key={s.sectionId}>
              <td>{s.sectionName}</td>
              <td>{s.attempted}</td>
              <td>{s.correct}</td>
              <td>{s.incorrect}</td>
              <td>
                {s.marks} / {s.maxMarks}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button
          type="button"
          className="btn"
          onClick={() => setShowReview((v) => !v)}
          disabled={!paper}
        >
          {showReview ? 'Hide review' : 'Review answers'}
        </button>
        <Link className="btn btn-secondary" to="/">
          Home
        </Link>
        {paper && (
          <Link className="btn btn-success" to={`/instructions/${paper.id}`}>
            Retake
          </Link>
        )}
      </div>

      {showReview && paper && (
        <div>
          {paper.sections.map((section) => (
            <div key={section.id} style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: '1rem' }}>{section.name}</h3>
              {section.questions.map((q, index) => {
                const chosen = result.answers[q.id]
                const isCorrect = chosen === q.correctIndex
                const statusClass =
                  chosen == null ? 'skip' : isCorrect ? 'ok' : 'bad'
                return (
                  <div key={q.id} className="review-block">
                    <div>
                      <strong>
                        Q{index + 1}. {q.text}
                      </strong>
                    </div>
                    <div className={statusClass} style={{ marginTop: 6 }}>
                      Your answer:{' '}
                      {chosen == null
                        ? 'Not answered'
                        : `${String.fromCharCode(65 + chosen)}. ${q.options[chosen]}`}
                    </div>
                    <div className="ok" style={{ marginTop: 4 }}>
                      Correct: {String.fromCharCode(65 + q.correctIndex)}.{' '}
                      {q.options[q.correctIndex]}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
