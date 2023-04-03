
import { useQuery } from "@apollo/client"
import { GetUserCourseQuery } from "../../graphql/generated";
import { GET_USER_COURSE } from "../../graphql/queries/users";

function useGetUserCourse(id=null) {
  
  const { loading, error, data } = useQuery<GetUserCourseQuery>(
    GET_USER_COURSE,
    {
      // fetchPolicy: "cache-and-network",
      // nextFetchPolicy: "cache-only",
      variables: {
        courseFilter: {
          courseId: id
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

export default useGetUserCourse