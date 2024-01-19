import { useQuery } from "@apollo/client";
import { GetUserQuizAttemptsQuery } from "../../graphql/generated";
import { GET_USER_QUIZ_ATTEMPTS } from "../../graphql/queries/quizzes";

const useGetUserQuizAttempts = ({id}) => {
  
  const { loading, data, error } = useQuery<GetUserQuizAttemptsQuery>(
    GET_USER_QUIZ_ATTEMPTS,
    {
      variables: {
        where: { courseId: id }
      },
      skip: !id
    }
  );

  return {
    loading,
    data,
    error
  }
}

export default useGetUserQuizAttempts