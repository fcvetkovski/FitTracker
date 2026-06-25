import { Button } from '../common/Button'
import { calculateVolume } from '../../utils/calculateVolume'
import type { WorkoutEntry } from '../../types'

interface WorkoutEntryListProps {
  entries: WorkoutEntry[]
  onEdit: (entry: WorkoutEntry) => void
  onDelete: (entry: WorkoutEntry) => void
}

export function WorkoutEntryList({ entries, onEdit, onDelete }: WorkoutEntryListProps) {
  if (entries.length === 0) {
    return <div className="empty-state">No entries added yet.</div>
  }

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Volume</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.exerciseName}</td>
              <td>{entry.sets}</td>
              <td>{entry.reps}</td>
              <td>{entry.weight} kg</td>
              <td>{calculateVolume(entry).toLocaleString()} kg</td>
              <td className="row-actions">
                <Button variant="secondary" onClick={() => onEdit(entry)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => onDelete(entry)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
