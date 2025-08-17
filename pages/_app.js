import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>MediaToolkit - Video to MP3</title>
        {/* Replace the following with your AdSense code after approval */}
        {/* <script data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> */}
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
