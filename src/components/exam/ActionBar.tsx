type Props = {
  canGoPrevious: boolean
  onPrevious: () => void
  onClear: () => void
  onMarkForReview: () => void
  onSaveAndNext: () => void
  disabled?: boolean
}

export function ActionBar({
  canGoPrevious,
  onPrevious,
  onClear,
  onMarkForReview,
  onSaveAndNext,
  disabled,
}: Props) {
  return (
    <div className="action-bar">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onPrevious}
        disabled={!canGoPrevious}
      >
        Previous
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onClear}
        disabled={disabled}
      >
        Clear Response
      </button>
      <button
        type="button"
        className="btn"
        onClick={onMarkForReview}
        disabled={disabled}
      >
        Mark for Review &amp; Next
      </button>
      <button
        type="button"
        className="btn btn-success"
        onClick={onSaveAndNext}
        disabled={disabled}
      >
        Save &amp; Next
      </button>
    </div>
  )
}
