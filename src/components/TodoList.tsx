import { Todo } from '../types'
import TodoItem from './TodoItem'

interface Props {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export default function TodoList({ todos, onToggle, onDelete, onEdit }: Props) {
  if (todos.length === 0) {
    return <div className="empty-state">タスクはありません</div>
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
