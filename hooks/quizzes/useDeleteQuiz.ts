
import { ContentFragment, GET_QUIZ, QuizFragment } from "../../graphql/queries/allQueries"
import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client"

import { DeleteQuiz, DeleteQuizVariables } from '../../graphql/mutations/quiz/__generated__/DeleteQuiz';
import { DELETE_QUIZ } from '../../graphql/mutations/quiz/DELETE_QUIZ';

function useDeleteQuiz(id) {

  const [deleteQuizMutation, deleteQuizResponse] = useMutation<DeleteQuiz, DeleteQuizVariables>(
    DELETE_QUIZ,
    {
      update(cache, { data: { deleteQuiz } } ) {
        // We get a single item.
        cache.updateFragment({
          id: `ContentItem:${id}`,
          fragment: gql`
            fragment DeletedContentFragment on ContentItem {
              _deleted @client
            }
          `
        }, (data) => ({ _deleted: true }))
      }

    }
  );

  const deleteQuiz = () => {
    deleteQuizMutation({
      variables: {
        id
      },
      
      optimisticResponse: {
        deleteQuiz: {
          __typename: 'DeleteQuizPayload',
          quiz: {
            __typename: 'ContentItem',
            id: Math.floor(Math.random() * 10000) + '',
            title: '',
            deletedAt: '',
            updatedAt: '',
            content: {},
            contentType: null,
            itemType: 'quiz',
            image: null,
            icon: null,
            prerequisites: null,
            _deleted: true,
          },
          message: ''
        }
      }
      // refetchQueries: [{ query: GET_COURSE }]
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }


  return {
    deleteQuiz,
  }
}

export default useDeleteQuiz