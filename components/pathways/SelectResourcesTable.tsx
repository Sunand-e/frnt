
import useGetCurrentUser from '../../hooks/users/useGetCurrentUser';
import SelectContentTable from './SelectContentTable';

const SelectResourcesTable = ({onRowSelect}) => {

  const { resources: resourceConnection, loading, error } = useGetCurrentUser()
  const resources = resourceConnection?.edges.map(edge => edge.node)

  return (
    <SelectContentTable 
      contentItems={resources} 
      typeName='resource' 
      onRowSelect={onRowSelect}
      loading={loading}
      error={error}
    />
  );
}

export default SelectResourcesTable
