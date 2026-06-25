import { useNavigate, useParams } from 'react-router-dom'
import { getErrorMessage } from '../api/axiosClient'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { WorkoutForm } from '../components/workouts/WorkoutForm'
import { updateWorkout, useWorkout } from '../hooks/useWorkouts'

export function EditWorkoutPage() {
  const id = Number(useParams().id)
  const navigate = useNavigate()
  const { workout, loading, error } = useWorkout(id)

  if (loading) return <LoadingSpinner />
  if (!workout) return <ErrorMessage message={error || 'Workout not found.'} />

  return (
    <section className="stack page-section narrow">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Update training session</p>
          <h1>Edit Workout</h1>
        </div>
      </div>
      <WorkoutForm
        workout={workout}
        onCancel={() => navigate(`/workouts/${workout.id}`)}
        onSubmit={async (payload) => {
          try {
            const updated = await updateWorkout(workout.id, payload)
            navigate(`/workouts/${updated.id}`)
          } catch (err) {
            throw new Error(getErrorMessage(err))
          }
        }}
      />
    </section>
  )
}
