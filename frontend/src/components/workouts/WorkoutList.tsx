import { WorkoutCard } from './WorkoutCard'
import type { Workout } from '../../types'

interface WorkoutListProps {
  workouts: Workout[]
  onDelete: (workout: Workout) => void
}

export function WorkoutList({ workouts, onDelete }: WorkoutListProps) {
  if (workouts.length === 0) {
    return <div className="empty-state">No workouts found.</div>
  }

  return (
    <div className="card-grid">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} onDelete={onDelete} />
      ))}
    </div>
  )
}
