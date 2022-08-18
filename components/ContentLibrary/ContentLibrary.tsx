import { useState, useEffect, useContext } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from '../../utils/router';
import ItemCollection from '../common/items/ItemCollection';
import SearchResults from './SearchResults';
import LoadingSpinner from '../LoadingSpinner';
import useGetTags from '../../hooks/tags/useGetTags';
import useGetCourses from '../../hooks/courses/useGetCourses';
import ContentLibraryFilters from './ContentLibraryFilters';
import useGetResources from '../../hooks/resources/useGetResources';

const ContentLibrary = () => {
  
  const router = useRouter()
  const { search, category } = router.query

  const { tags } = useGetTags()
  const { resources } = useGetResources()
  const resourceNodes = resources?.edges?.map(edge => edge.node).filter(node => !node._deleted) || []
  
  const [ searching, setSearching ] = useState(false)

  useEffect(() => {
    setSearching(!!(search || category))
    // setFilters({search, type, category})
    // alert(JSON.stringify({search, type, category},null,2))
    router.push({
      query: {
        ...(search && { search }),
        ...(category && { category }),
      }
    })
  },[search, category])

  // useEffect(() => {
  //   setSearching(!!(filters.search || filters.category))
  // },[filters])


  return (
    <div className="flex flex-col items-stretch grow">
      { tags && <ContentLibraryFilters /> }
      { !resources && <LoadingSpinner text="Loading resources..."/> }

      {
      // If user is searching, only show search results
      resourceNodes && (
          <SearchResults items={resourceNodes} />
        )
        
      }
    </div>
  )
}

export default ContentLibrary
