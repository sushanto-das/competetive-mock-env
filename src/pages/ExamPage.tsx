import { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ExamShell } from '../components/exam/ExamShell'
import { loadSession } from '../lib/persistence'
import { useExamStore } from '../store/examStore'

export function ExamPage() {
  const { paperId = '' } = useParams()
  const [params] = useSearchParams()
  const status = useExamStore((s) => s.status)
  const paper = useExamStore((s) => s.paper)
  const resumeExam = useExamStore((s) => s.resumeExam)

  useEffect(() => {
    if (status === 'in-progress' && paper?.id === paperId) return
    const session = loadSession()
    const shouldResume =
      params.get('resume') === '1' ||
      (session?.status === 'in-progress' && session.paperId === paperId)
    if (shouldResume) {
      resumeExam()
    }
  }, [paperId, params, status, paper, resumeExam])

  if (status !== 'in-progress' || paper?.id !== paperId) {
    return (
      <div className="app-page">
        <h1>No active exam</h1>
        <p className="lede">
          Start from the instructions page, or resume an in-progress attempt
          from home.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link className="btn" to={`/instructions/${paperId}`}>
            Go to instructions
          </Link>
          <Link className="btn btn-secondary" to="/">
            Home
          </Link>
        </div>
      </div>
    )
  }

  return <ExamShell />
}
