export type MuscleGroup =
  | 'CHEST'
  | 'BACK'
  | 'SHOULDERS'
  | 'ARMS'
  | 'LEGS'
  | 'CORE'
  | 'FULL_BODY'
  | 'CARDIO'
  | 'OTHER'

export type ExerciseType = 'STRENGTH' | 'CARDIO' | 'MOBILITY' | 'BODYWEIGHT' | 'OTHER'

export interface Exercise {
  id: number
  name: string
  muscleGroup: MuscleGroup
  type: ExerciseType
  description?: string
}

export interface WorkoutEntry {
  id: number
  exerciseId: number
  exerciseName: string
  sets: number
  reps: number
  weight: number
  volume?: number
}

export interface Workout {
  id: number
  name: string
  date: string
  notes?: string
  entries: WorkoutEntry[]
}

export interface StatisticsSummary {
  totalWorkouts: number
  totalExercises: number
  totalVolume: number
  averageWorkoutVolume: number
}

export interface PersonalRecord {
  exerciseId: number
  exerciseName: string
  maxWeight: number
  weight?: number
  reps: number
  sets?: number
  date?: string
  workoutDate?: string
  workoutId?: number
  workoutName?: string
}

export interface WorkoutHistory {
  workoutId: number
  workoutName: string
  date: string
  notes?: string
  totalVolume: number
}

export interface PageResponse<T> {
  content: T[]
  totalPages: number
  totalElements: number
  number: number
  size: number
}

export interface ApiErrorBody {
  message?: string
  validationErrors?: Record<string, string> | null
}
