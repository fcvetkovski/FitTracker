import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { getErrorMessage } from '../api/axiosClient'
import { Button } from '../components/common/Button'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { Modal } from '../components/common/Modal'
import { WorkoutEntryForm } from '../components/workouts/WorkoutEntryForm'
import { WorkoutEntryList } from '../components/workouts/WorkoutEntryList'
import { useExercises } from '../hooks/useExercises'
import { useWorkout } from '../hooks/useWorkouts'
import { calculateWorkoutVolume } from '../utils/calculateVolume'
import { formatDate } from '../utils/formatDate'
import type { WorkoutEntry } from '../types'

export function WorkoutDetailsPage() {
  const id = Number(useParams().id)
  const { workout, loading, error, addEntry, updateEntry, deleteEntry } = useWorkout(id)
  const { exercises } = useExercises()
  const [showEntryForm, setShowEntryForm] = useState(false)
  const [editingEntry, setEditingEntry] = useState<WorkoutEntry | null>(null)
  const [mutationError, setMutationError] = useState('')

  if (loading) return <LoadingSpinner />
  if (!workout) return <ErrorMessage message={error || 'Workout not found.'} />

  const removeEntry = async (entry: WorkoutEntry) => {
    if (!window.confirm(`Delete ${entry.exerciseName} entry?`)) return
    setMutationError('')
    try {
      await deleteEntry(entry.id)
    } catch (err) {
      setMutationError(getErrorMessage(err))
    }
  }

  return (
    <section className="stack page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">{formatDate(workout.date)}</p>
          <h1>{workout.name}</h1>
          <p>{workout.notes || 'No notes added.'}</p>
        </div>
        <div className="actions">
          <Link className="btn btn-secondary" to={`/workouts/${workout.id}/edit`}>
            Edit
          </Link>
          <Button onClick={() => setShowEntryForm(true)}>Add Entry</Button>
        </div>
      </div>
      <ErrorMessage message={error || mutationError} />
      <div className="summary-grid compact">
        <article className="stat-card">
          <span>Entries</span>
          <strong>{workout.entries.length}</strong>
        </article>
        <article className="stat-card">
          <span>Total volume</span>
          <strong>{calculateWorkoutVolume(workout.entries).toLocaleString()} kg</strong>
        </article>
      </div>
      <WorkoutEntryList entries={workout.entries} onEdit={setEditingEntry} onDelete={removeEntry} />
      {showEntryForm && (
        <Modal title="Add workout entry" onClose={() => setShowEntryForm(false)}>
          <WorkoutEntryForm
            exercises={exercises}
            onSubmit={async (payload) => {
              await addEntry(payload)
              setShowEntryForm(false)
            }}
          />
        </Modal>
      )}
      {editingEntry && (
        <Modal title="Edit workout entry" onClose={() => setEditingEntry(null)}>
          <WorkoutEntryForm
            exercises={exercises}
            entry={editingEntry}
            onSubmit={async (payload) => {
              await updateEntry(editingEntry.id, payload)
              setEditingEntry(null)
            }}
          />
        </Modal>
      )}
    </section>
  )
}
