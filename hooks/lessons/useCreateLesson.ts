import { gql, useMutation } from '@apollo/client';
import { CreateLesson, CreateLessonVariables } from '../../graphql/mutations/lesson/__generated__/CreateLesson';
import { CREATE_LESSON } from '../../graphql/mutations/lesson/CREATE_LESSON';
import { SectionChildrenFragmentFragment } from '../../graphql/generated';
export const SectionChildrenFragment = gql`
  fragment SectionChildrenFragment on ContentItem {
    children {
      __typename
      id
      _deleted @client
    }
  }
`

function useCreateLesson(sectionId) {

  const [createLessonMutation, createLessonResponse] = useMutation<CreateLesson, CreateLessonVariables>(
    CREATE_LESSON,
    {
      update(cache, { data: { createLesson } } ) {

        cache.updateFragment<SectionChildrenFragmentFragment>({
          id:`ContentItem:${sectionId}`,
          fragment: SectionChildrenFragment
        }, (data) => ({
          children: [
            // ...data.children.filter(child => child._deleted === false),
            ...data.children,
            createLesson.lesson
          ],
        }))
      },
    }
  );

  const createLesson = (values) => {
    createLessonMutation({
      variables: {
        ...values,
        parentIds: [sectionId]
      },
      optimisticResponse: {
        createLesson: {
          __typename: 'CreateLessonPayload',
          lesson: {
            __typename: 'ContentItem',
            id: Math.floor(Math.random() * 10000) + '',
            title: values.title || '',
            createdAt: '',
            updatedAt: '',
            content: {},
            contentType: 'text',
            itemType: 'lesson',
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
          },
          message: ''
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    lesson: createLessonResponse.data?.createLesson?.lesson,
    createLesson
  }
}

export default useCreateLesson