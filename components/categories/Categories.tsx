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
  
  const { tags, courses, resources, pathways } = useGetCurrentUser()

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

  const getNodes = items => items?.edges?.map(edge => edge.node).filter(node => {
      return !node._deleted
  })

  const filterNodesByCategory = (nodes) => {
    if(category) {
      return nodes.filter(node => {
        const isSelectedCategory = tag => {
          return tag.tagType === 'category' && tag.label === category
        }
        return node.tags && node.tags.some(isSelectedCategory);   
      });
    } else {
      return nodes
    }    
  }

  const courseNodes = useMemo(() => getNodes(courses), [courses])
  const resourceNodes = useMemo(() => getNodes(resources), [resources])
  const pathwayNodes = useMemo(() => getNodes(pathways), [pathways])


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
          filterNodesByCategory(courseNodes)?.length
          || filterNodesByCategory(resourceNodes)?.length
          || filterNodesByCategory(pathwayNodes)?.length ? (
            <>
              { !!filterNodesByCategory(courseNodes)?.length && <SearchResults items={courseNodes} itemType='course' /> }
              { !!filterNodesByCategory(resourceNodes)?.length && <SearchResults items={resourceNodes} itemType='resource' /> }
              { !!filterNodesByCategory(pathwayNodes)?.length && <SearchResults items={pathwayNodes} itemType='pathway' /> }
            </>
          ) : (
            search ? <h3>Sorry, no items match your search.</h3> : <h3>You have not yet been assigned materials in this category.</h3>
          )
        ) : (
          <CategoriesCollection />            
        )
      }
    </div>
  )
}

export default Categories
