import { useState, useEffect } from 'react'
import { Todo, Filter } from './types'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoFilter from './components/TodoFilter'
import './App.css'

const STORAGE_KEY = 'todos'

function loadTodos(): Todo[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    setTodos(prev => [
      { id: crypto.randomUUID(), text, completed: false, createdAt: Date.now() },
      ...prev,
    ])
  }

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const editTodo = (id: string, text: string) => {
    setTodos(prev => prev.map(todo => (todo.id === id ? { ...todo, text } : todo)))
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <div className="app">
      <header>
        <h1>TODO</h1>
      </header>
      <main>
        <TodoForm onAdd={addTodo} />
        <div className="todo-container">
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
          {todos.length > 0 && (
            <footer className="todo-footer">
              <span className="todo-count">{activeCount} items left</span>
              <TodoFilter filter={filter} onFilterChange={setFilter} />
              {completedCount > 0 ? (
                <button className="clear-btn" onClick={clearCompleted}>
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
