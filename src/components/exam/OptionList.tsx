type Props = {
  options: string[]
  selectedIndex: number | null
  onSelect: (index: number) => void
  disabled?: boolean
}

export function OptionList({
  options,
  selectedIndex,
  onSelect,
  disabled,
}: Props) {
  return (
    <div className="option-list" role="radiogroup" aria-label="Answer options">
      {options.map((option, index) => {
        const selected = selectedIndex === index
        return (
          <label
            key={index}
            className={`option-row${selected ? ' selected' : ''}`}
          >
            <input
              type="radio"
              name="answer"
              checked={selected}
              disabled={disabled}
              onChange={() => onSelect(index)}
              onClick={() => {
                // Allow deselect via store toggle when clicking selected
                if (selected) onSelect(index)
              }}
            />
            <span>
              <strong>{String.fromCharCode(65 + index)}.</strong> {option}
            </span>
          </label>
        )
      })}
    </div>
  )
}
