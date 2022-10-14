import { useMutation } from "@apollo/client"
import { UpdateUserContentStatus, UpdateUserContentStatusVariables } from "../../graphql/mutations/user/__generated__/UpdateUserContentStatus";
import { UPDATE_USER_CONTENT_STATUS } from "../../graphql/mutations/user/UPDATE_USER_CONTENT_STATUS";
import { GET_CURRENT_USER, GET_USER_CONTENT } from "../../graphql/queries/users";
import { GetUserContent } from "../../graphql/queries/__generated__/GetUserContent";
import { GetCurrentUser } from "../../graphql/queries/__generated__/GetCurrentUser";

function useUpdateUserCourseStatus() {

  const [updateUserContentStatusMutation, updateUserContentStatusResponse] = useMutation<UpdateUserContentStatus, UpdateUserContentStatusVariables>(
    UPDATE_USER_CONTENT_STATUS
  );

  const updateUserCourseStatus = (values, courseId=null) => {
    courseId
    updateUserContentStatusMutation({
      variables: {
        ...values
      },
      update: (cache, { data: { updateUserContentStatus } }) => {
        console.log('attempt to update the cache:')
        if(courseId) {
          console.log('attempt to update the cache with a course ID: ', courseId)
          try {
            const getIdsAndEdges = (itemType) => (
              updateUserContentStatus.userContents.filter(userContent => (
                userContent.contentItem.itemType === itemType
              )).map(({contentItem, user, __typename, ...edgeData}) => ({
                id: contentItem.id,
                edgeData
              }))
            )
            const userCourseEdges = getIdsAndEdges('course')
            const userSectionEdges = getIdsAndEdges('section')
            const userLessonEdges = getIdsAndEdges('lesson')
            
            cache.updateQuery<GetUserContent>({ query: GET_USER_CONTENT, variables: {
              courseFilter: {
                id: courseId
              },
              resourceFilter: {
                id: courseId
              },
              lessonSectionFilter: {
                courseId
              }
            }}, (data) => {
              console.log('datadatadatadatadata')
              console.log(data)
              return {
                user: {
                  ...data?.user,
                  courses: {
                    ...data?.user.courses,
                    edges: data?.user.courses.edges.map(edge => {
                      const newEdgeData = userCourseEdges.find(({id}) => (
                        edge.node.id === id
                      ))?.edgeData
                      return {
                        ...edge,
                        ...newEdgeData
                      }
                    }) || []
                  },
                  sections: {
                    ...data?.user.sections,
                    edges: data?.user.sections.edges.map(edge => {
                      const newEdgeData = userSectionEdges.find(({id}) => (
                        edge.node.id === id
                      ))?.edgeData
                      return {
                        ...edge,
                        ...newEdgeData
                      }
                    }) || []
                  },
                  lessons: {
                    ...data?.user.lessons,
                    edges: data?.user.lessons.edges.map(edge => {
                      const newEdgeData = userLessonEdges.find(({id}) => (
                        edge.node.id === id
                      ))?.edgeData
                      return {
                        ...edge,
                        ...newEdgeData
                      }
                    }) || []
                  },
                }
              }
            })

            cache.updateQuery<GetCurrentUser>(
              { query: GET_CURRENT_USER },
              (data) => {
                
                console.log('ddddddata')
                console.log(data)
              return ({
                user: {
                  ...data?.user,
                  courses: {
                    ...data?.user.courses,
                    edges: data?.user.courses.edges.map(edge => {
                      const newEdgeData = userCourseEdges.find(({id}) => (
                        edge.node.id === id
                      ))?.edgeData
                      return {
                        ...edge,
                        ...newEdgeData
                      }
                    }) || []
                  }
                }
              })
            })
          } catch(error) {
            console.log('ERROR!')
            console.log(error)
          }
        }
      }
    }).then(res => {
      console.log('resresresresresresresresresresresresresres')
      console.log(res)
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    updateUserCourseStatus
  }
}

export default useUpdateUserCourseStatus