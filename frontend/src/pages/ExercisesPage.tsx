import { useMemo, useState } from 'react'
import { getErrorMessage } from '../api/axiosClient'
import { Button } from '../components/common/Button'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { Input } from '../components/common/Input'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { Modal } from '../components/common/Modal'
import { Select } from '../components/common/Select'
import { ExerciseForm } from '../components/exercises/ExerciseForm'
import { ExerciseList } from '../components/exercises/ExerciseList'
import { useExercises } from '../hooks/useExercises'
import type { Exercise } from '../types'

const muscleGroups = ['', 'CHEST', 'BACK', 'SHOULDERS', 'ARMS', 'LEGS', 'CORE', 'FULL_BODY', 'CARDIO', 'OTHER']

export function ExercisesPage() {
  const [search, setSearch] = useState('')
  const [muscleGroup, setMuscleGroup] = useState('')
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [mutationError, setMutationError] = useState('')
  const filters = useMemo(() => ({ name: search, muscleGroup }), [search, muscleGroup])
  const { exercises, loading, error, createExercise, updateExercise, deleteExercise } = useExercises(filters)

  const remove = async (exercise: Exercise) => {
    if (!window.confirm(`Delete ${exercise.name}?`)) return
    setMutationError('')
    try {
      await deleteExercise(exercise.id)
    } catch (err) {
      setMutationError(getErrorMessage(err))
    }
  }

  return (
    <section className="stack page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Movement library</p>
          <h1>Exercises</h1>
        </div>
        <Button onClick={() => setShowCreate(true)}>Add Exercise</Button>
      </div>
      <div className="toolbar">
        <Input label="Search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Bench press" />
        <Select
          label="Muscle group"
          value={muscleGroup}
          options={muscleGroups.map((value) => ({ value, label: value ? value.replace('_', ' ') : 'All muscle groups' }))}
          onChange={(event) => setMuscleGroup(event.target.value)}
        />
      </div>
      <ErrorMessage message={error || mutationError} />
      {loading ? <LoadingSpinner /> : <ExerciseList exercises={exercises} onEdit={setEditingExercise} onDelete={remove} />}
      {showCreate && (
        <Modal title="Add exercise" onClose={() => setShowCreate(false)}>
          <ExerciseForm
            onSubmit={async (payload) => {
              await createExercise(payload)
              setShowCreate(false)
            }}
          />
        </Modal>
      )}
      {editingExercise && (
        <Modal title="Edit exercise" onClose={() => setEditingExercise(null)}>
          <ExerciseForm
            exercise={editingExercise}
            onSubmit={async (payload) => {
              await updateExercise(editingExercise.id, payload)
              setEditingExercise(null)
            }}
          />
        </Modal>
      )}
    </section>
  )
}
