import { AnimatePresence, motion } from 'framer-motion'
import { sortBy } from 'lodash'
import React, { FunctionComponent, useState } from 'react'

import { List, ListItem } from '@simplish/types'

import { Icon } from './icon'

interface Props {
  items: ListItem[]
  lists: List[]
  selected?: List

  onChange: (list: List) => void
}

export const Sidebar: FunctionComponent<Props> = ({
  items,
  lists,
  onChange,
  selected
}) => {
  const [visible, setVisible] = useState(true)

  return (
    <aside className="border-border-white dark:border-border-black border-b lg:border-b-0 lg:border-r w-full lg:w-1/3 p-8">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Lists
        </h2>
        <nav className="flex items-center">
          <button
            onClick={() => {
              //
            }}>
            <Icon icon="add" />
          </button>
          <button
            className="lg:hidden ml-4"
            onClick={() => setVisible(!visible)}>
            <Icon
              className={`transition-transform transform ${
                visible ? '-rotate-180' : ''
              }`}
              icon="expand"
            />
          </button>
        </nav>
      </header>
      <AnimatePresence>
        {visible && (
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
            {sortBy(lists, 'order').map((list) => {
              const listItems = items.filter((item) => item.list === list.id)
              const completedItems = listItems.filter(
                ({ completed }) => completed
              )

              return (
                <button
                  className={`w-full flex items-center justify-between text-left mt-4 first:mt-8 ${
                    list.id === selected?.id
                      ? 'text-black dark:text-white font-medium'
                      : 'text-gray-500'
                  }`}
                  key={list.id}
                  onClick={() => onChange(list)}>
                  <span>{list.name}</span>
                  <span className="text-sm opacity-50 font-normal">
                    {completedItems.length}/{listItems.length}
                  </span>
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  )
}
