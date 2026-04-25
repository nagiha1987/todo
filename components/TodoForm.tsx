'use client'

import { useRef } from 'react'
import { addTodo } from '@/app/actions'

export default function TodoForm() {
  const ref = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await addTodo(formData)
        ref.current?.reset()
      }}
    >
      <input
        className="todo-input"
        type="text"
        name="text"
        placeholder="What needs to be done?"
        autoFocus
        autoComplete="off"
      />
    </form>
  )
}
