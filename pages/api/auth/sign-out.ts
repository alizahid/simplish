import { NextApiHandler } from 'next'

import { logout } from '@simplish/server'

const handler: NextApiHandler = async (req, res) => {
  logout({
    res
  })

  res.redirect('/')
}

export default handler
