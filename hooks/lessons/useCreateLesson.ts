import { gql, useMutation } from '@apollo/client';
import { CreateLesson, CreateLessonVariables } from '../../graphql/mutations/lesson/__generated__/CreateLesson';
import { CREATE_LESSON } from '../../graphql/mutations/lesson/CREATE_LESSON';
import { SectionChildrenFragmentFragment } from '../../graphql/generated';
import { SectionChildrenFragment } from '../../graphql/queries/allQueries';
import { GET_USER_COURSE } from '../../graphql/queries/users';
import useGetCurrentUser from '../users/useGetCurrentUser';
import { userContentEdgeDefaults } from '../users/userContentEdgeDefaults';
import { contentItemDefaults } from '../contentItems/contentItemDefaults';

function useCreateLesson(sectionId) {

  const { user } = useGetCurrentUser()

  const [createLessonMutation, createLessonResponse] = useMutation<CreateLesson, CreateLessonVariables>(
    CREATE_LESSON,
    {
      update(cache, { data: { createLesson } } ) {

        // Fetch the cached to-do item with ID 5
        const data = cache.readFragment({
          id: `ContentItem:${sectionId}`, // The value of the to-do item's cache ID
          fragment: gql`
            fragment ParentsFragment on ContentItem {
              parents {
                id
              }
            }
          `,
        });
        
        cache.updateFragment<SectionChildrenFragmentFragment>({
          id:`ContentItem:${sectionId}`,
          fragment: SectionChildrenFragment
        }, (data) => ({
          children: [
            // ...data.children.filter(child => child._deleted === false),
            ...data.children,
            {
              ...createLesson.lesson,
            }
          ],
        }))

        for(const parent of data.parents) {
          cache.updateQuery({
            query: GET_USER_COURSE,
            variables: {
              courseFilter: {
                courseId: parent.id
              },
              lessonSectionFilter: {
                courseId: parent.id
              }
            }
          }, (data) => {

            const newEdge = {
              ...userContentEdgeDefaults,
              userId: user.id,            
              node: {
                ...userContentEdgeDefaults.node,
                ...createLesson.lesson
              }
            }

            const newData = {
              ...data,
              lessons: {
                ...data.lessons,
                edges: [
                  ...data.lessons.edges,
                  newEdge
                ],
                totalCount: data.lessons.totalCount + 1
              },
            }
            
            return newData;
          });
        }
      },
    }
  );

  const createLesson = async (values) => {
    const newLesson = await createLessonMutation({
      variables: {
        ...values,
        parentIds: [sectionId]
      },
      optimisticResponse: {
        createLesson: {
          __typename: 'CreateLessonPayload',
          lesson: {
            ...contentItemDefaults,
            id: 'temp-' + Math.floor(Math.random() * 10000),
            itemType: 'lesson',
            contentType: 'text',
            _isOptimistic: true,
            ...values
          },
          message: ''
        }
      }
    })
    return newLesson
  }

  return {
    lesson: createLessonResponse.data?.createLesson?.lesson,
    createLesson
  }
}

export default useCreateLesson