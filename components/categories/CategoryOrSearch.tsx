import { useMemo } from 'react';
import useGetCourses from '../../hooks/courses/useGetCourses';
import useGetPathways from '../../hooks/pathways/useGetPathways';
import useGetResources from '../../hooks/resources/useGetResources';
import useGetTags from '../../hooks/tags/useGetTags';
import { useRouter } from '../../utils/router';
import LoadingSpinner from '../common/LoadingSpinner';
import BlinkingEllipsis from '../common/misc/BlinkingEllipsis';
import SearchResults from './SearchResults';

const CategoryOrSearch = () => {
  
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

  const filterNodes = (nodes) => {
    let filteredNodes = search ? nodes.filter(node => (
      node.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
    )) : nodes
    return filterNodesByCategory(filteredNodes)
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
            <BlinkingEllipsis />
          </>
        )} />
      ) : filterNodes(courseNodes)?.length
        || filterNodes(resourceNodes)?.length
        || filterNodes(pathwayNodes)?.length ? (
          <>
            { !!filterNodes(courseNodes)?.length && <SearchResults items={courseNodes} itemType='course' /> }
            { !!filterNodes(resourceNodes)?.length && <SearchResults items={resourceNodes} itemType='resource' /> }
            { !!filterNodes(pathwayNodes)?.length && <SearchResults items={pathwayNodes} itemType='pathway' /> }
          </>
        ) : (
          search ? <h3>Sorry, no items match your search.</h3> : <h3>You have not yet been assigned materials in this category.</h3>
        )
      }
    </>
  )
}

export default CategoryOrSearch
