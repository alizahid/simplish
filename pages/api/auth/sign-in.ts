import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const {
    query: { provider }
  } = req

  switch (provider) {
    case 'github':
      res.redirect(
        `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.GITHUB_CLIENT_ID}`
      )

      break

    default:
      res.redirect('/404')
  }
}

export default handler
