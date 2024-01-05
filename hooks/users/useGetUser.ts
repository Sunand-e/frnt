
import { useQuery } from "@apollo/client"
import { GetUserQuery, GetUserQueryVariables, InputMaybe } from "../../graphql/generated";
import { GET_USER } from "../../graphql/queries/userDetails";

function useGetUser(id: InputMaybe<string> = null) {

  const { loading, error, data } = useQuery<GetUserQuery, GetUserQueryVariables>(
    GET_USER,
    {
      variables: { id },
      skip: !id
    }
  );

  return { user: data?.user, loading, error }
}

export default useGetUser