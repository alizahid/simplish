export type User = {
  id: string
  name: string
  email: string
}

export type List = {
  id: string
  name: string
  order: number
}

export type ListItem = {
  id: string
  content: string
  completed: boolean
  order: number
}
