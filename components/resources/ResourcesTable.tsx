import useGetResources from '../../hooks/resources/useGetResources';
import { resourceTypes } from '../resources/resourceTypes';
import ResourceActionsMenu from './ResourceActionsMenu';
import { contentTypes } from '../common/contentTypes';
import ContentTable from '../common/tables/ContentTable';

const ResourcesTable = () => {

  const { loading, error, resources } = useGetResources()
  const tableProps = {
    filters: ['category', 'global', 'contentType'],
    typeOptions: resourceTypes
  }
  const type = contentTypes['resource']

  return (
    <ContentTable
    content={resources} 
    tableProps={tableProps}
    type={type} loading={loading} error={error} ActionsMenuComponent={ResourceActionsMenu} />
  )
}

export default ResourcesTable
