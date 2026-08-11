import type { AttemptResult, PersistedExamSession } from '../types/exam'

const SESSION_KEY = 'sbi-clerk-mock:session'
const RESULT_KEY_PREFIX = 'sbi-clerk-mock:result:'
const LAST_RESULT_KEY = 'sbi-clerk-mock:last-result-id'

export function saveSession(session: PersistedExamSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function loadSession(): PersistedExamSession | null {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as PersistedExamSession
  } catch {
    return null
  }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}

export function saveResult(result: AttemptResult): void {
  localStorage.setItem(
    `${RESULT_KEY_PREFIX}${result.attemptId}`,
    JSON.stringify(result),
  )
  localStorage.setItem(LAST_RESULT_KEY, result.attemptId)
}

export function loadResult(attemptId: string): AttemptResult | null {
  const raw = localStorage.getItem(`${RESULT_KEY_PREFIX}${attemptId}`)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AttemptResult
  } catch {
    return null
  }
}

export function getLastResultId(): string | null {
  return localStorage.getItem(LAST_RESULT_KEY)
}
