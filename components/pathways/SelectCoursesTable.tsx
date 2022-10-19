import useGetCurrentUser from '../../hooks/users/useGetCurrentUser';
import SelectContentTable from './SelectContentTable';

const SelectCoursesTable = ({onRowSelect}) => {

  const { courses: courseConnection, loading, error } = useGetCurrentUser()

  const courses = courseConnection?.edges.map(edge => edge.node)

  return (
    <SelectContentTable 
      contentItems={courses} 
      typeName='course' 
      onRowSelect={onRowSelect}
      loading={loading}
      error={error}
    />
  );
}

export default SelectCoursesTable
