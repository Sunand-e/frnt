import { useMutation } from "@apollo/client"
import { UpdateUserContentStatus, UpdateUserContentStatusVariables } from "../../graphql/mutations/user/__generated__/UpdateUserContentStatus";
import { UPDATE_USER_CONTENT_STATUS } from "../../graphql/mutations/user/UPDATE_USER_CONTENT_STATUS";
import { GET_CURRENT_USER, GET_USER_CONTENT } from "../../graphql/queries/users";
import { GetUserContent } from "../../graphql/queries/__generated__/GetUserContent";
import { GetCurrentUser } from "../../graphql/queries/__generated__/GetCurrentUser";


const getIdsAndEdges = (updatedUserContents, itemType) => (
  updatedUserContents.filter(userContent => (
    userContent.contentItem.itemType === itemType
  )).map(({contentItem, user, __typename, ...edgeData}) => ({
    id: contentItem.id,
    edgeData
  }))
)

function useUpdateUserContentStatus() {

  const [updateUserContentStatusMutation, updateUserContentStatusResponse] = useMutation<UpdateUserContentStatus, UpdateUserContentStatusVariables>(
    UPDATE_USER_CONTENT_STATUS
  );

  const updateUserContentStatus = (values, courseId=null) => {
    updateUserContentStatusMutation({
      variables: {
        ...values
      },
      update: (cache, { data: { updateUserContentStatus } }) => {
        if(courseId) {
          const mergeConnectionWithCache = (connection, itemType) => {
            return {
              ...connection,
              edges: connection.edges.map(edge => {
                const newEdgeData = getIdsAndEdges(updateUserContentStatus.userContents, itemType)
                  .find(({id}) => (
                    edge.node.id === id
                  ))?.edgeData;
                return {
                  ...edge,
                  ...newEdgeData
                }
              }) || []
            }
          }
          try {
            cache.updateQuery<GetUserContent>({ query: GET_USER_CONTENT, variables: {
              courseFilter: {
                id: courseId
              },
              lessonSectionFilter: {
                courseId
              }
            }}, (data) => {
              return {
                user: {
                  ...data?.user,
                  courses: mergeConnectionWithCache(data?.user?.courses, 'course'),
                  sections: mergeConnectionWithCache(data?.user?.sections, 'section'),
                  lessons: mergeConnectionWithCache(data?.user?.lessons, 'lesson')
                }
              }
            })          
          } catch(error) {
            console.log('ERROR!')
            console.log(error)
          }
          
          try {
            cache.updateQuery<GetCurrentUser>(
              { query: GET_CURRENT_USER },
              (data) => {
              return ({
                user: {
                  ...data?.user,
                  courses: mergeConnectionWithCache(data?.user?.courses, 'course'),
                }
              })
            })
          } catch(error) {
            console.log('ERROR!!')
            console.log(error)
          }
        }
      }
    }).then(res => {
      console.log('response')
      console.log(res)
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    updateUserContentStatus
  }
}

export default useUpdateUserContentStatus