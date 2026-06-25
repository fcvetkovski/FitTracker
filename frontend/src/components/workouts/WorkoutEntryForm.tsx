import { useEffect, useState } from 'react'
import { Button } from '../common/Button'
import { ErrorMessage } from '../common/ErrorMessage'
import { Input } from '../common/Input'
import { Select } from '../common/Select'
import type { Exercise, WorkoutEntry } from '../../types'
import type { WorkoutEntryPayload } from '../../api/workoutApi'

interface WorkoutEntryFormProps {
  exercises: Exercise[]
  entry?: WorkoutEntry | null
  onSubmit: (payload: WorkoutEntryPayload) => Promise<void>
  onCancel?: () => void
}

export function WorkoutEntryForm({ exercises, entry, onSubmit, onCancel }: WorkoutEntryFormProps) {
  const [form, setForm] = useState<WorkoutEntryPayload>({
    exerciseId: exercises[0]?.id ?? 0,
    sets: 3,
    reps: 10,
    weight: 0,
  })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (entry) {
      setForm({ exerciseId: entry.exerciseId, sets: entry.sets, reps: entry.reps, weight: entry.weight })
    } else if (exercises.length > 0 && form.exerciseId === 0) {
      setForm((current) => ({ ...current, exerciseId: exercises[0].id }))
    }
  }, [entry, exercises, form.exerciseId])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (!form.exerciseId) setError('Select an exercise.')
    else if (form.sets <= 0) setError('Sets must be greater than 0.')
    else if (form.reps <= 0) setError('Reps must be greater than 0.')
    else if (form.weight < 0) setError('Weight must be 0 or greater.')

    if (!form.exerciseId || form.sets <= 0 || form.reps <= 0 || form.weight < 0) return

    setSaving(true)
    try {
      await onSubmit(form)
      if (!entry) setForm({ exerciseId: exercises[0]?.id ?? 0, sets: 3, reps: 10, weight: 0 })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save entry.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="stack" onSubmit={submit}>
      <ErrorMessage message={error} />
      <Select
        label="Exercise"
        name="exerciseId"
        value={String(form.exerciseId)}
        options={exercises.map((exercise) => ({ value: String(exercise.id), label: exercise.name }))}
        onChange={(event) => setForm({ ...form, exerciseId: Number(event.target.value) })}
      />
      <div className="form-grid three">
        <Input label="Sets" type="number" min="1" value={form.sets} onChange={(event) => setForm({ ...form, sets: Number(event.target.value) })} />
        <Input label="Reps" type="number" min="1" value={form.reps} onChange={(event) => setForm({ ...form, reps: Number(event.target.value) })} />
        <Input label="Weight" type="number" min="0" step="0.5" value={form.weight} onChange={(event) => setForm({ ...form, weight: Number(event.target.value) })} />
      </div>
      <div className="actions">
        <Button type="submit" disabled={saving || exercises.length === 0}>
          {saving ? 'Saving...' : 'Save'}
        </Button>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
