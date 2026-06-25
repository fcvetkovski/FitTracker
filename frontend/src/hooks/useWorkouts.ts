import { useCallback, useEffect, useState } from 'react'
import { getErrorMessage } from '../api/axiosClient'
import { workoutApi, type WorkoutEntryPayload, type WorkoutPayload } from '../api/workoutApi'
import type { Workout } from '../types'

export function useWorkouts(page = 0, size = 10) {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const result = await workoutApi.getAll(page, size)
      setWorkouts(result.content)
      setTotalPages(result.totalPages)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [page, size])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const deleteWorkout = async (id: number) => {
    await workoutApi.remove(id)
    await refresh()
  }

  return { workouts, totalPages, loading, error, refresh, deleteWorkout }
}

export function useWorkout(id?: number) {
  const [workout, setWorkout] = useState<Workout | null>(null)
  const [loading, setLoading] = useState(Boolean(id))
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    if (!id) return

    setLoading(true)
    setError('')
    try {
      setWorkout(await workoutApi.getById(id))
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const addEntry = async (payload: WorkoutEntryPayload) => {
    if (!id) return
    await workoutApi.addEntry(id, payload)
    await refresh()
  }

  const updateEntry = async (entryId: number, payload: WorkoutEntryPayload) => {
    if (!id) return
    await workoutApi.updateEntry(id, entryId, payload)
    await refresh()
  }

  const deleteEntry = async (entryId: number) => {
    if (!id) return
    await workoutApi.removeEntry(id, entryId)
    await refresh()
  }

  return { workout, loading, error, refresh, addEntry, updateEntry, deleteEntry }
}

export async function createWorkout(payload: WorkoutPayload) {
  return workoutApi.create(payload)
}

export async function updateWorkout(id: number, payload: WorkoutPayload) {
  return workoutApi.update(id, payload)
}
