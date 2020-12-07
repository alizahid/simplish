import React, { FunctionComponent, useState } from 'react'

import { useDeleteItem, useUpdateItem } from '@simplish/hooks'
import { ListItem } from '@simplish/types'

import { Icon } from './icon'
import { Input } from './input'
import { Spinner } from './spinner'

interface Props {
  item: ListItem
}

export const Item: FunctionComponent<Props> = ({ item }) => {
  const { loading: updating, updateItem } = useUpdateItem()
  const { deleteItem, loading: deleting } = useDeleteItem()

  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState(item.content)

  return (
    <div
      className={`flex items-center mt-8 transition-opacity ${
        item.completed ? 'opacity-50' : 'opacity-100'
      }`}>
      <button
        onClick={() =>
          updateItem({
            ...item,
            completed: !item.completed
          })
        }>
        <Icon icon={item.completed ? 'checkboxChecked' : 'checkboxEmpty'} />
      </button>
      {editing ? (
        <Input
          className="flex-1 mx-4"
          disabled={updating}
          onBlur={() => {
            setEditing(false)
            setContent(item.content)
          }}
          onChange={(content) => setContent(content)}
          onEnter={() => {
            updateItem({
              ...item,
              content
            })

            setEditing(false)
          }}
          onEscape={() => {
            setEditing(false)
            setContent(item.content)
          }}
          placeholder="Write something"
          value={content}
        />
      ) : (
        <div
          className={`flex-1 mx-4 break-words ${
            item.completed ? 'line-through' : ''
          }`}
          onClick={() => setEditing(true)}>
          {item.content}
        </div>
      )}
      {deleting ? (
        <Spinner />
      ) : (
        <button onClick={() => deleteItem(item.id)}>
          <Icon className="text-red-200 dark:text-red-900" icon="delete" />
        </button>
      )}
    </div>
  )
}
