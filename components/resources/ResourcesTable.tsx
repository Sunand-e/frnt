import useGetResources from '../../hooks/resources/useGetResources';
import ResourceActionsMenu from './ResourceActionsMenu';
import { contentTypes } from '../common/contentTypes';
import ContentTable from '../common/tables/ContentTable';

const ResourcesTable = () => {
  const { resources, loading, error, reLoad } = useGetResources({ pagination: true });
  const type = contentTypes['resource'];

  return (
    <ContentTable
      content={resources}
      type={type}
      loading={loading}
      error={error}
      ActionsMenuComponent={ResourceActionsMenu}
      remote={true}
      reLoad={reLoad}
    />
  );
};

export default ResourcesTable;

