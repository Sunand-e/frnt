
import { ContentFragment, QuestionFragment } from "../../graphql/queries/allQueries"
import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client"

import { DeleteQuestion, DeleteQuestionVariables } from '../../graphql/mutations/question/__generated__/DeleteQuestion';
import { DELETE_QUESTION } from '../../graphql/mutations/question/DELETE_QUESTION';

function useDeleteQuestion() {

  const [deleteQuestionMutation, deleteQuestionResponse] = useMutation<DeleteQuestion, DeleteQuestionVariables>(
    DELETE_QUESTION,

  );

  const deleteQuestion = (id) => {
    deleteQuestionMutation({
      variables: {
        id
      },
      
      optimisticResponse: {
        deleteQuestion: {
          __typename: 'DeleteQuestionPayload',
          question: {
            __typename: 'Question',
            id: Math.floor(Math.random() * 10000) + '',
            title: '',
            deletedAt: '',
            updatedAt: '',
            content: {},
            contentType: null,
            itemType: 'question',
            image: null,
            icon: null,
            prerequisites: null,
            _deleted: true,
          },
          message: ''
        }
      },

      update(cache, { data: { deleteQuestion } } ) {
        // We get a single item.
        cache.updateFragment({
          id: `Question:${id}`,
          fragment: gql`
            fragment DeletedQuestionFragment on Question {
              _deleted @client
            }
          `
        }, (data) => ({ _deleted: true }))


        // // Also remove from section
        // cache.updateFragment<SectionChildrenFragmentFragment>({
        //   id:`ContentItem:${sectionId}`,
        //   fragment: SectionChildrenFragment
        // }, (data) => ({
        //   children: [...data.children, createQuestion.question],
        //   questions: [...data.questions, createQuestion.question]
        // }))
      }
      // refetchQueries: [{ query: GET_COURSE }]
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }


  return {
    deleteQuestion,
  }
}

export default useDeleteQuestion