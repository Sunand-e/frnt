import { useState, useEffect, useContext, useMemo } from 'react'
import { useRouter } from '../../utils/router';
import SearchResults from './SearchResults';
import LoadingSpinner from '../common/LoadingSpinner';
import useGetTags from '../../hooks/tags/useGetTags';
import CategoryFilters from './CategoryFilters';
import CategoriesCollection from './CategoriesCollection';
import { client } from '../../graphql/client';
import { GET_COURSES } from '../../graphql/queries/allQueries';
import useGetCourses from '../../hooks/courses/useGetCourses';
import { Dot } from '../common/misc/Dot';

const Categories = () => {
  
  const router = useRouter()
  const { search, category } = router.query

  const { tags } = useGetTags()
  
  const { courses } = useGetCourses()

  // const {loading, error, data: { courses: courses} = {} } = useQuery(gql`
  //   query GetCategories {
  //     courses {
  //       title
  //     }
  //   }
  // `, {
  //   onCompleted: () => {
  //   }
  // })
  const courseNodes = useMemo(() => {
    return courses?.edges?.map(edge => edge.node).filter(node => {
      return !node._deleted
    })
  } ,[courses])

  const [ searching, setSearching ] = useState(false)

  useEffect(() => {
    setSearching(!!(search || category))
    if(search || category) {
      router.push({
        query: {search, category}
      })
    }
  },[search, category])

  return (
    <div className="flex flex-col items-stretch grow">
      { tags && <CategoryFilters /> }
      { !courses && <LoadingSpinner text={(
        <>
          Loading categories
          <Dot>.</Dot>
          <Dot>.</Dot>
          <Dot>.</Dot>
        </>
      )} /> }
      {
      // If user is searching, only show search results
       courseNodes && (
          searching ? (
            <SearchResults 
              items={courseNodes}
            />
          ) : (
            <CategoriesCollection />            
          )
        )
      }
    </div>
  )
}

export default Categories
