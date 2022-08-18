import Head from "next/head";
import usePageTitle from "../../hooks/usePageTitle";

const PathwaysPage = () => {
  
  usePageTitle({ title: 'Pathways' })

  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
    </>
  );
}

PathwaysPage.navState = {
  topLevel: 'courses',
  secondary: 'pathways'
}

export default PathwaysPage
