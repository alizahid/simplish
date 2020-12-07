import { Client } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import connect from 'next-connect'

import {
  createItem,
  deleteItem,
  getProfile,
  updateItem
} from '@simplish/server'

const fauna = new Client({
  secret: process.env.FAUNA_SECRET
})

const handler = connect<NextApiRequest, NextApiResponse>()
  .post(async (req, res) => {
    const user = await getProfile({ req }, fauna)

    const { body } = req

    const item = await createItem(fauna, user, body)

    res.json(item)
  })
  .put(async (req, res) => {
    const user = await getProfile({ req }, fauna)

    const { body } = req

    const item = await updateItem(fauna, user, body)

    res.json(item)
  })
  .delete(async (req, res) => {
    const user = await getProfile({ req }, fauna)

    const {
      query: { id }
    } = req

    await deleteItem(fauna, user, String(id))

    res.json({})
  })

export default handler
