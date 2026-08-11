import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PaletteLegend } from '../components/exam/PaletteLegend'
import { getPaperById } from '../lib/papers'
import { useExamStore } from '../store/examStore'

export function InstructionsPage() {
  const { paperId = '' } = useParams()
  const paper = getPaperById(paperId)
  const navigate = useNavigate()
  const startExam = useExamStore((s) => s.startExam)
  const [ready, setReady] = useState(false)

  if (!paper) {
    return (
      <div className="app-page">
        <h1>Paper not found</h1>
        <p className="lede">No paper with id “{paperId}”.</p>
        <Link className="btn" to="/">
          Back to home
        </Link>
      </div>
    )
  }

  const handleStart = () => {
    if (!ready) return
    const ok = startExam(paper.id)
    if (ok) navigate(`/exam/${paper.id}`, { replace: true })
  }

  return (
    <div className="app-page">
      <h1>Instructions</h1>
      <p className="lede">{paper.title}</p>

      <div className="instructions-box">
        <h2>General instructions</h2>
        <ul>
          <li>
            The test has <strong>3 sections</strong> with a fixed time of{' '}
            <strong>20 minutes</strong> each (total 60 minutes).
          </li>
          <li>
            You can switch between sections anytime using the section tabs at
            the top (English / Numerical / Reasoning). Each section still has
            its own 20-minute timer — only the active section’s timer runs.
          </li>
          <li>
            When a section’s time ends, you can still view it, but you cannot
            change answers there. Switch to another section that still has time.
            When all section timers end, the test is submitted automatically.
          </li>
          <li>
            Each correct answer carries <strong>+1</strong> mark. Each wrong
            answer deducts <strong>0.25</strong> marks. Unanswered questions
            carry no penalty.
          </li>
          <li>
            Select an option, then click <strong>Save &amp; Next</strong> to
            save your answer. Selecting an option alone does not save it.
          </li>
          <li>
            Jumping via the question palette does <strong>not</strong> save the
            current answer.
          </li>
          <li>
            <strong>Mark for Review &amp; Next</strong> saves any selected
            answer and flags the question for review. Answered + marked
            questions are counted in evaluation.
          </li>
          <li>
            You may submit the test early at any time using <strong>Submit Test</strong>.
          </li>
        </ul>

        <h2 style={{ marginTop: 16 }}>Question palette legend</h2>
        <PaletteLegend />
      </div>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={ready}
          onChange={(e) => setReady(e.target.checked)}
        />
        <span>
          I have read and understood the instructions and am ready to begin.
        </span>
      </label>

      <div style={{ display: 'flex', gap: 8 }}>
        <Link className="btn btn-secondary" to="/">
          Cancel
        </Link>
        <button
          type="button"
          className="btn btn-success"
          disabled={!ready}
          onClick={handleStart}
        >
          I am ready to begin
        </button>
      </div>
    </div>
  )
}
