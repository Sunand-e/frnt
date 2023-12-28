import { useEffect } from 'react';
import useGetResources from '../../../hooks/resources/useGetResources';
import useGetTags from '../../../hooks/tags/useGetTags';
import { useRouter } from '../../../utils/router';
import LoadingSpinner from '../../common/LoadingSpinner';
import ResourceLibraryFilters from './ResourceLibraryFilters';
import SearchResults from './SearchResults';

const ResourceLibrary = () => {
  
  const router = useRouter()
  const { search, category } = router.query

  const { resources } = useGetResources()
  const { tags } = useGetTags()

  const resourceNodes = resources?.edges?.map(
    edge => edge.node
  ).filter(
    node => !node._deleted
  ).sort((a,b) => b.order - a.order) || []

  useEffect(() => {
    router.push({
      query: {
        ...router.query,
        ...(search && { search }),
        ...(category && { category }),
      }
    })
  },[search, category])


  return (
    <div className="flex flex-col items-stretch grow">
      { tags && <ResourceLibraryFilters /> }
      { !resources && <LoadingSpinner text="Loading resources..."/> }
      { resources && resourceNodes && (
        <SearchResults items={resourceNodes} />
      )}
    </div>
  )
}

export default ResourceLibrary
