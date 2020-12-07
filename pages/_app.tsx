import '../styles/tailwind.scss'
import '../styles/global.scss'

import { AppProps } from 'next/app'
import React, { FunctionComponent } from 'react'
import { ReactQueryCacheProvider } from 'react-query'

import { cache } from '@simplish/client'

const Simplish: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <ReactQueryCacheProvider queryCache={cache}>
    <Component {...pageProps} />
  </ReactQueryCacheProvider>
)

export default Simplish
