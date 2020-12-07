import '../styles/tailwind.scss'
import '../styles/global.scss'

import { AppProps } from 'next/app'
import React, { FunctionComponent } from 'react'

const Simplish: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default Simplish
