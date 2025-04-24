import { GET_RESOURCES_FOR_LEARNER } from '../../../graphql/queries/allQueries';
import useGetResources from '../../../hooks/resources/useGetResources';
import useGetTags from '../../../hooks/tags/useGetTags';
import LoadingSpinner from '../../common/LoadingSpinner';
import ResourceLibraryFilters from './ResourceLibraryFilters';
import SearchResults from './SearchResults';

const ResourceLibrary = () => {
  const { resources, loading } = useGetResources(GET_RESOURCES_FOR_LEARNER)
  const { tags } = useGetTags()

  const resourceNodes = resources?.edges?.map(
    edge => edge.node
  ).filter(
    node => !node._deleted
  ).sort((a, b) => b.order - a.order) || []

  return (
    <div className="flex flex-col items-stretch grow">
      {tags && <ResourceLibraryFilters />}
      {loading && <LoadingSpinner text="Loading resources..." />}
      {!loading && (
        <SearchResults items={resourceNodes} />
      )}
    </div>
  )
}

export default ResourceLibrary
