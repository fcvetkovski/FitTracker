import { axiosClient, normalizePageResponse } from './axiosClient'
import type { PageResponse, Workout, WorkoutEntry } from '../types'

export interface WorkoutPayload {
  name: string
  date: string
  notes?: string
}

export interface WorkoutEntryPayload {
  exerciseId: number
  sets: number
  reps: number
  weight: number
}

export const workoutApi = {
  async getAll(page = 0, size = 10) {
    const response = await axiosClient.get<PageResponse<Workout> | Workout[]>('/workouts', {
      params: { page, size, sort: 'date,desc' },
    })
    const data = response.data

    if (Array.isArray(data)) {
      return { content: data, totalPages: 1, totalElements: data.length, number: 0, size: data.length }
    }

    return data
  },

  async getRecent(limit = 5) {
    const response = await axiosClient.get<PageResponse<Workout> | Workout[]>('/workouts', {
      params: { page: 0, size: limit, sort: 'date,desc' },
    })
    return normalizePageResponse(response.data)
  },

  async getById(id: number) {
    const response = await axiosClient.get<Workout>(`/workouts/${id}`)
    return response.data
  },

  async create(payload: WorkoutPayload) {
    const response = await axiosClient.post<Workout>('/workouts', payload)
    return response.data
  },

  async update(id: number, payload: WorkoutPayload) {
    const response = await axiosClient.put<Workout>(`/workouts/${id}`, payload)
    return response.data
  },

  async remove(id: number) {
    await axiosClient.delete(`/workouts/${id}`)
  },

  async addEntry(workoutId: number, payload: WorkoutEntryPayload) {
    const response = await axiosClient.post<WorkoutEntry>(`/workouts/${workoutId}/entries`, payload)
    return response.data
  },

  async updateEntry(workoutId: number, entryId: number, payload: WorkoutEntryPayload) {
    const response = await axiosClient.put<WorkoutEntry>(`/workouts/${workoutId}/entries/${entryId}`, payload)
    return response.data
  },

  async removeEntry(workoutId: number, entryId: number) {
    await axiosClient.delete(`/workouts/${workoutId}/entries/${entryId}`)
  },
}
