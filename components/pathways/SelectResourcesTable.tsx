
import useGetResources from '../../hooks/resources/useGetResources';
import SelectContentTable from './SelectContentTable';

const SelectResourcesTable = ({onRowClick}) => {

  const { resources: resourceConnection, loading, error } = useGetResources()
  const resources = resourceConnection?.edges.map(edge => edge.node)

  return (
    <SelectContentTable 
      contentItems={resources} 
      typeName='resource' 
      onRowClick={onRowClick}
      loading={loading}
      error={error}
    />
  );
}

export default SelectResourcesTable
