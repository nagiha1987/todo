import { Todo } from './types'

const KV_KEY = 'todos'

export async function readTodos(): Promise<Todo[]> {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { kv } = await import('@vercel/kv')
    return (await kv.get<Todo[]>(KV_KEY)) ?? []
  }
  return readFromFile()
}

export async function writeTodos(todos: Todo[]): Promise<void> {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { kv } = await import('@vercel/kv')
    await kv.set(KV_KEY, todos)
    return
  }
  writeToFile(todos)
}

function readFromFile(): Todo[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require('fs') as typeof import('fs')
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require('path') as typeof import('path')
  const file = path.join(process.cwd(), 'data', 'todos.json')
  try {
    const dir = path.dirname(file)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    if (!fs.existsSync(file)) fs.writeFileSync(file, '[]')
    return JSON.parse(fs.readFileSync(file, 'utf-8'))
  } catch {
    return []
  }
}

function writeToFile(todos: Todo[]): void {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require('fs') as typeof import('fs')
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require('path') as typeof import('path')
  const file = path.join(process.cwd(), 'data', 'todos.json')
  const dir = path.dirname(file)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(file, JSON.stringify(todos, null, 2))
}
