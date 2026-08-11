import { create } from 'zustand'
import { getPaperById } from '../lib/papers'
import {
  clearSession,
  loadSession,
  saveResult,
  saveSession,
} from '../lib/persistence'
import { scoreAttempt } from '../lib/scoring'
import type {
  AttemptResult,
  Paper,
  PersistedExamSession,
  QuestionState,
} from '../types/exam'

type ExamStatus = 'idle' | 'in-progress' | 'submitted'

type ExamStore = {
  paper: Paper | null
  attemptId: string | null
  status: ExamStatus
  currentSectionIndex: number
  currentQuestionIndex: number
  questionIndexBySection: Record<string, number>
  remainingMsBySection: Record<string, number>
  questionStates: Record<string, QuestionState>
  result: AttemptResult | null
  showSubmitConfirm: boolean

  startExam: (paperId: string) => boolean
  resumeExam: () => boolean
  selectOption: (optionIndex: number) => void
  clearResponse: () => void
  saveAndNext: () => void
  markForReviewAndNext: () => void
  goToQuestion: (questionIndex: number) => void
  goToSection: (sectionIndex: number) => void
  goToPrevious: () => void
  tick: (deltaMs: number) => void
  requestSubmit: () => void
  cancelSubmit: () => void
  confirmSubmit: () => AttemptResult | null
  reset: () => void
  persist: () => void
}

function findSectionWithTime(
  paper: Paper,
  remainingMsBySection: Record<string, number>,
  preferAfterIndex: number,
): number | null {
  const n = paper.sections.length
  for (let offset = 1; offset <= n; offset += 1) {
    const idx = (preferAfterIndex + offset) % n
    const section = paper.sections[idx]
    if ((remainingMsBySection[section.id] ?? 0) > 0) return idx
  }
  return null
}

function createEmptyState(): QuestionState {
  return {
    visited: false,
    markedForReview: false,
    committedAnswer: null,
    draftAnswer: null,
  }
}

function ensureState(
  states: Record<string, QuestionState>,
  questionId: string,
): QuestionState {
  if (!states[questionId]) {
    states[questionId] = createEmptyState()
  }
  return states[questionId]
}

function markVisited(
  states: Record<string, QuestionState>,
  questionId: string,
): void {
  const state = ensureState(states, questionId)
  state.visited = true
}

