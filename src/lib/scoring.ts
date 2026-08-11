import type {
  AttemptResult,
  Paper,
  QuestionState,
  SectionScore,
} from '../types/exam'

export function isAnswerCommitted(state: QuestionState | undefined): boolean {
  return state?.committedAnswer != null
}

export function getQuestionStatus(
  state: QuestionState | undefined,
): 'not-visited' | 'not-answered' | 'answered' | 'marked' | 'answered-marked' {
  if (!state || !state.visited) return 'not-visited'
  const answered = state.committedAnswer != null
  if (state.markedForReview && answered) return 'answered-marked'
  if (state.markedForReview) return 'marked'
  if (answered) return 'answered'
  return 'not-answered'
}

export function scoreAttempt(
  paper: Paper,
  questionStates: Record<string, QuestionState>,
  attemptId: string,
): AttemptResult {
  const answers: Record<string, number | null> = {}
  const sections: SectionScore[] = []
  let totalMarks = 0
  let maxMarks = 0

  for (const section of paper.sections) {
    let attempted = 0
    let correct = 0
    let incorrect = 0
    let unanswered = 0
    let marks = 0
    let sectionMax = 0

    for (const question of section.questions) {
      sectionMax += question.marks
      const state = questionStates[question.id]
      const committed = state?.committedAnswer ?? null
      answers[question.id] = committed

      if (committed == null) {
        unanswered += 1
        continue
      }

      attempted += 1
      if (committed === question.correctIndex) {
        correct += 1
        marks += question.marks
      } else {
        incorrect += 1
        marks -= question.negativeMarks
      }
    }

    totalMarks += marks
    maxMarks += sectionMax
    sections.push({
      sectionId: section.id,
      sectionName: section.name,
      totalQuestions: section.questions.length,
      attempted,
      correct,
      incorrect,
      unanswered,
      marks,
      maxMarks: sectionMax,
    })
  }

  return {
    attemptId,
    paperId: paper.id,
    paperTitle: paper.title,
    submittedAt: new Date().toISOString(),
    totalMarks: Math.round(totalMarks * 100) / 100,
    maxMarks,
    sections,
    answers,
  }
}

export function formatTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
