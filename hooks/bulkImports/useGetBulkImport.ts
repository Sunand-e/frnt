
import { useQuery } from "@apollo/client"
import { GET_BULK_IMPORT } from "../../graphql/queries/bulkImports";

function useGetBulkImport(id=null) {

  const { loading, error, data: {bulkImport} = {} } = useQuery(
    GET_BULK_IMPORT,
    {
      variables: id ? { id } : null
    }
  );

  return { bulkImport, loading, error }
}

export default useGetBulkImport
