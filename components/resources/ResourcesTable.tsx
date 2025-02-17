import useGetResources from '../../hooks/resources/useGetResources';
import ResourceActionsMenu from './ResourceActionsMenu';
import { contentTypes } from '../common/contentTypes';
import ContentTable from '../common/tables/ContentTable';

const ResourcesTable = () => {
  const { resources, loading, error } = useGetResources({ pagination: true });
  const type = contentTypes['resource']

  return (
    <ContentTable content={resources} type={type} loading={loading} error={error} ActionsMenuComponent={ResourceActionsMenu} />
  )
}

export default ResourcesTable
