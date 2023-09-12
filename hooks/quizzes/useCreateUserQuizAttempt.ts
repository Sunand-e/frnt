import { useMutation } from "@apollo/client"
import { CREATE_USER_QUIZ_ATTEMPT, GET_LATEST_USER_QUIZ_ATTEMPT } from "../../graphql/queries/quizzes";

function useCreateUserQuizAttempt() {

  const [createUserQuizAttemptMutation, createUserQuizAttemptResponse] = useMutation(
    CREATE_USER_QUIZ_ATTEMPT,
    {
      update(cache, { data: { createUserQuizAttempt } }, { variables } ) {
        cache.writeQuery({
          query: GET_LATEST_USER_QUIZ_ATTEMPT,
          variables,
          data: {
            latestUserQuizAttempt: createUserQuizAttempt.userQuizAttempt
          }
        });
      }
    }
  );

  const createUserQuizAttempt = values => {
    return createUserQuizAttemptMutation({
      variables: {
        ...values,
      },
    })
  }

  return { 
    createUserQuizAttempt
  }
}

export default useCreateUserQuizAttempt