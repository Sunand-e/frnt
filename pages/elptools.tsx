import Head from "next/head"
import ImportElpCourses from "../components/dashboard/ImportElpCourses"

const ElpToolsPage = () => {
  return (
    <>
      <Head>
        <title>Zanda360</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <ImportElpCourses />
    </>
  )
}

ElpToolsPage.navState = {
  topLevel: 'dashboard',
  // secondary: 'dashboard'
}

export default ElpToolsPage