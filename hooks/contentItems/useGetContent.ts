
import { useQuery } from "@apollo/client"
import { contentTypes } from "../../components/common/contentTypes";

function useGetContent(typeName) {

  const type = contentTypes[typeName]

  const {loading, error, data } = useQuery(
    type.gqlGetQuery,
    {
      ...(type.gqlVariables && { variables: type.gqlVariables }),
    }
  );

  return {
    content: data?.courses || data?.resources || data?.pathways || data?.contentItems,
    loading,
    error
  }
}

export default useGetContent