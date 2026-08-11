import type { Question } from '../../types/exam'
import { OptionList } from './OptionList'
import { QuestionFigureView } from './QuestionFigure'

type Props = {
  questionNumber: number
  totalInSection: number
  sectionName: string
  question: Question
  selectedIndex: number | null
  onSelect: (index: number) => void
  disabled?: boolean
}

export function QuestionPanel({
  questionNumber,
  totalInSection,
  sectionName,
  question,
  selectedIndex,
  onSelect,
  disabled,
}: Props) {
  return (
    <div className="question-panel">
      <div className="question-meta">
        {sectionName} — Question {questionNumber} of {totalInSection}
      </div>
      {question.figure && <QuestionFigureView figure={question.figure} />}
      <div className="question-text">{question.text}</div>
      <OptionList
        options={question.options}
        selectedIndex={selectedIndex}
        onSelect={onSelect}
        disabled={disabled}
      />
    </div>
  )
}
