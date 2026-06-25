import { Button } from '../common/Button'
import type { Exercise } from '../../types'

interface ExerciseCardProps {
  exercise: Exercise
  onEdit: (exercise: Exercise) => void
  onDelete: (exercise: Exercise) => void
}

export function ExerciseCard({ exercise, onEdit, onDelete }: ExerciseCardProps) {
  return (
    <article className="card">
      <div className="card-header">
        <div>
          <h3>{exercise.name}</h3>
          <p>{exercise.description || 'No description added.'}</p>
        </div>
        <span className="pill">{exercise.muscleGroup.replace('_', ' ')}</span>
      </div>
      <div className="meta-row">
        <span>{exercise.type}</span>
      </div>
      <div className="actions">
        <Button variant="secondary" onClick={() => onEdit(exercise)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(exercise)}>
          Delete
        </Button>
      </div>
    </article>
  )
}
