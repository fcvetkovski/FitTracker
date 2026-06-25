import { useEffect, useState } from 'react'
import { Button } from '../common/Button'
import { ErrorMessage } from '../common/ErrorMessage'
import { Input } from '../common/Input'
import { todayInputValue } from '../../utils/formatDate'
import type { Workout } from '../../types'
import type { WorkoutPayload } from '../../api/workoutApi'

interface WorkoutFormProps {
  workout?: Workout | null
  onSubmit: (payload: WorkoutPayload) => Promise<void>
  onCancel?: () => void
}

export function WorkoutForm({ workout, onSubmit, onCancel }: WorkoutFormProps) {
  const [form, setForm] = useState<WorkoutPayload>({ name: '', date: todayInputValue(), notes: '' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (workout) {
      setForm({ name: workout.name, date: workout.date, notes: workout.notes ?? '' })
    }
  }, [workout])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    if (!form.name.trim()) {
      setError('Workout name is required.')
      return
    }
    if (!form.date) {
      setError('Workout date is required.')
      return
    }
    if (form.date > todayInputValue()) {
      setError('Workout date cannot be in the future.')
      return
    }

    setSaving(true)
    try {
      await onSubmit({ ...form, name: form.name.trim() })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save workout.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="panel stack" onSubmit={submit}>
      <ErrorMessage message={error} />
      <Input label="Workout name" name="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
      <Input label="Date" name="date" type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
      <label className="field">
        <span>Notes</span>
        <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} rows={4} />
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
