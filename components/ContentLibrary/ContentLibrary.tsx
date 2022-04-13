import { useState, useEffect, useContext } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from '../../utils/router';
import contentTypes from '../../contentTypes';
import ItemCollection from '../common/items/ItemCollection';
import SearchFilter from '../../components/SearchFilter';
import SearchResults from './SearchResults';
import LoadingSpinner from '../../components/LoadingSpinner';
import { GET_LIBRARY } from '../../graphql/queries/GET_LIBRARY';
import TopicsList from '../../components/TopicsList';
import { latestContentVar, contentTagsVar } from "../../graphql/cache";
import RecentlyReleased from '../dashboard/RecentlyReleased';
import { QueriesContext } from '../../context/QueriesContext';

const libraryContentTypes = contentTypes.filter(type => !(type?.notInLibrary === true))

const ContentLibrary = () => {
  
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
  
  // When the GET_LIBRARY query completes and has data, run allcontent and dashboard queries

  const { queries } = useContext(QueriesContext)

  useEffect(() => {
    if(data && queries) {
      queries.getAllContent()
      queries.getDashboard()
    }
  }, [data, queries])
  
  const searching = (searchParams.text || searchParams.type || searchParams.tag)

  const handleTopicClick = tag => e => {
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
                  type
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
  )
}

export default ContentLibrary