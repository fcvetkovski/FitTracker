import { formatDate } from '../../utils/formatDate'
import type { PersonalRecord } from '../../types'

export function PersonalRecordsList({ records, limit }: { records: PersonalRecord[]; limit?: number }) {
  const visibleRecords = typeof limit === 'number' ? records.slice(0, limit) : records

  if (visibleRecords.length === 0) {
    return <div className="empty-state">No personal records yet.</div>
  }

  return (
    <div className="list-stack">
      {visibleRecords.map((record) => (
        <article className="mini-card" key={record.exerciseId}>
          <div>
            <strong>{record.exerciseName}</strong>
            <span>{formatDate(record.date ?? record.workoutDate)}</span>
          </div>
          <b>{record.maxWeight ?? record.weight ?? 0} kg x {record.reps}</b>
        </article>
      ))}
    </div>
  )
}
