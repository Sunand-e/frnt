import { useState, useEffect, useContext, useMemo } from 'react'
import { useRouter } from '../../utils/router';
import SearchResults from './SearchResults';
import LoadingSpinner from '../common/LoadingSpinner';
import CategoryFilters from './CategoryFilters';
import CategoriesCollection from './CategoriesCollection';
import { Dot } from '../common/misc/Dot';
import useGetCurrentUser from '../../hooks/users/useGetCurrentUser';

const Categories = () => {
  
  const router = useRouter()
  const { search, category } = router.query
  
  const { tags, courses, resources } = useGetCurrentUser()

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

  const resourceNodes = useMemo(() => {
    return resources?.edges?.map(edge => edge.node).filter(node => {
      return !node._deleted
    })
  } ,[resources])

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
      { !!tags && <CategoryFilters /> }
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
       
        searching ? (
          resourceNodes?.length || courseNodes?.length ? (
            <>
              { courseNodes?.length && <SearchResults items={courseNodes} itemType='course' /> }
              { resourceNodes?.length && <SearchResults items={resourceNodes} itemType='resource' /> }
            </>
          ) : (
            <h3>Sorry, no items found.</h3>
          )
        ) : (
          <CategoriesCollection />            
        )
      }
    </div>
  )
}

export default Categories
