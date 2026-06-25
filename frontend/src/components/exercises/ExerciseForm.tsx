import { useEffect, useState } from 'react'
import { Button } from '../common/Button'
import { ErrorMessage } from '../common/ErrorMessage'
import { Input } from '../common/Input'
import { Select } from '../common/Select'
import type { Exercise, MuscleGroup } from '../../types'
import type { ExercisePayload } from '../../api/exerciseApi'

const muscleGroups = ['CHEST', 'BACK', 'SHOULDERS', 'ARMS', 'LEGS', 'CORE', 'FULL_BODY', 'CARDIO', 'OTHER']
const exerciseTypes = ['STRENGTH', 'CARDIO', 'MOBILITY', 'BODYWEIGHT', 'OTHER']

interface ExerciseFormProps {
  exercise?: Exercise | null
  onSubmit: (payload: ExercisePayload) => Promise<void>
  onCancel?: () => void
}

export function ExerciseForm({ exercise, onSubmit, onCancel }: ExerciseFormProps) {
  const [form, setForm] = useState<ExercisePayload>({
    name: '',
    muscleGroup: 'CHEST',
    type: 'STRENGTH',
    description: '',
  })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (exercise) {
      setForm({
        name: exercise.name,
        muscleGroup: exercise.muscleGroup,
        type: exercise.type,
        description: exercise.description ?? '',
      })
    }
  }, [exercise])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (!form.name.trim()) {
      setError('Exercise name is required.')
      return
    }

    setSaving(true)
    try {
      await onSubmit({ ...form, name: form.name.trim() })
      if (!exercise) {
        setForm({ name: '', muscleGroup: 'CHEST', type: 'STRENGTH', description: '' })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save exercise.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="stack" onSubmit={submit}>
      <ErrorMessage message={error} />
      <Input label="Name" name="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
      <div className="form-grid">
        <Select
          label="Muscle group"
          name="muscleGroup"
          value={form.muscleGroup}
          options={muscleGroups.map((value) => ({ value, label: value.replace('_', ' ') }))}
          onChange={(event) => setForm({ ...form, muscleGroup: event.target.value as MuscleGroup })}
        />
        <Select
          label="Type"
          name="type"
          value={form.type}
          options={exerciseTypes.map((value) => ({ value, label: value }))}
          onChange={(event) => setForm({ ...form, type: event.target.value })}
        />
      </div>
      <label className="field">
        <span>Description</span>
        <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={3} />
      </label>
      <div className="actions">
        <Button type="submit" disabled={saving}>
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
