import Head from 'next/head'

const Trials = () => {

  return (
    <>
      <Head>
        <title>Trials | Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

Trials.navState = {
  topLevel: 'store',
  secondary: 'trials',
}

export default Trials
