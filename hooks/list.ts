import { useQuery } from 'react-query'

import { List } from '@simplish/types'

// lists

type ListsReturns = {
  lists: List[]
}

export const useLists = (initialData: List[]): ListsReturns => {
  const { data } = useQuery('lists', {
    initialData
  })

  return {
    lists: data
  }
}
