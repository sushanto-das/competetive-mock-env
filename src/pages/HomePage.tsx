import { Link } from 'react-router-dom'
import { listPapers } from '../lib/papers'
import { loadSession } from '../lib/persistence'
import { formatTime } from '../lib/scoring'

export function HomePage() {
  const papers = listPapers()
  const session = loadSession()

  return (
    <div className="app-page">
      <h1>SBI Clerk Prelims Mock CBT</h1>
      <p className="lede">
        Single-user practice environment that simulates the banking exam
        computer-based test interface: sectional timers, question palette, and
        Save &amp; Next / Mark for Review flows.
      </p>

      {session && (
        <div className="banner">
          You have an in-progress attempt for paper{' '}
          <strong>{session.paperId}</strong>.{' '}
          <Link to={`/exam/${session.paperId}?resume=1`}>Resume exam</Link>
        </div>
      )}

      <div className="card-list">
        {papers.map((paper) => (
          <div key={paper.id} className="paper-card">
            <div>
              <h2>{paper.title}</h2>
              <p>
                {paper.totalQuestions} questions · {paper.totalMarks} marks ·{' '}
                {formatTime(paper.totalDurationSeconds * 1000)} (3 × 20 min
                sections)
              </p>
            </div>
            <Link className="btn" to={`/instructions/${paper.id}`}>
              Start
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
