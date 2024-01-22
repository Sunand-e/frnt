import Head from 'next/head'

const Offers = () => {

  return (
    <>
      <Head>
        <title>Offers | Zanda360</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

Offers.navState = {
  topLevel: 'store',
  secondary: 'offers',
}

export default Offers
