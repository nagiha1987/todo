import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Todo } from '../types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const commitEdit = () => {
    const trimmed = editText.trim()
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed)
    } else {
      setEditText(todo.text)
    }
    setEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') {
      setEditText(todo.text)
      setEditing(false)
    }
  }

  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {editing ? (
        <input
          ref={inputRef}
          className="todo-edit-input"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span
          className="todo-text"
          onDoubleClick={() => { if (!todo.completed) setEditing(true) }}
        >
          {todo.text}
        </span>
      )}
      <button
        className="todo-delete"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete"
      >
        ×
      </button>
    </li>
  )
}
