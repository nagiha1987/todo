'use client'

import { useState } from 'react'
import { Todo, Filter } from '@/lib/types'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import TodoFilter from './TodoFilter'
import { clearCompleted } from '@/app/actions'

interface Props {
  initialTodos: Todo[]
}

export default function TodoApp({ initialTodos }: Props) {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = initialTodos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = initialTodos.filter(t => !t.completed).length
  const completedCount = initialTodos.filter(t => t.completed).length

  return (
    <div className="app">
      <header>
        <h1>TODO</h1>
      </header>
      <main>
        <TodoForm />
        <div className="todo-container">
          <TodoList todos={filtered} />
          {initialTodos.length > 0 && (
            <footer className="todo-footer">
              <span className="todo-count">{activeCount} items left</span>
              <TodoFilter filter={filter} onFilterChange={setFilter} />
              {completedCount > 0 ? (
                <button className="clear-btn" onClick={() => clearCompleted()}>
                  Clear completed
                </button>
              ) : (
                <span className="clear-btn-placeholder" />
              )}
            </footer>
          )}
        </div>
      </main>
    </div>
  )
}
