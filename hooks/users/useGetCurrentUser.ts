
import { useQuery } from "@apollo/client"
import { TagFragment } from "../../graphql/queries/tags";
import { GET_CURRENT_USER } from "../../graphql/queries/users";

function useGetCurrentUser() {

  const { loading, error, data, fetchMore } = useQuery(GET_CURRENT_USER, {
    variables: {
      // limitContents:10
    }
  });

  return { 
    user: data?.user, 
    courses: data?.courses, 
    tags: data?.tags,
    loading, 
    fetchMore,
    error
  }
}

export default useGetCurrentUser