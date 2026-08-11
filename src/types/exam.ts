export type ExamKind = 'sbi-clerk-prelims'

/** Optional diagram / chart shown above the question text. */
export type QuestionFigure =
  | {
      type: 'line'
      title: string
      yLabel?: string
      xLabel?: string
      points: { label: string; value: number }[]
    }
  | {
      type: 'bar'
      title: string
      yLabel?: string
      bars: { label: string; value: number }[]
    }
  | {
      type: 'table'
      title: string
      headers: string[]
      rows: (string | number)[][]
    }

export type Question = {
  id: string
  text: string
  options: string[]
  correctIndex: number
  marks: number
  negativeMarks: number
  figure?: QuestionFigure
}

export type Section = {
  id: string
  name: string
  durationSeconds: number
  questions: Question[]
}

export type Paper = {
  id: string
  exam: ExamKind
  title: string
  sections: Section[]
}

export type PaperMeta = {
  id: string
  title: string
  exam: ExamKind
  totalQuestions: number
  totalMarks: number
  totalDurationSeconds: number
}

export type QuestionStatus =
  | 'not-visited'
  | 'not-answered'
  | 'answered'
  | 'marked'
  | 'answered-marked'

export type QuestionState = {
  visited: boolean
  markedForReview: boolean
  /** Committed answer (saved). null = no saved answer */
  committedAnswer: number | null
  /** Draft selection not yet saved */
  draftAnswer: number | null
}

export type SectionScore = {
  sectionId: string
  sectionName: string
  totalQuestions: number
  attempted: number
  correct: number
  incorrect: number
  unanswered: number
  marks: number
  maxMarks: number
}

export type AttemptResult = {
  attemptId: string
  paperId: string
  paperTitle: string
  submittedAt: string
  totalMarks: number
  maxMarks: number
  sections: SectionScore[]
  /** questionId -> committed answer index (or null) */
  answers: Record<string, number | null>
}

export type PersistedExamSession = {
  attemptId: string
  paperId: string
  currentSectionIndex: number
  currentQuestionIndex: number
  /** last question index visited per section id */
  questionIndexBySection?: Record<string, number>
  /** remaining ms per section id */
  remainingMsBySection: Record<string, number>
  questionStates: Record<string, QuestionState>
  startedAt: string
  status: 'in-progress'
}
