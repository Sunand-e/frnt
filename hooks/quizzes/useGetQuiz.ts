import { useQuery } from '@apollo/client';
import { GET_QUIZ } from "../../graphql/queries/allQueries";

function useGetQuiz(id) {
  const { loading, error, data: {quiz} = {} } = useQuery(
    GET_QUIZ,
    {
      variables: { id },
      skip: !id
    }
  );

  return { quiz, loading, error }
}

export default useGetQuiz