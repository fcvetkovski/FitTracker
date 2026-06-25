import type { StatisticsSummary } from '../../types'

export function SummaryCards({ summary }: { summary: StatisticsSummary | null }) {
  const cards = [
    { label: 'Total workouts', value: summary?.totalWorkouts ?? 0 },
    { label: 'Total exercises', value: summary?.totalExercises ?? 0 },
    { label: 'Total volume', value: `${(summary?.totalVolume ?? 0).toLocaleString()} kg` },
    { label: 'Avg. workout volume', value: `${(summary?.averageWorkoutVolume ?? 0).toLocaleString()} kg` },
  ]

  return (
    <div className="summary-grid">
      {cards.map((card) => (
        <article className="stat-card" key={card.label}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
        </article>
      ))}
    </div>
  )
}
