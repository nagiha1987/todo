import { useState, FormEvent } from 'react'

interface Props {
  onAdd: (text: string) => void
}

export default function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={e => setText(e.target.value)}
        autoFocus
      />
    </form>
  )
}
