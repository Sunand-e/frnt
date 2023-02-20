import useGetCurrentUser from '../../hooks/users/useGetCurrentUser';
import SelectContentTable from './SelectContentTable';

const SelectCoursesTable = ({onRowClick}) => {

  const { courses: courseConnection, loading, error } = useGetCurrentUser()

  const courses = courseConnection?.edges.map(edge => edge.node)

  return (
    <SelectContentTable 
      contentItems={courses} 
      typeName='course' 
      onRowClick={onRowClick}
      loading={loading}
      error={error}
    />
  );
}

export default SelectCoursesTable
