
import { ContentFragment, GET_LESSON, LessonFragment } from "../../graphql/queries/allQueries"
import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client"

import { DeleteLesson, DeleteLessonVariables } from '../../graphql/mutations/lesson/__generated__/DeleteLesson';
import { DELETE_LESSON } from '../../graphql/mutations/lesson/DELETE_LESSON';

function useDeleteLesson(id) {

  const [deleteLessonMutation, deleteLessonResponse] = useMutation<DeleteLesson, DeleteLessonVariables>(
    DELETE_LESSON,
    {
      update(cache, { data: { deleteLesson } } ) {
        // We get a single item.
        cache.updateFragment({
          id: `ContentItem:${id}`,
          fragment: gql`
            fragment DeletedContentFragment on ContentItem {
              _deleted @client
            }
          `
        }, (data) => ({ _deleted: true }))


        // // Also remove from section
        // cache.updateFragment<SectionChildrenFragmentFragment>({
        //   id:`ContentItem:${sectionId}`,
        //   fragment: SectionChildrenFragment
        // }, (data) => ({
        //   children: [...data.children, createLesson.lesson],
        //   lessons: [...data.lessons, createLesson.lesson]
        // }))
      }

    }
  );

  const deleteLesson = () => {
    deleteLessonMutation({
      variables: {
        id
      },
      
      optimisticResponse: {
        deleteLesson: {
          __typename: 'DeleteLessonPayload',
          lesson: {
            __typename: 'ContentItem',
            id: Math.floor(Math.random() * 10000) + '',
            title: '',
            deletedAt: '',
            updatedAt: '',
            content: {},
            contentType: null,
            itemType: 'lesson',
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
    deleteLesson,
  }
}

export default useDeleteLesson