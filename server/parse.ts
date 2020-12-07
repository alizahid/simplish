import { FaunaDocument, List, ListItem, User } from '@simplish/types'

export const parseUser = (user: FaunaDocument): User => ({
  email: user.data.email,
  id: user.ref.id,
  name: user.data.name
})

export const parseList = (list: FaunaDocument): List => ({
  id: list.ref.id,
  name: list.data.name,
  order: list.data.order,
  user: list.data.user
})

export const parseItem = (item: FaunaDocument): ListItem => ({
  completed: item.data.completed,
  content: item.data.content,
  id: item.ref.id,
  list: item.data.list,
  order: item.data.order,
  user: item.data.user
})
