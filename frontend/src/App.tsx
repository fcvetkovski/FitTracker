import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { AddWorkoutPage } from './pages/AddWorkoutPage'
import { DashboardPage } from './pages/DashboardPage'
import { EditWorkoutPage } from './pages/EditWorkoutPage'
import { ExercisesPage } from './pages/ExercisesPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { StatisticsPage } from './pages/StatisticsPage'
import { WorkoutDetailsPage } from './pages/WorkoutDetailsPage'
import { WorkoutsPage } from './pages/WorkoutsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'exercises', element: <ExercisesPage /> },
      { path: 'workouts', element: <WorkoutsPage /> },
      { path: 'workouts/new', element: <AddWorkoutPage /> },
      { path: 'workouts/:id', element: <WorkoutDetailsPage /> },
      { path: 'workouts/:id/edit', element: <EditWorkoutPage /> },
      { path: 'statistics', element: <StatisticsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
