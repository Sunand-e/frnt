
import { useQuery } from "@apollo/client"
import { GET_USER_CONTENT } from "../../graphql/queries/users";

function useGetUserContent(id=null) {
  
  const { loading, error, data: {user} = {} } = useQuery(
    GET_USER_CONTENT,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      variables: {
        where: {
          id
        },
        whereCourse: {
          courseId: id
        }
      },
      skip: !id
    }
  );

  return { user, loading, error }
}

export default useGetUserContent