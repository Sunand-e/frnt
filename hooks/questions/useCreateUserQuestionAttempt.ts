import { useMutation } from "@apollo/client"
import { UserQuizAttemptFragmentFragment } from "../../graphql/generated";
import { CREATE_USER_QUESTION_ATTEMPT } from "../../graphql/queries/questions";
import { UserQuizAttemptFragment } from "../../graphql/queries/quizzes";

function useCreateUserQuestionAttempt({quizAttemptId}) {

  const [createUserQuestionAttemptMutation, {loading, error}] = useMutation(
    CREATE_USER_QUESTION_ATTEMPT,
    {
      update(cache, { data: { createUserQuestionAttempt } } ) {
        cache.updateFragment<UserQuizAttemptFragmentFragment>({
          id:`UserQuizAttempt:${quizAttemptId}`,
          fragment: UserQuizAttemptFragment,
          fragmentName: 'UserQuizAttemptFragment'
        }, (data) => {
          return ({
            ...data,
            userQuestionAttempts: [
              ...data.userQuestionAttempts,
              createUserQuestionAttempt.userQuestionAttempt  
            ]
          })
        })
      }
    }
  );

  const createUserQuestionAttempt = values => {
    return createUserQuestionAttemptMutation({
      variables: {
        ...values,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createUserQuestionAttempt: {
          __typename: 'CreateUserQuestionAttemptPayload',
          userQuestionAttempt: {
            __typename: 'UserQuestionAttempt',
            id: 'temp',
            question: {
              id: values.questionId
            },
            createdAt: '',
            updatedAt: '',
            answers: [],
            score: 0,
            status: 'unanswered',
            userQuizAttempt: {
              id: values.userQuizAttemptId
            }
          }
        }
      }
    })
  }

  return { 
    createUserQuestionAttempt,
    loading,
    error
  }
}

export default useCreateUserQuestionAttempt