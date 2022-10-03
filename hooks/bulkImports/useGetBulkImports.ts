import { GET_BULK_IMPORTS } from "../../graphql/queries/bulkImports"
import { useQuery } from "@apollo/client"
import { GetBulkImports } from "../../graphql/queries/__generated__/GetBulkImports";

function useGetBulkImports() {

    const { loading, error, data: { bulkImports: bulkImports } = {} } = useQuery<GetBulkImports>(GET_BULK_IMPORTS);

    return {
        bulkImports,
        loading,
        error
    }
}

export default useGetBulkImports
