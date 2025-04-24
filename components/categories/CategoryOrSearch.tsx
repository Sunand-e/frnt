import { useMemo } from 'react';
import useGetCourses from '../../hooks/courses/useGetCourses';
import useGetPathways from '../../hooks/pathways/useGetPathways';
import useGetResources from '../../hooks/resources/useGetResources';
import { useRouter } from '../../utils/router';
import LoadingSpinner from '../common/LoadingSpinner';
import BlinkingEllipsis from '../common/misc/BlinkingEllipsis';
import SearchResults from './SearchResults';
import { GET_RESOURCES_FOR_LEARNER } from '../../graphql/queries/allQueries';

const CategoryOrSearch = () => {

  const router = useRouter()
  const { search, category } = router.query

  const { courses, loading: loadingCourses } = useGetCourses()
  const { resources, loading: loadingResources } = useGetResources(GET_RESOURCES_FOR_LEARNER)
  const { pathways, loading: loadingPathways } = useGetPathways()

  const getNodes = (items: any) => items?.edges?.map((edge: any) => edge.node).filter((node: any) => {
    return !node._deleted
  })

  const filterNodesByCategory = (nodes: any) => {
    if (category && nodes) {
      return nodes.filter((node: any) => {
        const isSelectedCategory = (tag: any) => {
          return (tag.tagType === 'category' || tag.tagType === 'collection') && tag.id === category
        }
        return node.tags && node.tags.edges.some(({ node }) => isSelectedCategory(node));
      });
    } else {
      return nodes || []
    }
  }

  const filterNodes = (nodes: any) => {
    let filteredNodes = search ? nodes.filter((node: any) => (
      node.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
    )) : nodes
    return filterNodesByCategory(filteredNodes)
  }

  const courseNodes = useMemo(() => getNodes(courses), [courses])
  const resourceNodes = useMemo(() => getNodes(resources), [resources])
  const pathwayNodes = useMemo(() => getNodes(pathways), [pathways])

  return (
    <>
      {(loadingCourses || loadingResources || loadingPathways) ? (
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
          {!!filterNodes(courseNodes)?.length && <SearchResults items={filterNodes(courseNodes)} itemType='course' />}
          {!!filterNodes(resourceNodes)?.length && <SearchResults items={filterNodes(resourceNodes)} itemType='resource' />}
          {!!filterNodes(pathwayNodes)?.length && <SearchResults items={filterNodes(pathwayNodes)} itemType='pathway' />}
        </>
      ) : (
        search ? <h3>Sorry, no items match your search.</h3> : <h3>You have not yet been assigned materials in this category.</h3>
      )
      }
    </>
  )
}

export default CategoryOrSearch
