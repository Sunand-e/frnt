
import { useQuery } from "@apollo/client"
import { TagFragment } from "../../graphql/queries/tags";
import { GET_CURRENT_USER } from "../../graphql/queries/users";

function useGetCurrentUser(id=null) {

  const { loading, error, data, fetchMore } = useQuery(GET_CURRENT_USER, {
    variables: {
      limitContents:10
    }
  });

  return { 
    user: data?.user, 
    pathways: data?.pathways, 
    courses: data?.courses, 
    lessons: data?.lessons, 
    sections: data?.sections, 
    contentItems: data?.contentItems, 
    resources: data?.resources, 
    tags: data?.tags,
    groups: data?.user?.groups,
    loading, 
    fetchMore,
    error
  }
}

export default useGetCurrentUser