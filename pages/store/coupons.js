import Head from 'next/head'

const Coupons = () => {

  return (
    <>
      <Head>
        <title>Coupons | Membership Academy</title>
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
