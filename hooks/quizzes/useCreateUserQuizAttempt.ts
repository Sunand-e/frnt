import { gql, useMutation } from "@apollo/client";
import { CREATE_USER_QUIZ_ATTEMPT, GET_LATEST_USER_QUIZ_ATTEMPT, GET_USER_QUIZ_ATTEMPTS, UserQuizAttemptsFragment } from "../../graphql/queries/quizzes";
import useGetCurrentUser from "../users/useGetCurrentUser";

function useCreateUserQuizAttempt() {

  const { user } = useGetCurrentUser()
  const [createUserQuizAttemptMutation, createUserQuizAttemptResponse] = useMutation(
    CREATE_USER_QUIZ_ATTEMPT,
    {
      update(cache, { data: { createUserQuizAttempt } }, { variables } ) {
        cache.updateFragment({
          id: `UserContentEdge:${user?.id}:${variables.contentItemId}`,
          fragment: UserQuizAttemptsFragment,
          fragmentName: 'UserQuizAttemptsFragment',
        }, (data) => {
          return { 
            ...data,
            attempts: [
              ...data.attempts,
              createUserQuizAttempt.userQuizAttempt
            ]
          }
        })
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