import { Client } from 'faunadb'
import { NextApiHandler } from 'next'

import { getProfile } from '@simplish/server'
import { User } from '@simplish/types'

const fauna = new Client({
  secret: process.env.FAUNA_SECRET
})

const handler: NextApiHandler<User> = async (req, res) => {
  const user = await getProfile({ req }, fauna)

  if (!user) {
    res.redirect('/404')

    return
  }

  res.json(user)
}

export default handler
