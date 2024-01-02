import { useQuery } from '@apollo/client';
import { GET_LESSON } from "../../graphql/queries/allQueries";

function useGetLesson(id) {
  const { loading, error, data: {lesson} = {} } = useQuery(
    GET_LESSON,
    {
      variables: { id },
      skip: !id
    }
  );

  return { lesson, loading, error }
}

export default useGetLesson