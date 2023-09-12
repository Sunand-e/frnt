import { useMutation } from "@apollo/client"
import { UpdateUserQuizAttemptMutation } from "../../graphql/generated";
import { UPDATE_USER_QUIZ_ATTEMPT, GET_LATEST_USER_QUIZ_ATTEMPT } from "../../graphql/queries/quizzes";

function useUpdateUserQuizAttempt() {

  const [updateUserQuizAttemptMutation, updateUserQuizAttemptResponse] = useMutation<UpdateUserQuizAttemptMutation>(
    UPDATE_USER_QUIZ_ATTEMPT,
    {
      update(cache, { data: { updateUserQuizAttempt } }, { variables } ) {
        cache.writeQuery({
          query: GET_LATEST_USER_QUIZ_ATTEMPT,
          variables,
          data: {
            latestUserQuizAttempt: updateUserQuizAttempt.userQuizAttempt
          }
        });
      }
    }
  );

  const updateUserQuizAttempt = values => {
    return updateUserQuizAttemptMutation({
      variables: {
        ...values,
      },
    })
  }

  return { 
    updateUserQuizAttempt
  }
}

export default useUpdateUserQuizAttempt