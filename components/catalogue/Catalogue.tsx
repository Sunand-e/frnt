import { useState, useEffect, useContext } from 'react'
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from '../../utils/router';
import SearchResults from './SearchResults';
import LoadingSpinner from '../LoadingSpinner';
import useGetTags from '../../hooks/tags/useGetTags';
import CatalogueFilters from './CatalogueFilters';
import CatalogueCategories from './CatalogueCategories';
import { client } from '../../graphql/client';
import { GET_COURSES } from '../../graphql/queries/allQueries';
import useGetCourses from '../../hooks/courses/useGetCourses';

const CatalogueLibrary = () => {
  
  const router = useRouter()
  const { search, category } = router.query

  const { tags } = useGetTags()
  
  const { courses } = useGetCourses()

  // const {loading, error, data: { courses: courses} = {} } = useQuery(gql`
  //   query GetCatalogue {
  //     courses {
  //       title
  //     }
  //   }
  // `, {
  //   onCompleted: () => {
  //   }
  // })
  
  const [ searching, setSearching ] = useState(false)

  useEffect(() => {
    setSearching(!!(search || category))
    router.push({
      query: {search, category}
    })
  },[search, category])

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