function newAttemptId(): string {
  return `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function buildRemaining(paper: Paper): Record<string, number> {
  const map: Record<string, number> = {}
  for (const section of paper.sections) {
    map[section.id] = section.durationSeconds * 1000
  }
  return map
}

function getCurrentQuestionId(
  paper: Paper,
  sectionIndex: number,
  questionIndex: number,
): string {
  return paper.sections[sectionIndex].questions[questionIndex].id
}

export const useExamStore = create<ExamStore>((set, get) => ({
  paper: null,
  attemptId: null,
  status: 'idle',
  currentSectionIndex: 0,
  currentQuestionIndex: 0,
  questionIndexBySection: {},
  remainingMsBySection: {},
  questionStates: {},
  result: null,
  showSubmitConfirm: false,

  startExam: (paperId) => {
    const paper = getPaperById(paperId)
    if (!paper) return false

    const questionStates: Record<string, QuestionState> = {}
    const firstId = paper.sections[0].questions[0].id
    markVisited(questionStates, firstId)
    const questionIndexBySection: Record<string, number> = {}
    for (const section of paper.sections) {
      questionIndexBySection[section.id] = 0
    }

    set({
      paper,
      attemptId: newAttemptId(),
      status: 'in-progress',
      currentSectionIndex: 0,
      currentQuestionIndex: 0,
      questionIndexBySection,
      remainingMsBySection: buildRemaining(paper),
      questionStates,
      result: null,
      showSubmitConfirm: false,
    })
    get().persist()
    return true
  },

  resumeExam: () => {
    const session = loadSession()
    if (!session || session.status !== 'in-progress') return false
    const paper = getPaperById(session.paperId)
    if (!paper) {
      clearSession()
      return false
    }

    const questionIndexBySection: Record<string, number> = {
      ...(session.questionIndexBySection ?? {}),
    }
    for (const section of paper.sections) {
      if (questionIndexBySection[section.id] == null) {
        questionIndexBySection[section.id] = 0
      }
    }
    const currentSection = paper.sections[session.currentSectionIndex]
    if (currentSection) {
      questionIndexBySection[currentSection.id] = session.currentQuestionIndex
    }

    set({
      paper,
      attemptId: session.attemptId,
      status: 'in-progress',
      currentSectionIndex: session.currentSectionIndex,
      currentQuestionIndex: session.currentQuestionIndex,
      questionIndexBySection,
      remainingMsBySection: session.remainingMsBySection,
      questionStates: session.questionStates,
      result: null,
      showSubmitConfirm: false,
    })
    return true
  },

  selectOption: (optionIndex) => {
    const {
      paper,
      status,
      currentSectionIndex,
      currentQuestionIndex,
      questionStates,
      remainingMsBySection,
    } = get()
    if (!paper || status !== 'in-progress') return
    const section = paper.sections[currentSectionIndex]
    if ((remainingMsBySection[section.id] ?? 0) <= 0) return
    const qid = getCurrentQuestionId(paper, currentSectionIndex, currentQuestionIndex)
    const next = { ...questionStates }
    const state = { ...ensureState(next, qid) }
    // Toggle off if same option clicked again (official behavior)
    state.draftAnswer =
      state.draftAnswer === optionIndex ? null : optionIndex
    state.visited = true
    next[qid] = state
    set({ questionStates: next })
    get().persist()
  },

  clearResponse: () => {
    const {
      paper,
      status,
      currentSectionIndex,
      currentQuestionIndex,
      questionStates,
      remainingMsBySection,
    } = get()
    if (!paper || status !== 'in-progress') return
    const section = paper.sections[currentSectionIndex]
    if ((remainingMsBySection[section.id] ?? 0) <= 0) return
    const qid = getCurrentQuestionId(paper, currentSectionIndex, currentQuestionIndex)
    const next = { ...questionStates }
    const state = { ...ensureState(next, qid) }
    state.draftAnswer = null
    state.committedAnswer = null
    state.visited = true
    next[qid] = state
    set({ questionStates: next })
    get().persist()
  },

  saveAndNext: () => {
    const {
      paper,
      status,
      currentSectionIndex,
      currentQuestionIndex,
      questionStates,
      questionIndexBySection,
      remainingMsBySection,
    } = get()
    if (!paper || status !== 'in-progress') return

    const section = paper.sections[currentSectionIndex]
    if ((remainingMsBySection[section.id] ?? 0) <= 0) return
    const qid = section.questions[currentQuestionIndex].id
    const next = { ...questionStates }
    const state = { ...ensureState(next, qid) }
    state.committedAnswer = state.draftAnswer
    state.markedForReview = false
    state.visited = true
    next[qid] = state

    let qIndex = currentQuestionIndex
    if (qIndex < section.questions.length - 1) {
      qIndex += 1
      markVisited(next, section.questions[qIndex].id)
      const nextState = ensureState(next, section.questions[qIndex].id)
      if (nextState.draftAnswer == null && nextState.committedAnswer != null) {
        nextState.draftAnswer = nextState.committedAnswer
      }
    }

    set({
      questionStates: next,
      currentQuestionIndex: qIndex,
      questionIndexBySection: {
        ...questionIndexBySection,
        [section.id]: qIndex,
      },
    })
    get().persist()
  },

  markForReviewAndNext: () => {
    const {
      paper,
      status,
      currentSectionIndex,
      currentQuestionIndex,
      questionStates,
      questionIndexBySection,
      remainingMsBySection,
    } = get()
    if (!paper || status !== 'in-progress') return

    const section = paper.sections[currentSectionIndex]
    if ((remainingMsBySection[section.id] ?? 0) <= 0) return
    const qid = section.questions[currentQuestionIndex].id
    const next = { ...questionStates }
    const state = { ...ensureState(next, qid) }
    state.committedAnswer = state.draftAnswer
    state.markedForReview = true
    state.visited = true
    next[qid] = state

    let qIndex = currentQuestionIndex
    if (qIndex < section.questions.length - 1) {
      qIndex += 1
      markVisited(next, section.questions[qIndex].id)
      const nextState = ensureState(next, section.questions[qIndex].id)
      if (nextState.draftAnswer == null && nextState.committedAnswer != null) {
        nextState.draftAnswer = nextState.committedAnswer
      }
    }

    set({
      questionStates: next,
      currentQuestionIndex: qIndex,
      questionIndexBySection: {
        ...questionIndexBySection,
        [section.id]: qIndex,
      },
    })
    get().persist()
  },

  goToQuestion: (questionIndex) => {
    const {
      paper,
      status,
      currentSectionIndex,
      questionStates,
      questionIndexBySection,
    } = get()
    if (!paper || status !== 'in-progress') return
    const section = paper.sections[currentSectionIndex]
    if (questionIndex < 0 || questionIndex >= section.questions.length) return

    // Palette jump does NOT save current answer
    const next = { ...questionStates }
    const targetId = section.questions[questionIndex].id
    markVisited(next, targetId)
    const target = ensureState(next, targetId)
    if (target.draftAnswer == null && target.committedAnswer != null) {
      target.draftAnswer = target.committedAnswer
    }

    set({
      currentQuestionIndex: questionIndex,
      questionIndexBySection: {
        ...questionIndexBySection,
        [section.id]: questionIndex,
      },
      questionStates: next,
    })
    get().persist()
  },

  goToSection: (sectionIndex) => {
    const {
      paper,
      status,
      currentSectionIndex,
      currentQuestionIndex,
      questionStates,
      questionIndexBySection,
      remainingMsBySection,
    } = get()
    if (!paper || status !== 'in-progress') return
    if (sectionIndex < 0 || sectionIndex >= paper.sections.length) return
    if (sectionIndex === currentSectionIndex) return

    const currentSection = paper.sections[currentSectionIndex]
    const targetSection = paper.sections[sectionIndex]

    // Remember position in the section we leave
    const remembered = {
      ...questionIndexBySection,
      [currentSection.id]: currentQuestionIndex,
    }

    let qIndex = remembered[targetSection.id] ?? 0
    if (qIndex < 0 || qIndex >= targetSection.questions.length) qIndex = 0

    const next = { ...questionStates }
    const targetId = targetSection.questions[qIndex].id
    markVisited(next, targetId)
    const target = ensureState(next, targetId)
    if (target.draftAnswer == null && target.committedAnswer != null) {
      target.draftAnswer = target.committedAnswer
    }

    set({
      currentSectionIndex: sectionIndex,
      currentQuestionIndex: qIndex,
      questionIndexBySection: {
        ...remembered,
        [targetSection.id]: qIndex,
      },
      questionStates: next,
      // keep remaining times as-is; expired sections stay at 0
      remainingMsBySection,
    })
    get().persist()
  },

  goToPrevious: () => {
    const { currentQuestionIndex } = get()
    if (currentQuestionIndex <= 0) return
    get().goToQuestion(currentQuestionIndex - 1)
  },

  tick: (deltaMs) => {
    const {
      paper,
      status,
      currentSectionIndex,
      remainingMsBySection,
      questionStates,
      questionIndexBySection,
      currentQuestionIndex,
    } = get()
    if (!paper || status !== 'in-progress') return

    const section = paper.sections[currentSectionIndex]
    const currentLeft = remainingMsBySection[section.id] ?? 0
    // Viewing an expired section: don't count time; only auto-submit if ALL are done
    if (currentLeft <= 0) {
      const anyLeft = paper.sections.some(
        (s) => (remainingMsBySection[s.id] ?? 0) > 0,
      )
      if (!anyLeft) get().confirmSubmit()
      return
    }

    const remaining = Math.max(0, currentLeft - deltaMs)
    const nextRemaining = {
      ...remainingMsBySection,
      [section.id]: remaining,
    }

    if (remaining > 0) {
      set({ remainingMsBySection: nextRemaining })
      return
    }

    // This section just expired — move to another with time left, else submit
    const nextIdx = findSectionWithTime(paper, nextRemaining, currentSectionIndex)
    if (nextIdx == null) {
      set({ remainingMsBySection: nextRemaining })
      get().confirmSubmit()
      return
    }

    const nextSection = paper.sections[nextIdx]
    const remembered = {
      ...questionIndexBySection,
      [section.id]: currentQuestionIndex,
    }
    let qIndex = remembered[nextSection.id] ?? 0
    if (qIndex < 0 || qIndex >= nextSection.questions.length) qIndex = 0

    const nextStates = { ...questionStates }
    markVisited(nextStates, nextSection.questions[qIndex].id)
    const first = ensureState(nextStates, nextSection.questions[qIndex].id)
    if (first.draftAnswer == null && first.committedAnswer != null) {
      first.draftAnswer = first.committedAnswer
    }

    set({
      remainingMsBySection: nextRemaining,
      currentSectionIndex: nextIdx,
      currentQuestionIndex: qIndex,
      questionIndexBySection: {
        ...remembered,
        [nextSection.id]: qIndex,
      },
      questionStates: nextStates,
    })
    get().persist()
  },

  requestSubmit: () => set({ showSubmitConfirm: true }),
  cancelSubmit: () => set({ showSubmitConfirm: false }),

  confirmSubmit: () => {
    const { paper, attemptId, questionStates, status } = get()
    if (!paper || !attemptId || status !== 'in-progress') return null

    const result = scoreAttempt(paper, questionStates, attemptId)
    saveResult(result)
    clearSession()
    set({
      status: 'submitted',
      result,
      showSubmitConfirm: false,
    })
    return result
  },

  reset: () => {
    clearSession()
    set({
      paper: null,
      attemptId: null,
      status: 'idle',
      currentSectionIndex: 0,
      currentQuestionIndex: 0,
      questionIndexBySection: {},
      remainingMsBySection: {},
      questionStates: {},
      result: null,
      showSubmitConfirm: false,
    })
  },

  persist: () => {
    const {
      paper,
      attemptId,
      status,
      currentSectionIndex,
      currentQuestionIndex,
      questionIndexBySection,
      remainingMsBySection,
      questionStates,
    } = get()
    if (!paper || !attemptId || status !== 'in-progress') return

    const session: PersistedExamSession = {
      attemptId,
      paperId: paper.id,
      currentSectionIndex,
      currentQuestionIndex,
      questionIndexBySection,
      remainingMsBySection,
      questionStates,
      startedAt: new Date().toISOString(),
      status: 'in-progress',
    }
    saveSession(session)
  },
}))
