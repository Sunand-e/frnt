import Head from 'next/head'

const Products = () => {

  return (
    <>
      <Head>
        <title>Products | Zanda360</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

Products.navState = {
  topLevel: 'store',
  secondary: 'products',
}

export default Products
