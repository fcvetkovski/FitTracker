import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="empty-state page-section">
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link className="btn btn-primary" to="/">
        Go to dashboard
      </Link>
    </section>
  )
}
