import { readTodos } from '@/lib/store'
import TodoApp from '@/components/TodoApp'

export default function Home() {
  const todos = readTodos()
  return <TodoApp initialTodos={todos} />
}
