import axios from 'axios'
import update from 'immutability-helper'
import { cloneDeep } from 'lodash'
import { useCallback } from 'react'
import { useMutation, useQuery } from 'react-query'

import { cache } from '@simplish/client'
import { ListItem } from '@simplish/types'

// items

type ItemsReturns = {
  items: ListItem[]
}

export const useItems = (initialData: ListItem[]): ItemsReturns => {
  const { data } = useQuery('items', {
    initialData
  })

  return {
    items: data
  }
}

// create item

type CreateItemReturns = {
  loading: boolean

  createItem: (data: CreateItemVariables) => Promise<ListItem>
}

export type CreateItemVariables = Pick<
  ListItem,
  'user' | 'list' | 'content' | 'order'
>

export const useCreateItem = (): CreateItemReturns => {
  const [mutate, { isLoading }] = useMutation<
    ListItem,
    void,
    CreateItemVariables
  >(
    async (next) => {
      const { data } = await axios({
        data: next,
        method: 'post',
        url: '/api/item'
      })

      return data
    },
    {
      onSuccess: (data) =>
        cache.setQueryData<ListItem[]>('items', (items) =>
          update(items, {
            $unshift: [data]
          })
        )
    }
  )

  const createItem = useCallback(
    (data: CreateItemVariables) => mutate(data),
    []
  )

  return {
    createItem,
    loading: isLoading
  }
}

// update item

type UpdateItemReturns = {
  loading: boolean

  updateItem: (data: UpdateItemVariables) => Promise<ListItem>
}

export type UpdateItemVariables = Pick<
  ListItem,
  'id' | 'content' | 'completed' | 'order'
>

export const useUpdateItem = (): UpdateItemReturns => {
  const [mutate, { isLoading }] = useMutation<
    ListItem,
    void,
    UpdateItemVariables
  >(
    async (next) => {
      const { data } = await axios({
        data: next,
        method: 'put',
        url: '/api/item'
      })

      return data
    },
    {
      onError: (error, variables, rollback: () => void) => rollback(),
      onMutate: (variables) => {
        const previous = cloneDeep(
          cache
            .getQueryData<ListItem[]>('items')
            .find(({ id }) => id === variables.id)
        )

        const set = (data: UpdateItemVariables) =>
          cache.setQueryData<ListItem[]>('items', (items) => {
            const index = items.findIndex(({ id }) => id === data.id)

            return update(items, {
              [index]: {
                $merge: data
              }
            })
          })

        set(variables)

        return () => set(previous)
      }
    }
  )

  const updateItem = useCallback(
    (data: UpdateItemVariables) => mutate(data),
    []
  )

  return {
    loading: isLoading,
    updateItem
  }
}

// delete item

type DeleteItemReturns = {
  loading: boolean

  deleteItem: (id: string) => Promise<void>
}

export const useDeleteItem = (): DeleteItemReturns => {
  const [mutate, { isLoading }] = useMutation<void, void, string>(
    async (id) => {
      const { data } = await axios({
        method: 'delete',
        params: {
          id
        },
        url: '/api/item'
      })

      return data
    },
    {
      onError: (error, variables, rollback: () => void) => rollback(),
      onMutate: (variables) => {
        const items = cache.getQueryData<ListItem[]>('items')

        const index = items.findIndex(({ id }) => id === variables)

        const previous = cloneDeep(items[index])

        cache.setQueryData<ListItem[]>('items', (items) =>
          update(items, {
            $splice: [[index, 1]]
          })
        )

        return () =>
          cache.setQueryData<ListItem[]>('items', (items) =>
            update(items, {
              $splice: [[index, 0, previous]]
            })
          )
      }
    }
  )

  const deleteItem = useCallback((id: string) => mutate(id), [])

  return {
    deleteItem,
    loading: isLoading
  }
}
