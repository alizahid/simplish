import { Client, query as q } from 'faunadb'
import { pick } from 'lodash'

import {
  FaunaCollection,
  FaunaDocument,
  List,
  ListItem,
  User
} from '@simplish/types'

import { parseItem, parseList, parseUser } from './parse'

// user

export const getUser = async (fauna: Client, email: string): Promise<User> => {
  const user: FaunaDocument = await fauna.query(
    q.Get(q.Match(q.Index('users_by_email'), email))
  )

  return parseUser(user)
}

// list

export const getListsForUser = async (
  fauna: Client,
  id: string
): Promise<List[]> => {
  const { data }: FaunaCollection = await fauna.query(
    q.Map(
      q.Paginate(q.Match(q.Index('lists_by_user'), id)),
      q.Lambda('x', q.Get(q.Var('x')))
    )
  )

  return data.map(parseList)
}

// item

export const getItemsForUser = async (
  fauna: Client,
  id: string
): Promise<ListItem[]> => {
  const { data }: FaunaCollection = await fauna.query(
    q.Map(
      q.Paginate(q.Match(q.Index('items_by_user'), id)),
      q.Lambda('x', q.Get(q.Var('x')))
    )
  )

  return data.map(parseItem)
}

export const getItem = async (fauna: Client, id: string): Promise<ListItem> => {
  const item: FaunaDocument = await fauna.query(
    q.Get(q.Ref(q.Collection('items'), id))
  )

  return parseItem(item)
}

export const createItem = async (
  fauna: Client,
  user: User,
  data: ListItem
): Promise<ListItem> => {
  const item: FaunaDocument = await fauna.query(
    q.Create(q.Collection('items'), {
      data: {
        ...pick(data, ['list', 'content', 'order']),
        completed: false,
        user: user.id
      }
    })
  )

  return parseItem(item)
}

export const updateItem = async (
  fauna: Client,
  user: User,
  data: ListItem
): Promise<ListItem> => {
  const item = await getItem(fauna, data.id)

  if (!item) {
    throw new Error('Item not found')
  }

  if (item.user !== user.id) {
    throw new Error('Item not found')
  }

  const next: FaunaDocument = await fauna.query(
    q.Update(q.Ref(q.Collection('items'), data.id), {
      data: pick(data, ['content', 'completed', 'order'])
    })
  )

  return parseItem(next)
}

export const deleteItem = async (
  fauna: Client,
  user: User,
  id: string
): Promise<void> => {
  const item = await getItem(fauna, id)

  if (!item) {
    throw new Error('Item not found')
  }

  if (item.user !== user.id) {
    throw new Error('Item not found')
  }

  await fauna.query(q.Delete(q.Ref(q.Collection('items'), id)))
}
