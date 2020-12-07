import { Client } from 'faunadb'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'

import { Header, ItemList, Sidebar } from '@simplish/components'
import { useItems, useLists } from '@simplish/hooks'
import { getItemsForUser, getListsForUser, getProfile } from '@simplish/server'
import { List, ListItem, User } from '@simplish/types'

interface Props {
  items: ListItem[]
  lists: List[]
  user: User
}

const App: NextPage<Props> = (props) => {
  const { lists } = useLists(props.lists)
  const { items } = useItems(props.items)

  const { user } = props

  const [list, setList] = useState<List | null>(lists[0] ?? null)

  return (
    <>
      <Head>
        <title>Lists / Simplish</title>
      </Head>

      <main className="flex-col flex-1 w-full max-w-5xl mx-auto border-border-white-two dark:border-border-black-two lg:border-l lg:border-r">
        <Header user={user} />
        <div className="flex flex-1 flex-col lg:flex-row">
          <Sidebar
            lists={lists}
            onChange={(list) => setList(list)}
            selected={list}
          />
          <ItemList items={items} list={list} user={user} />
        </div>
      </main>
    </>
  )
}

const fauna = new Client({
  secret: process.env.FAUNA_SECRET
})

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const user = await getProfile(context, fauna)

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const lists = await getListsForUser(fauna, user.id)
  const items = await getItemsForUser(fauna, user.id)

  return {
    props: {
      items,
      lists,
      user
    }
  }
}

export default App
