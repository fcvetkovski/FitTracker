import type { WorkoutEntry } from '../types'

export function calculateVolume(entry: WorkoutEntry): number {
  return entry.volume ?? entry.sets * entry.reps * entry.weight
}

export function calculateWorkoutVolume(entries: WorkoutEntry[] = []): number {
  return entries.reduce((sum, entry) => sum + calculateVolume(entry), 0)
}
