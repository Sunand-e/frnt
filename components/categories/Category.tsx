import { useState, useEffect, useContext, useMemo } from 'react'
import { useRouter } from '../../utils/router';
import SearchResults from './SearchResults';
import LoadingSpinner from '../common/LoadingSpinner';
import CategoryFilters from './CategoryFilters';
import { Dot } from '../common/misc/Dot';
import useGetTags from '../../hooks/tags/useGetTags';
import useGetCourses from '../../hooks/courses/useGetCourses';
import useGetResources from '../../hooks/resources/useGetResources';
import useGetPathways from '../../hooks/pathways/useGetPathways';

const Category = () => {
  
  const router = useRouter()
  const { search, category } = router.query
  
  const { tags, loading: loadingTags } = useGetTags()
  const { courses, loading: loadingCourses } = useGetCourses()
  const { resources, loading: loadingResources } = useGetResources()
  const { pathways, loading: loadingPathways } = useGetPathways()

  // const {loading, error, data: { courses: courses} = {} } = useQuery(gql`
  //   query GetCategory {
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
    console.log('nodes')
    console.log(nodes)
    if(category && nodes) {
      return nodes.filter(node => {
        const isSelectedCategory = tag => {
          return tag.tagType === 'category' && tag.label === category
        }
        return node.tags && node.tags.edges.some(({node}) => isSelectedCategory(node));   
      });
    } else {
      return nodes || []
    }    
  }

  const courseNodes = useMemo(() => getNodes(courses), [courses])
  const resourceNodes = useMemo(() => getNodes(resources), [resources])
  const pathwayNodes = useMemo(() => getNodes(pathways), [pathways])

  return (
    <>
      { (loadingTags || loadingCourses || loadingResources || loadingPathways) ? (
        <LoadingSpinner text={(
          <>
            Loading category
            <Dot>.</Dot>
            <Dot>.</Dot>
            <Dot>.</Dot>
          </>
        )} />
      ) : filterNodesByCategory(courseNodes)?.length
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
      }
    </>
  )
}

export default Category
