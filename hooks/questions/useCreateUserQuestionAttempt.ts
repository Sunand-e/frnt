import { useMutation } from "@apollo/client"
import { UserQuizAttemptFragmentFragment } from "../../graphql/generated";
import { CREATE_USER_QUESTION_ATTEMPT } from "../../graphql/queries/questions";
import { UserQuizAttemptFragment } from "../../graphql/queries/quizzes";

function useCreateUserQuestionAttempt({quizAttemptId}) {

  const [createUserQuestionAttemptMutation, createUserQuestionAttemptResponse] = useMutation(
    CREATE_USER_QUESTION_ATTEMPT,
    {
      update(cache, { data: { createUserQuestionAttempt } } ) {
        cache.updateFragment<UserQuizAttemptFragmentFragment>({
          id:`UserQuizAttempt:${quizAttemptId}`,
          fragment: UserQuizAttemptFragment
        }, (data) => {
          console.log('data')
          console.log(data)
          console.log('createUserQuestionAttempt')
          console.log(createUserQuestionAttempt)
          return ({
            ...data,
            userQuestionAttempts: [
              ...data.userQuestionAttempts,
              createUserQuestionAttempt.userQuestionAttempt  
            ]
          })
        })
      },
    }
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