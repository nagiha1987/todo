'use server'

import { revalidatePath } from 'next/cache'
import { readTodos, writeTodos } from '@/lib/store'

export async function addTodo(formData: FormData) {
  const text = formData.get('text')?.toString().trim()
  if (!text) return
  const todos = await readTodos()
  todos.unshift({
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: Date.now(),
  })
  await writeTodos(todos)
  revalidatePath('/')
}

export async function toggleTodo(id: string) {
  const todos = await readTodos()
  const todo = todos.find(t => t.id === id)
  if (todo) todo.completed = !todo.completed
  await writeTodos(todos)
  revalidatePath('/')
}

export async function deleteTodo(id: string) {
  await writeTodos((await readTodos()).filter(t => t.id !== id))
  revalidatePath('/')
}

export async function editTodo(id: string, text: string) {
  const todos = await readTodos()
  const todo = todos.find(t => t.id === id)
  if (todo) todo.text = text
  await writeTodos(todos)
  revalidatePath('/')
}

export async function clearCompleted() {
  await writeTodos((await readTodos()).filter(t => !t.completed))
  revalidatePath('/')
}
