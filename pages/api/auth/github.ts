import axios from 'axios'
import { Client, query as q } from 'faunadb'
import { NextApiHandler } from 'next'

import { getUser, login, parseUser } from '@simplish/server'
import { FaunaDocument } from '@simplish/types'

const fauna = new Client({
  secret: process.env.FAUNA_SECRET
})

const handler: NextApiHandler = async (req, res) => {
  const {
    query: { code }
  } = req

  const {
    data: { access_token }
  } = await axios({
    data: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    },
    headers: {
      accept: 'application/json'
    },
    method: 'post',
    url: 'https://github.com/login/oauth/access_token'
  })

  const {
    data: { name }
  } = await axios({
    headers: {
      authorization: `Bearer ${access_token}`
    },
    method: 'get',
    url: 'https://api.github.com/user'
  })

  const { data } = await axios({
    headers: {
      authorization: `Bearer ${access_token}`
    },
    method: 'get',
    url: 'https://api.github.com/user/emails'
  })

  const { email } = data.find(({ primary, verified }) => primary && verified)

  const user = await getUser(fauna, email)

  if (user) {
    login({ res }, email)
  } else {
    const doc: FaunaDocument = await fauna.query(
      q.Create(q.Collection('users'), {
        data: {
          email,
          name
        }
      })
    )

    const user = parseUser(doc)

    login({ res }, user.email)
  }

  res.redirect('/app')
}

export default handler
