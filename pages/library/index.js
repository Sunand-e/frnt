import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from '../../utils/router';
import contentTypes from '../../contentTypes';
import ItemCollection from '../../components/ItemCollection';
import SearchFilter from '../../components/SearchFilter';
import SearchResults from '../../components/SearchResults';
import LoadingSpinner from '../../components/LoadingSpinner';
import PageTitle from '../../components/PageTitle';
import PageContent from '../../components/PageContent';
import { GET_LIBRARY } from '../../graphql/queries/GET_LIBRARY';
import TopicsList from '../../components/TopicsList';
import { latestContentVar, contentTagsVar, libraryVar } from "../../graphql/cache";
import RecentlyReleased from '../../components/RecentlyReleased';
import { client } from '../../graphql/client'

const libraryContentTypes = contentTypes.filter(type => !(type?.notInLibrary === true))

// Library.getInitialProps = async({ query }) => {
//   const { text, type, tag } = query
//   return { text, type, tag }
// }

// const Library = ({text,type,tag}) => {
const Library = ({queries}) => {
  const router = useRouter()
  const { text, type, tag } = router.query

  const [ items, setItems ] = useState([])

  const contentTags = useReactiveVar(contentTagsVar)

  const latestContent = useReactiveVar(latestContentVar)

  // const initialTag = contentTags.find(contentTag => contentTag.slug === tag)

  const [ searchParams, setSearchParams ] = useState(
    {
      text,
      type,
      tag: tag ? {
        value: contentTags.find(ctag => tag === ctag.slug )?.slug,
        label: contentTags.find(ctag => tag === ctag.slug )?.name,
      } : ''
    }
  );

  const { loading, error, data } = useQuery(GET_LIBRARY);
  // const data = queries.getLibrary()
  
  // When the GET_LIBRARY query completes and has data,
  useEffect(() => {
    if(data) {
      queries.getAllContent()
      queries.getDashboard()
    }
  }, [data])
  
  const searching = (searchParams.text || searchParams.type?.value || searchParams.tag?.value)

  const handleTopicClick = tag => e => {
    // alert(e.target)
    e.preventDefault()
    setSearchParams({
      ...searchParams,
      tag: {
        value: tag.slug,
        label: tag.name,
      }
    })
  }
  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTitle title={`Content Library`} />
      <PageContent>
        <div className="flex flex-col items-stretch flex-grow">
          {/* { contentTags && <SearchFilter tags={contentTags} searchParams={searchParams} setSearchParams={setSearchParams} /> } */}
          { !data && <LoadingSpinner text="Loading library assets..."/> }

          {
            // If user is searching, only show search results
            (data && searching &&
              <SearchResults 
                tags={contentTags}
                items={items}
                searchParams={searchParams}
              />
            )
          }
          {
            (data && !searching &&
              // If not searching, show the topics list and all content type sections
              <>
                <RecentlyReleased />
                <TopicsList onTopicClick={handleTopicClick} />
                {
                  libraryContentTypes.map((type, index) => {

                    const items = data?.contentNodes?.nodes.filter(node => (
                      node.__typename === type.name.replace(' ', '')
                    )) || []
                      
                    const options = { 
                      heading: type.pluralName,
                      maxItems: 3,
                      itemOptions: {
                        showType: false
                      }
                    }
                    const viewAllParams = {
                      ...searchParams,
                      type: {
                        label: type.pluralName,
                        value: type.slug
                      }
                    }
                    return (
                      <ItemCollection 
                        viewAll={() => setSearchParams(viewAllParams)} 
                        key={index} 
                        items={items || []} 
                        options={options}
                      />
                    )
                  })
                }
              </>
            )
          }
        </div>
      </PageContent>
    </>
  )
}

Library.navState = {
  topLevel: 'library',
  secondary: 'overview'
}

export default Library