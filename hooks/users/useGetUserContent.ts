
import { useQuery } from "@apollo/client"
import { GET_USER_CONTENT } from "../../graphql/queries/users";

function useGetUserContent(id=null) {
  
  const { loading, error, data } = useQuery(
    GET_USER_CONTENT,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-only",
      variables: {
        courseFilter: {
          id
        },
        lessonSectionFilter: {
          courseId: id
        }
      },
      skip: !id
    }
  );

  return { 
    user: data?.user, 
    pathways: data?.pathways, 
    courses: data?.courses,
    courseEdge: data?.courses?.edges[0],
    lessons: data?.lessons, 
    sections: data?.sections, 
    contentItems: data?.contentItems, 
    resources: data?.resources,
    loading,
    error
  }
}

export default useGetUserContent