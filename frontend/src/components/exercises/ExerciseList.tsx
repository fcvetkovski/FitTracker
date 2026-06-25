import { ExerciseCard } from './ExerciseCard'
import type { Exercise } from '../../types'

interface ExerciseListProps {
  exercises: Exercise[]
  onEdit: (exercise: Exercise) => void
  onDelete: (exercise: Exercise) => void
}

export function ExerciseList({ exercises, onEdit, onDelete }: ExerciseListProps) {
  if (exercises.length === 0) {
    return <div className="empty-state">No exercises found.</div>
  }

  return (
    <div className="card-grid">
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
