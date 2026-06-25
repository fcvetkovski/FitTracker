import { NavLink } from 'react-router-dom'

export function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="brand">
        FitTracker
      </NavLink>
      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/exercises">Exercises</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
        <NavLink to="/statistics">Statistics</NavLink>
      </nav>
    </header>
  )
}
