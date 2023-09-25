import { gql, useMutation } from '@apollo/client';
import { CreateQuestion, CreateQuestionVariables } from '../../graphql/mutations/question/__generated__/CreateQuestion';
import { CREATE_QUESTION } from '../../graphql/mutations/question/CREATE_QUESTION';
import { QuizFragmentFragment, SectionChildrenFragmentFragment } from '../../graphql/generated';
import { QuizFragment, SectionChildrenFragment } from '../../graphql/queries/allQueries';

function useCreateQuestion(quizId) {

  const [createQuestionMutation, createQuestionResponse] = useMutation<CreateQuestion, CreateQuestionVariables>(
    CREATE_QUESTION,
    {
      update(cache, { data: { createQuestion } } ) {

        cache.updateFragment<QuizFragmentFragment>({
          id:`ContentItem:${quizId}`,
          fragment: QuizFragment,
          fragmentName: `QuizFragment`
        }, (data) =>  {
          return ({
          ...data,
          questions: [
            ...data.questions,
            createQuestion.question
          ],
        })
      }
        )
      },
    }
  );

  const createQuestion = async (values) => {
    
    const newQuestion = await createQuestionMutation({
      variables: {
        contentItemId: quizId,
        ...values,
      },
      optimisticResponse: {
        createQuestion: {
          __typename: 'CreateQuestionPayload',
          question: {
            __typename: 'Question',
            id: 'temp-' + Math.floor(Math.random() * 10000),
            content: {},
            createdAt: '',
            updatedAt: '',
            answers: [],
            questionType: 'single',
            order: 99999999,
            ...values
          },
          message: ''
        }
      }
    })
    return newQuestion
  }

  return {
    question: createQuestionResponse.data?.createQuestion?.question,
    createQuestion
  }
}

export default useCreateQuestion