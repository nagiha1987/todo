import fs from 'fs'
import path from 'path'
import { Todo } from './types'

// Vercel's serverless filesystem is read-only except /tmp (ephemeral per instance)
const dataFile = process.env.VERCEL
  ? '/tmp/todos.json'
  : path.join(process.cwd(), 'data', 'todos.json')

function ensureFile() {
  const dir = path.dirname(dataFile)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, '[]')
}

export function readTodos(): Todo[] {
  try {
    ensureFile()
    return JSON.parse(fs.readFileSync(dataFile, 'utf-8'))
  } catch {
    return []
  }
}

export function writeTodos(todos: Todo[]): void {
  ensureFile()
  fs.writeFileSync(dataFile, JSON.stringify(todos, null, 2))
}
