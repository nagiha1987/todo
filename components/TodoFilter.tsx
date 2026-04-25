import { Filter } from '@/lib/types'

interface Props {
  filter: Filter
  onFilterChange: (filter: Filter) => void
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

export default function TodoFilter({ filter, onFilterChange }: Props) {
  return (
    <div className="todo-filters">
      {FILTERS.map(f => (
        <button
          key={f.value}
          className={`filter-btn${filter === f.value ? ' active' : ''}`}
          onClick={() => onFilterChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
