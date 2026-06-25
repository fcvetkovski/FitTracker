import { useNavigate } from 'react-router-dom'
import { getErrorMessage } from '../api/axiosClient'
import { WorkoutForm } from '../components/workouts/WorkoutForm'
import { createWorkout } from '../hooks/useWorkouts'

export function AddWorkoutPage() {
  const navigate = useNavigate()

  return (
    <section className="stack page-section narrow">
      <div className="page-heading">
        <div>
          <p className="eyebrow">New training session</p>
          <h1>Add Workout</h1>
        </div>
      </div>
      <WorkoutForm
        onCancel={() => navigate('/workouts')}
        onSubmit={async (payload) => {
          try {
            const workout = await createWorkout(payload)
            navigate(`/workouts/${workout.id}`)
          } catch (err) {
            throw new Error(getErrorMessage(err))
          }
        }}
      />
    </section>
  )
}
