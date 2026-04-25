import { readTodos } from '@/lib/store'
import TodoApp from '@/components/TodoApp'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const todos = await readTodos()
  return <TodoApp initialTodos={todos} />
}
