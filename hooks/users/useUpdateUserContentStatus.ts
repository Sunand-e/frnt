import { useMutation } from "@apollo/client"
import { UpdateUserContentStatus, UpdateUserContentStatusVariables } from "../../graphql/mutations/user/__generated__/UpdateUserContentStatus";
import { UPDATE_USER_CONTENT_STATUS } from "../../graphql/mutations/user/UPDATE_USER_CONTENT_STATUS";
import { GET_CURRENT_USER, GET_USER_CONTENT } from "../../graphql/queries/users";
import { GetUserContent } from "../../graphql/queries/__generated__/GetUserContent";
import { GetCurrentUser } from "../../graphql/queries/__generated__/GetCurrentUser";


const getIdsAndEdges = (updatedUserContents, itemType) => {
  console.log('updatedUserContents')
  console.log(updatedUserContents)

  return (
  updatedUserContents.edges.filter(userContentEdge => (
    userContentEdge.node.itemType === itemType
  )).map(({node, user, __typename, ...edgeData}) => ({
    id: node.id,
    edgeData
  }))
)
}
function useUpdateUserContentStatus() {

  const [updateUserContentStatusMutation, updateUserContentStatusResponse] = useMutation<UpdateUserContentStatus, UpdateUserContentStatusVariables>(
    UPDATE_USER_CONTENT_STATUS, {
      optimisticResponse: { 
        updateUserContentStatus:{
          userContents:{
            edges:[{
              status: "in_progress",
              score: 71,
              updatedAt: "2022-10-18T21:38:36Z",
              completed:null,
              properties:{},
              lastVisited:"2022-10-18T21:38:37Z",
              firstVisited:"2022-10-17T22:41:54Z",
              node:{
                id:"75c84682-2638-4e26-816e-bdf8a341f43e",
                itemType:"section",
                __typename:"ContentItem"
              },
              __typename:"UserContentEdge"
            }],
            __typename:"UserContentConnection"
          },
          __typename:"UserContentStatusUpdatePayload"
        }
      }
    }
  );

  const updateUserContentStatus = (values, courseId=null) => {
    updateUserContentStatusMutation({
      variables: {
        ...values
      },
      update: (cache, { data: { updateUserContentStatus } }) => {
        if(courseId) {
          const mergeConnectionWithCache = (connection, itemType) => {
            console.log('connection')
            console.log(connection)
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
                },
                courses: mergeConnectionWithCache(data?.courses, 'course'),
                sections: mergeConnectionWithCache(data?.sections, 'section'),
                lessons: mergeConnectionWithCache(data?.lessons, 'lesson')
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
                },
                courses: mergeConnectionWithCache(data?.courses, 'course'),
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