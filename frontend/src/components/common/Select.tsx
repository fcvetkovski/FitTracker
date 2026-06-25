import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Array<{ value: string; label: string }>
}

export function Select({ label, options, id, ...props }: SelectProps) {
  const selectId = id ?? props.name

  return (
    <label className="field" htmlFor={selectId}>
      <span>{label}</span>
      <select id={selectId} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
