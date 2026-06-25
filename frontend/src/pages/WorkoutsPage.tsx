import { Link } from 'react-router-dom'
import { getErrorMessage } from '../api/axiosClient'
import { Button } from '../components/common/Button'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { WorkoutList } from '../components/workouts/WorkoutList'
import { useWorkouts } from '../hooks/useWorkouts'
import type { Workout } from '../types'
import { useState } from 'react'

export function WorkoutsPage() {
  const [page, setPage] = useState(0)
  const [mutationError, setMutationError] = useState('')
  const { workouts, totalPages, loading, error, deleteWorkout } = useWorkouts(page, 10)

  const remove = async (workout: Workout) => {
    if (!window.confirm(`Delete ${workout.name}?`)) return
    setMutationError('')
    try {
      await deleteWorkout(workout.id)
    } catch (err) {
      setMutationError(getErrorMessage(err))
    }
  }

  return (
    <section className="stack page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Training sessions</p>
          <h1>Workouts</h1>
        </div>
        <Link className="btn btn-primary" to="/workouts/new">
          Add Workout
        </Link>
      </div>
      <ErrorMessage message={error || mutationError} />
      {loading ? <LoadingSpinner /> : <WorkoutList workouts={workouts} onDelete={remove} />}
      <div className="pagination">
        <Button variant="secondary" disabled={page === 0} onClick={() => setPage((current) => Math.max(0, current - 1))}>
          Previous
        </Button>
        <span>Page {page + 1} of {Math.max(totalPages, 1)}</span>
        <Button variant="secondary" disabled={page + 1 >= totalPages} onClick={() => setPage((current) => current + 1)}>
          Next
        </Button>
      </div>
    </section>
  )
}
