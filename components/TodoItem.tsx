'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Todo } from '@/lib/types'
import { toggleTodo, deleteTodo, editTodo } from '@/app/actions'

interface Props {
  todo: Todo
}

export default function TodoItem({ todo }: Props) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const commitEdit = () => {
    const trimmed = editText.trim()
    if (trimmed && trimmed !== todo.text) {
      editTodo(todo.id, trimmed)
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
        onChange={() => toggleTodo(todo.id)}
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
        onClick={() => deleteTodo(todo.id)}
        aria-label="Delete"
      >
        ×
      </button>
    </li>
  )
}
