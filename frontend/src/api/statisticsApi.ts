import { axiosClient } from './axiosClient'
import type { PersonalRecord, StatisticsSummary, WorkoutHistory } from '../types'

export const statisticsApi = {
  async getSummary() {
    const response = await axiosClient.get<StatisticsSummary>('/statistics/summary')
    return response.data
  },

  async getPersonalRecords() {
    const response = await axiosClient.get<PersonalRecord[]>('/statistics/personal-records')
    return response.data.map((record) => ({
      ...record,
      maxWeight: record.maxWeight ?? record.weight ?? 0,
      date: record.date ?? record.workoutDate,
    }))
  },

  async getWorkoutHistory() {
    const response = await axiosClient.get<WorkoutHistory[]>('/statistics/workout-history')
    return response.data
  },
}
