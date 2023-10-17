import { gql, useMutation } from "@apollo/client";
import { DuplicateLesson, DuplicateLessonVariables } from "../../graphql/mutations/course/__generated__/DuplicateLesson";
import { GET_CURRENT_USER, GET_USER_COURSE } from "../../graphql/queries/users";
import { ContentFragment, GET_COURSES, SectionChildrenFragment } from "../../graphql/queries/allQueries";
import cache from "../../graphql/cache"
import { userContentEdgeDefaults } from "../users/userContentEdgeDefaults";
import { DUPLICATE_LESSON } from "../../graphql/mutations/lesson/DUPLICATE_LESSON";
import { SectionChildrenFragmentFragment } from "../../graphql/generated";
import useGetCurrentUser from "../users/useGetCurrentUser";
import { useEditorViewStore } from "../../components/common/ContentEditor/useEditorViewStore";

function useDuplicateLesson() {

  const { user } = useGetCurrentUser()

  const [duplicateLessonMutation, duplicateLessonResponse] = useMutation<DuplicateLesson, DuplicateLessonVariables>(DUPLICATE_LESSON)

  const duplicateLesson = (id, parentId) => {
    
    useEditorViewStore.setState({activeSidebarPanel: 'structure'})

    const lesson = cache.readFragment({
      id: `ContentItem:${id}`,
      fragment: ContentFragment,
      fragmentName: 'ContentFragment',
    });
    const parentData = cache.readFragment({
      id: `ContentItem:${id}`,
      fragment: gql`
        fragment ParentFragment on ContentItem {
          parents {
            id
            parents {
              id
            }
          }
        }
      `,
      
    });
    duplicateLessonMutation({
      variables: { 
        id,
        parentId: parentId
      },
      optimisticResponse: {
        duplicateLesson: {
          __typename: 'DuplicateContentItemPayload',
          contentItem: {
            ...lesson,
            id: `clone-${id}`,
            ...parentData,
            ...(lesson.title && {
              title: lesson.title + ' - Copy',
            }),
            _isOptimistic: true
          }
        },
      },

      update(cache, { data: { duplicateLesson } } ) {
        
        cache.updateFragment<SectionChildrenFragmentFragment>({
          id:`ContentItem:${parentId}`,
          fragment: SectionChildrenFragment
        }, (data) => {
          return ({
            children: [
              // ...data.children.filter(child => child._deleted === false),
              ...data.children,
              {
                ...duplicateLesson.contentItem,
              }
            ],
          })
        })

        cache.updateQuery({
          query: GET_USER_COURSE,
          variables: {
            courseFilter: {
              courseId: parentData.parents[0].parents[0].id
            },
            lessonSectionFilter: {
              courseId: parentData.parents[0].parents[0].id
            }
          }
        }, (data) => {
          const newEdge = {
            ...userContentEdgeDefaults,
            userId: user.id,            
            node: {
              ...lesson,
              ...parentData,
              ...duplicateLesson.lesson,
              groupsEnrolled: {
                edges: []
              },
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
    })
  }
      
  return {
    duplicateLesson,
  }
}

export default useDuplicateLesson