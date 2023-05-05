import { useMutation } from "@apollo/client"
import { CREATE_USER_QUESTION_ATTEMPT } from "../../graphql/queries/questions";

function useCreateUserQuestionAttempt() {

  const [createUserQuestionAttemptMutation, createUserQuestionAttemptResponse] = useMutation(
    CREATE_USER_QUESTION_ATTEMPT,
  );

  const createUserQuestionAttempt = values => {
    return createUserQuestionAttemptMutation({
      variables: {
        ...values,
      },
    })
  }

  return { 
    createUserQuestionAttempt
  }
}

export default useCreateUserQuestionAttempt