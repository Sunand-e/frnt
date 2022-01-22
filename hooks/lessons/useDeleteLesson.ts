
import { ContentFragment, GET_LESSON, LessonFragment } from "../../graphql/queries/allQueries"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"

import { DeleteLesson, DeleteLessonVariables } from '../../graphql/mutations/lesson/__generated__/DeleteLesson';
import { DELETE_LESSON } from '../../graphql/mutations/lesson/DELETE_LESSON';
function useDeleteLesson(id) {

  const [deleteLessonMutation, deleteLessonResponse] = useMutation<DeleteLesson, DeleteLessonVariables>(
    DELETE_LESSON,
    {
      update(cache, { data: { deleteLesson } } ) {
        // We get a single item.
        const lesson = cache.readFragment({
          id: `ContentItem:${id}`,
          fragment: LessonFragment,
          fragmentName: 'LessonFragment',
          // optimistic: true,
        });
        // Then, we update it.
        if (lesson) {
          cache.writeFragment({
            id: `ContentItem:${id}`,
            fragment: LessonFragment,
            fragmentName: 'LessonFragment',
            data: {
              ...lesson,
              _deleted: true
            },
          });
        }
      },
    }
  );

  const deleteLesson = (value) => {
    deleteLessonMutation({
      variables: {
        id: value
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
            _deleted: false,
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