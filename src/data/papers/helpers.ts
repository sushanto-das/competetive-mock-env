import type { Question, QuestionFigure } from '../../types/exam'

/** Shorthand for a standard Prelims MCQ (+1 / −0.25). */
export function q(
  id: string,
  text: string,
  options: string[],
  correctIndex: number,
  figure?: QuestionFigure,
): Question {
  return {
    id,
    text,
    options,
    correctIndex,
    marks: 1,
    negativeMarks: 0.25,
    ...(figure ? { figure } : {}),
  }
}
