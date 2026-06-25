import { axiosClient, normalizePageResponse } from './axiosClient'
import type { Exercise, MuscleGroup } from '../types'

export interface ExercisePayload {
  name: string
  muscleGroup: MuscleGroup
  type: string
  description?: string
}

export const exerciseApi = {
  async getAll(filters?: { name?: string; muscleGroup?: string }) {
    const response = await axiosClient.get<Exercise[] | { content?: Exercise[] }>('/exercises', {
      params: {
        name: filters?.name || undefined,
        muscleGroup: filters?.muscleGroup || undefined,
      },
    })
    return normalizePageResponse(response.data)
  },

  async getById(id: number) {
    const response = await axiosClient.get<Exercise>(`/exercises/${id}`)
    return response.data
  },

  async create(payload: ExercisePayload) {
    const response = await axiosClient.post<Exercise>('/exercises', payload)
    return response.data
  },

  async update(id: number, payload: ExercisePayload) {
    const response = await axiosClient.put<Exercise>(`/exercises/${id}`, payload)
    return response.data
  },

  async remove(id: number) {
    await axiosClient.delete(`/exercises/${id}`)
  },
}
