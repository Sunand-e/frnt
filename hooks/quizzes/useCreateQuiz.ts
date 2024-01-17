import { gql, useMutation } from '@apollo/client';
import { SectionChildrenFragmentFragment } from '../../graphql/generated';
import { CREATE_QUIZ } from '../../graphql/mutations/quiz/CREATE_QUIZ';
import { SectionChildrenFragment } from '../../graphql/queries/allQueries';
import { GET_USER_COURSE } from '../../graphql/queries/users';
import { userContentEdgeDefaults } from '../users/userContentEdgeDefaults';
import useGetCurrentUser from '../users/useGetCurrentUser';
import { contentItemDefaults } from '../contentItems/contentItemDefaults';

function useCreateQuiz(sectionId) {

  const { user } = useGetCurrentUser()

  const [createQuizMutation, createQuizResponse] = useMutation(
    CREATE_QUIZ,
    {
      update(cache, { data: { createQuiz } } ) {

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
            createQuiz.quiz
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
              attempts: [],
              userId: user.id,            
              node: {
                ...userContentEdgeDefaults.node,
                ...createQuiz.quiz
              }
            }

            const newData = {
              ...data,
              quizzes: {
                ...data.quizzes,
                edges: [
                  ...data.quizzes.edges,
                  newEdge
                ],
                totalCount: data.quizzes.totalCount + 1
              },
            }
            
            return newData;
          });
        }

      },
    }
  );

  const createQuiz = async (values) => {

    const newQuiz = await createQuizMutation({
      variables: {
        ...values,
        settings: {
          passMark: 80,
          ...values.settings,
        },
        parentIds: [sectionId]
      },
      optimisticResponse: {
        createQuiz: {
          __typename: 'CreateQuizPayload',
          quiz: {
            ...contentItemDefaults,
            id: 'temp-' + Math.floor(Math.random() * 10000),
            itemType: 'quiz',
            questions: [],
            _isOptimistic: true,
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