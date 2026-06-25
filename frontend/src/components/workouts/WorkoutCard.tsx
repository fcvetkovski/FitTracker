import { Link } from 'react-router-dom'
import { Button } from '../common/Button'
import { calculateWorkoutVolume } from '../../utils/calculateVolume'
import { formatDate } from '../../utils/formatDate'
import type { Workout } from '../../types'

interface WorkoutCardProps {
  workout: Workout
  onDelete: (workout: Workout) => void
}

export function WorkoutCard({ workout, onDelete }: WorkoutCardProps) {
  return (
    <article className="card">
      <div className="card-header">
        <div>
          <h3>{workout.name}</h3>
          <p>{formatDate(workout.date)}</p>
        </div>
        <span className="pill">{calculateWorkoutVolume(workout.entries).toLocaleString()} kg</span>
      </div>
      <p>{workout.notes || 'No notes added.'}</p>
      <div className="actions">
        <Link className="btn btn-primary" to={`/workouts/${workout.id}`}>
          Details
        </Link>
        <Link className="btn btn-secondary" to={`/workouts/${workout.id}/edit`}>
          Edit
        </Link>
        <Button variant="danger" onClick={() => onDelete(workout)}>
          Delete
        </Button>
      </div>
    </article>
  )
}
