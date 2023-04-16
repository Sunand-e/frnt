import { gql, useMutation } from '@apollo/client';
import { CreateQuiz, CreateQuizVariables } from '../../graphql/mutations/quiz/__generated__/CreateQuiz';
import { CREATE_QUIZ } from '../../graphql/mutations/quiz/CREATE_QUIZ';

function useCreateQuiz(sectionId) {

  const [createQuizMutation, createQuizResponse] = useMutation<CreateQuiz, CreateQuizVariables>(
    CREATE_QUIZ
  );

  const createQuiz = async (values) => {
    console.log('values')
    console.log(values)
    const newQuiz = await createQuizMutation({
      variables: {
        ...values,
        parentIds: [sectionId]
      },
      optimisticResponse: {
        createQuiz: {
          __typename: 'CreateQuizPayload',
          quiz: {
            __typename: 'ContentItem',
            id: 'temp-' + Math.floor(Math.random() * 10000),
            title: '',
            createdAt: '',
            updatedAt: '',
            content: {},
            contentType: 'text',
            itemType: 'quiz',
            image: null,
            icon: null,
            prerequisites: null,
            _deleted: false,
            settings: '',
            shared: false,
            mediaItem: null,
            users: {
              __typename: 'ContentUserConnection',
              totalCount: 0
            },
            tags: [],
            order: 99999999,
            ...values
          },
          message: ''
        }
      }
    })
    return newQuiz
  }

  return {
    quiz: createQuizResponse.data?.createQuiz?.quiz,
    createQuiz
  }
}

export default useCreateQuiz