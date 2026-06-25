import { Link } from 'react-router-dom'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { PersonalRecordsList } from '../components/statistics/PersonalRecordsList'
import { SummaryCards } from '../components/statistics/SummaryCards'
import { WorkoutHistoryList } from '../components/statistics/WorkoutHistoryList'
import { useStatistics } from '../hooks/useStatistics'

export function DashboardPage() {
  const { summary, personalRecords, workoutHistory, loading, error } = useStatistics()

  if (loading) return <LoadingSpinner />

  return (
    <section className="stack page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Gym Workout Tracker</p>
          <h1>Dashboard</h1>
        </div>
        <Link className="btn btn-primary" to="/workouts/new">
          Add Workout
        </Link>
      </div>
      <ErrorMessage message={error} />
      <SummaryCards summary={summary} />
      <div className="two-column">
        <section className="panel">
          <div className="section-heading">
            <h2>Latest history</h2>
            <Link to="/statistics">View all</Link>
          </div>
          <WorkoutHistoryList history={workoutHistory} limit={5} />
        </section>
        <section className="panel">
          <div className="section-heading">
            <h2>Personal records</h2>
            <Link to="/statistics">View all</Link>
          </div>
          <PersonalRecordsList records={personalRecords} limit={5} />
        </section>
      </div>
    </section>
  )
}
