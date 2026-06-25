import { useCallback, useEffect, useState } from 'react'
import { getErrorMessage } from '../api/axiosClient'
import { statisticsApi } from '../api/statisticsApi'
import type { PersonalRecord, StatisticsSummary, WorkoutHistory } from '../types'

export function useStatistics() {
  const [summary, setSummary] = useState<StatisticsSummary | null>(null)
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>([])
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [summaryResult, recordsResult, historyResult] = await Promise.all([
        statisticsApi.getSummary(),
        statisticsApi.getPersonalRecords(),
        statisticsApi.getWorkoutHistory(),
      ])
      setSummary(summaryResult)
      setPersonalRecords(recordsResult)
      setWorkoutHistory(historyResult)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { summary, personalRecords, workoutHistory, loading, error, refresh }
}
