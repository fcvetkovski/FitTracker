export function formatDate(date?: string): string {
  if (!date) {
    return 'Not set'
  }

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

export function todayInputValue(): string {
  return new Date().toISOString().slice(0, 10)
}
