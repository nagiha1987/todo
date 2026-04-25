import { Todo } from '@/lib/types'
import TodoItem from './TodoItem'

interface Props {
  todos: Todo[]
}

export default function TodoList({ todos }: Props) {
  if (todos.length === 0) {
    return <div className="empty-state">タスクはありません</div>
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
