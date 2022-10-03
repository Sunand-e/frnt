import { GET_PATHWAY } from "../../graphql/queries/allQueries"
import { useQuery } from "@apollo/client"
import { GetPathway } from "../../graphql/queries/__generated__/GetPathway";

function useGetPathway(id=null) {

  const { loading, error, data: { pathway: pathway} = {} } = useQuery<GetPathway>(
    GET_PATHWAY,
    {
      variables: {
        id
      }
    }
  );

  return {
    pathway,
    loading,
    error
  }
}

export default useGetPathway