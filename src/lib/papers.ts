import { papers } from '../data/papers'
import type { Paper, PaperMeta } from '../types/exam'

export function listPapers(): PaperMeta[] {
  return papers.map((paper) => {
    const totalQuestions = paper.sections.reduce(
      (sum, s) => sum + s.questions.length,
      0,
    )
    const totalMarks = paper.sections.reduce(
      (sum, s) => sum + s.questions.reduce((m, q) => m + q.marks, 0),
      0,
    )
    const totalDurationSeconds = paper.sections.reduce(
      (sum, s) => sum + s.durationSeconds,
      0,
    )
    return {
      id: paper.id,
      title: paper.title,
      exam: paper.exam,
      totalQuestions,
      totalMarks,
      totalDurationSeconds,
    }
  })
}

export function getPaperById(id: string): Paper | undefined {
  return papers.find((p) => p.id === id)
}
