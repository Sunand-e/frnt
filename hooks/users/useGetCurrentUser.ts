
import { useQuery } from "@apollo/client"
import { GET_CURRENT_USER } from "../../graphql/queries/users";

function useGetCurrentUser(id=null) {

  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  return { 
    user: data?.user, 
    pathways: data?.pathways, 
    courses: data?.courses, 
    lessons: data?.lessons, 
    sections: data?.sections, 
    contentItems: data?.contentItems, 
    resources: data?.resources, 
    loading, 
    error
  }
}

export default useGetCurrentUser