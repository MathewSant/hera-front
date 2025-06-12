import Head from 'next/head';
import '@/styles/globals.css'; // ou onde estiver seu CSS

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Hera | Monitoramento Inteligente</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
