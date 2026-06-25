import { useCallback, useEffect, useState } from 'react'
import { exerciseApi, type ExercisePayload } from '../api/exerciseApi'
import { getErrorMessage } from '../api/axiosClient'
import type { Exercise } from '../types'

export function useExercises(filters?: { name?: string; muscleGroup?: string }) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setExercises(await exerciseApi.getAll(filters))
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [filters?.name, filters?.muscleGroup])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const createExercise = async (payload: ExercisePayload) => {
    await exerciseApi.create(payload)
    await refresh()
  }

  const updateExercise = async (id: number, payload: ExercisePayload) => {
    await exerciseApi.update(id, payload)
    await refresh()
  }

  const deleteExercise = async (id: number) => {
    await exerciseApi.remove(id)
    await refresh()
  }

  return { exercises, loading, error, refresh, createExercise, updateExercise, deleteExercise }
}
