import axios, { AxiosError } from 'axios'
import type { ApiErrorBody } from '../types'

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export function normalizePageResponse<T>(data: T[] | { content?: T[] }): T[] {
  return Array.isArray(data) ? data : data.content ?? []
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorBody>
    const body = axiosError.response?.data
    const validationErrors = body?.validationErrors

    if (validationErrors && Object.keys(validationErrors).length > 0) {
      return Object.values(validationErrors).join(' ')
    }

    return body?.message ?? axiosError.message
  }

  return error instanceof Error ? error.message : 'Unexpected error'
}
