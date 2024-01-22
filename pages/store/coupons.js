import Head from 'next/head'

const Coupons = () => {

  return (
    <>
      <Head>
        <title>Coupons | Zanda360</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

Coupons.navState = {
  topLevel: 'store',
  secondary: 'coupons',
}

export default Coupons
