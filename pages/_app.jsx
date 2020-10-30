import Head from 'next/head'

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="relative bg-white overflow-hidden">
      <Head>
        <title>map your pods!</title>
        {/* XRP pointer from my uphold account, special wallet for BATJC */}
        <meta name="monetization" content="$ilp.uphold.com/JUjA2yEE6LRA" />
      </Head>
      <main className="mx-auto max-w-screen-xl">
        <Component {...pageProps} />
      </main>
      <footer className="text-center my-12 text-xs text-gray-600">
      </footer>
    </div>
  )
}

export default MyApp
