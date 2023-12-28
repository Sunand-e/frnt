
import { useQuery } from "@apollo/client"
import { GetUserQuery, GetUserQueryVariables, InputMaybe } from "../../graphql/generated";
import { GET_USER } from "../../graphql/queries/userDetails";

function useGetUser(id: InputMaybe<string> = null) {

  const { loading, error, data: {user} = {} } = useQuery<GetUserQuery, GetUserQueryVariables>(
    GET_USER,
    {
      
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      variables: id ? { id } : undefined
    }
  );

  return { user, loading, error }
}

export default useGetUser