import { ErrorMessage } from '../components/common/ErrorMessage'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { PersonalRecordsList } from '../components/statistics/PersonalRecordsList'
import { SummaryCards } from '../components/statistics/SummaryCards'
import { WorkoutHistoryList } from '../components/statistics/WorkoutHistoryList'
import { useStatistics } from '../hooks/useStatistics'

export function StatisticsPage() {
  const { summary, personalRecords, workoutHistory, loading, error } = useStatistics()

  if (loading) return <LoadingSpinner />

  return (
    <section className="stack page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Performance overview</p>
          <h1>Statistics</h1>
        </div>
      </div>
      <ErrorMessage message={error} />
      <SummaryCards summary={summary} />
      <div className="two-column">
        <section className="panel">
          <h2>Personal records</h2>
          <PersonalRecordsList records={personalRecords} />
        </section>
        <section className="panel">
          <h2>Workout history</h2>
          <WorkoutHistoryList history={workoutHistory} />
        </section>
      </div>
    </section>
  )
}
