import Head from "next/head";
import PageContent from "../../components/PageContent";
import { useReactiveVar } from "@apollo/client";
import { libraryVar } from "../../graphql/cache";
import { useState, useEffect, useContext } from "react";
// import ItemFilterTabs from "../../components/ItemFilterTabs";
import usePageTitle from "../../hooks/usePageTitle";
import { QueriesContext } from "../../context/QueriesContext";

const PathwaysPage = () => {
  
  const items = useReactiveVar(libraryVar);

  usePageTitle({ title: 'Pathways' })

  const [ programmes, setProgrammes ] = useState([])
  const { queries } = useContext(QueriesContext)
  useEffect(() => {
    queries?.getLibrary()
  },[queries])

  useEffect(() => {
    setProgrammes(items?.filter(item => item.__typename === 'Programme'))
  },[items])

  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent>
        <div className="flex-grow">
          {/* { !programmes?.length ? <LoadingSpinner /> : <ItemFilterTabs items={programmes} /> } */}
        </div>
      </PageContent>
    </>
  );
}

PathwaysPage.navState = {
  topLevel: 'courses',
  secondary: 'pathways'
}

export default PathwaysPage