import { useQuery } from "@apollo/client";
import { GetLatestUserQuizAttemptQuery } from "../../graphql/generated";
import { GET_LATEST_USER_QUIZ_ATTEMPT } from "../../graphql/queries/quizzes";

const useGetLatestQuizAttempt = ({quizId}) => {
  
  const { loading, data, error } = useQuery<GetLatestUserQuizAttemptQuery>(
    GET_LATEST_USER_QUIZ_ATTEMPT,
    {
      variables: {
        contentItemId: quizId
      },
      skip: !quizId
    }
  );

  return {
    loading,
    data,
    error
  }
}

export default useGetLatestQuizAttempt