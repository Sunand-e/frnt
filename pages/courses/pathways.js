import Head from "next/head";
import PageTitle from "../../components/header/PageTitle";
import PageContent from "../../components/PageContent";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useReactiveVar } from "@apollo/client";
import { libraryVar } from "../../graphql/cache";
import { useState, useEffect } from "react";
import ItemFilterTabs from "../../components/ItemFilterTabs";
import usePageTitle from "../../hooks/usePageTitle";

const Pathways = ({queries}) => {
  
  const items = useReactiveVar(libraryVar);

  usePageTitle({ title: 'Pathways' })

  const [ programmes, setProgrammes ] = useState([])
  useEffect(() => {
    queries.getLibrary()
  },[])

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
                 { !programmes?.length ? <LoadingSpinner /> : <ItemFilterTabs items={programmes} /> }
                </div>
            </PageContent>
        </>
    );
}

Pathways.navState = {
  topLevel: 'courses',
  secondary: 'pathways'
}

export default Pathways