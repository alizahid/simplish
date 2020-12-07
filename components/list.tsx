import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { minBy, orderBy } from 'lodash'
import React, { FunctionComponent, useState } from 'react'

import { useCreateItem } from '@simplish/hooks'
import { List, ListItem, User } from '@simplish/types'

import { Icon } from './icon'
import { Input } from './input'
import { Item } from './item'
import { Spinner } from './spinner'

interface Props {
  list?: List
  items: ListItem[]
  user: User
}

export const ItemList: FunctionComponent<Props> = ({ items, list, user }) => {
  const { createItem, loading } = useCreateItem()

  const [creating, setCreating] = useState(false)
  const [content, setContent] = useState('')

  const listItems = orderBy(
    items.filter((item) => item.list === list?.id),
    ['completed', 'order'],
    ['asc', 'asc']
  )

  return (
    <section className="flex-1 p-8">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{list?.name}</h2>
        <button onClick={() => setCreating(!creating)}>
          <Icon icon="add" />
        </button>
      </header>
      <AnimatePresence>
        {creating && (
          <motion.div
            animate={{
              height: 'auto'
            }}
            className="overflow-hidden"
            exit={{
              height: 0
            }}
            initial={{
              height: 0
            }}
            transition={{
              duration: 0.2
            }}>
            <div className="flex items-center mt-8">
              <Input
                className="w-full"
                onChange={(content) => setContent(content)}
                onEnter={async () => {
                  if (!content) {
                    return
                  }

                  await createItem({
                    content,
                    list: list.id,
                    order: (minBy(listItems)?.order ?? 100) - 100,
                    user: user.id
                  })

                  setCreating(false)
                  setContent('')
                }}
                onEscape={() => {
                  setCreating(false)
                  setContent('')
                }}
                placeholder="Write something"
                value={content}
              />
              {loading && <Spinner className="ml-4" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimateSharedLayout>
        <AnimatePresence>
          {listItems.map((item) => (
            <motion.div
              animate={{
                height: 'auto'
              }}
              className="overflow-hidden"
              exit={{
                height: 0
              }}
              initial={{
                height: 0
              }}
              key={item.id}
              layout
              transition={{
                duration: 0.2
              }}>
              <Item item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </AnimateSharedLayout>
    </section>
  )
}
