import { useQuery } from "@apollo/client";
import { GET_COURSE } from "../../graphql/queries/allQueries";

const useGetCourse = id => {
  const { loading, error, data: {course} = {} } = useQuery(
    GET_COURSE,
    {
      variables: {
        id
      }
    }
  );

  return {
    loading,
    error,
    course
  }
}

export default useGetCourse;