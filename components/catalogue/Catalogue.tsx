import { useState, useEffect, useContext } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from '../../utils/router';
import contentTypes from '../../contentTypes';
import ItemCollection from '../common/items/ItemCollection';
import SearchResults from './SearchResults';
import LoadingSpinner from '../LoadingSpinner';
import { GET_LIBRARY } from '../../graphql/queries/GET_LIBRARY';
import { latestContentVar } from "../../graphql/cache";
import { QueriesContext } from '../../context/QueriesContext';
import useGetTags from '../../hooks/tags/useGetTags';
import useGetCourses from '../../hooks/courses/useGetCourses';
import CatalogueFilters from './CatalogueFilters';
import CatalogueCategories from './CatalogueCategories';

const CatalogueLibrary = () => {
  
  const router = useRouter()
  const { search, category } = router.query

  const { tags } = useGetTags()
  const { courses } = useGetCourses()
  
  const [ searching, setSearching ] = useState(false)

  useEffect(() => {
    setSearching(!!(search || category))
    // setFilters({search, type, category})
    // alert(JSON.stringify({search, type, category},null,2))
    router.push({
      query: {search, category}
    })
  },[search, category])

  // useEffect(() => {
  //   setSearching(!!(filters.search || filters.category))
  // },[filters])


  return (
    <div className="flex flex-col items-stretch flex-grow">
      { tags && <CatalogueFilters /> }
      { !courses && <LoadingSpinner text="Loading courses..."/> }

      {
      // If user is searching, only show search results
        courses && (
          searching ? (
            <SearchResults 
              items={courses}
            />
          ) : (
            <CatalogueCategories />            
          )
        )
        
      }
    </div>
  )
}

export default CatalogueLibrary