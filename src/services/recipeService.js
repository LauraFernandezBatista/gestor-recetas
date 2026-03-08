import { v4 as uuid } from 'uuid'

const KEY = 'app_recetas_v1'

const read = () => JSON.parse(localStorage.getItem(KEY) || '[]')
const write = (data) => localStorage.setItem(KEY, JSON.stringify(data))

export const getAll = () => read()
export const getById = (id) => read().find(r => r.id === id)
export const add = (recipe) => {
  const all = read()
  const r = { ...recipe, id: uuid() }
  all.push(r)
  write(all)
  return r
}
export const update = (recipe) => {
  const all = read().map(r => (r.id === recipe.id ? recipe : r))
  write(all)
}
export const remove = (id) => {
  const all = read().filter(r => r.id !== id)
  write(all)
}