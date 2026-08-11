import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useExamStore } from '../../store/examStore'
import { ActionBar } from './ActionBar'
import { ExamTopBar } from './ExamTopBar'
import { QuestionPalette } from './QuestionPalette'
import { QuestionPanel } from './QuestionPanel'

export function ExamShell() {
  const navigate = useNavigate()
  const paper = useExamStore((s) => s.paper)
  const status = useExamStore((s) => s.status)
  const currentSectionIndex = useExamStore((s) => s.currentSectionIndex)
  const currentQuestionIndex = useExamStore((s) => s.currentQuestionIndex)
  const remainingMsBySection = useExamStore((s) => s.remainingMsBySection)
  const questionStates = useExamStore((s) => s.questionStates)
  const showSubmitConfirm = useExamStore((s) => s.showSubmitConfirm)
  const attemptId = useExamStore((s) => s.attemptId)

  const selectOption = useExamStore((s) => s.selectOption)
  const clearResponse = useExamStore((s) => s.clearResponse)
  const saveAndNext = useExamStore((s) => s.saveAndNext)
  const markForReviewAndNext = useExamStore((s) => s.markForReviewAndNext)
  const goToQuestion = useExamStore((s) => s.goToQuestion)
  const goToSection = useExamStore((s) => s.goToSection)
  const goToPrevious = useExamStore((s) => s.goToPrevious)
  const tick = useExamStore((s) => s.tick)
  const persist = useExamStore((s) => s.persist)
  const requestSubmit = useExamStore((s) => s.requestSubmit)
  const cancelSubmit = useExamStore((s) => s.cancelSubmit)
  const confirmSubmit = useExamStore((s) => s.confirmSubmit)

  const lastTick = useRef<number | null>(null)
  const persistAccum = useRef(0)

  useEffect(() => {
    if (status !== 'in-progress') return

    let frame = 0
    const loop = (now: number) => {
      if (lastTick.current == null) lastTick.current = now
      const delta = now - lastTick.current
      lastTick.current = now
      if (delta > 0 && delta < 5000) {
        tick(delta)
        persistAccum.current += delta
        if (persistAccum.current >= 5000) {
          persistAccum.current = 0
          persist()
        }
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      lastTick.current = null
      persist()
    }
  }, [status, tick, persist])

  useEffect(() => {
    if (status === 'submitted' && attemptId) {
      navigate(`/result/${attemptId}`, { replace: true })
    }
  }, [status, attemptId, navigate])

  if (!paper || status !== 'in-progress') {
    return (
      <div className="app-page">
        <p>No active exam session.</p>
      </div>
    )
  }

  const section = paper.sections[currentSectionIndex]
  const question = section.questions[currentQuestionIndex]
  const qState = questionStates[question.id]
  const remainingMs = remainingMsBySection[section.id] ?? 0
  const sectionTimedOut = remainingMs <= 0

  const handleConfirm = () => {
    const result = confirmSubmit()
    if (result) navigate(`/result/${result.attemptId}`, { replace: true })
  }

  return (
    <div className="exam-shell">
      <ExamTopBar
        paper={paper}
        currentSectionIndex={currentSectionIndex}
        remainingMs={remainingMs}
        remainingMsBySection={remainingMsBySection}
        onSelectSection={goToSection}
      />

      <div className="exam-body">
        <div className="exam-main">
          {sectionTimedOut && (
            <div className="banner" style={{ margin: 0, borderRadius: 0 }}>
              Time for this section is over. You can view questions, but answers
              cannot be changed. Switch to another section tab to continue.
            </div>
          )}
          <QuestionPanel
            questionNumber={currentQuestionIndex + 1}
            totalInSection={section.questions.length}
            sectionName={section.name}
            question={question}
            selectedIndex={qState?.draftAnswer ?? null}
            onSelect={selectOption}
            disabled={sectionTimedOut}
          />
          <ActionBar
            canGoPrevious={currentQuestionIndex > 0}
            onPrevious={goToPrevious}
            onClear={clearResponse}
            onMarkForReview={markForReviewAndNext}
            onSaveAndNext={saveAndNext}
            disabled={sectionTimedOut}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <QuestionPalette
            questions={section.questions}
            questionStates={questionStates}
            currentQuestionIndex={currentQuestionIndex}
            onGoTo={goToQuestion}
          />
          <div className="side-actions" style={{ padding: '0 10px 10px' }}>
            <button
              type="button"
              className="btn btn-danger"
              onClick={requestSubmit}
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>

      {showSubmitConfirm && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <h3>Submit Test?</h3>
            <p>
              Once submitted, you cannot return to unanswered questions. Section
              timers will stop and your score will be calculated.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelSubmit}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirm}
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
