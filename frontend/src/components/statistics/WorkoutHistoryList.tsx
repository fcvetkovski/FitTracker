import { formatDate } from '../../utils/formatDate'
import type { WorkoutHistory } from '../../types'

export function WorkoutHistoryList({ history, limit }: { history: WorkoutHistory[]; limit?: number }) {
  const visibleHistory = typeof limit === 'number' ? history.slice(0, limit) : history

  if (visibleHistory.length === 0) {
    return <div className="empty-state">No workout history yet.</div>
  }

  return (
    <div className="list-stack">
      {visibleHistory.map((workout) => (
        <article className="mini-card" key={workout.workoutId}>
          <div>
            <strong>{workout.workoutName}</strong>
            <span>{formatDate(workout.date)}</span>
          </div>
          <b>{workout.totalVolume.toLocaleString()} kg</b>
        </article>
      ))}
    </div>
  )
}
