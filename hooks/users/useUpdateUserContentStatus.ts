import { useCallback } from 'react'
import { useMutation } from "@apollo/client"

import { UpdateUserContentStatus, UpdateUserContentStatusVariables } from "../../graphql/mutations/user/__generated__/UpdateUserContentStatus";
import { UPDATE_USER_CONTENT_STATUS } from "../../graphql/mutations/user/UPDATE_USER_CONTENT_STATUS";
import useGetCurrentUser from "../../hooks/users/useGetCurrentUser"

function useUpdateUserContentStatus() {

  const [updateUserContentStatusMutation, updateUserContentStatusResponse] = useMutation<UpdateUserContentStatus, UpdateUserContentStatusVariables>(
    UPDATE_USER_CONTENT_STATUS
  );

  const { user } = useGetCurrentUser()

  const updateUserContentStatus = useCallback((values, courseId=null) => {
    
    updateUserContentStatusMutation({
      variables: {
        ...values
      },

      optimisticResponse: {
        updateUserContentStatus:{
          userContents:{
            edges:[{
              userId: user.id,
              status: "in_progress",
              score: 71,
              updatedAt: "2022-10-18T21:38:36Z",
              firstVisited: "2022-10-18T21:38:36Z",
              lastVisited: "2022-10-18T21:38:36Z",
              completed:null,
              properties:{},
              node:{
                id: values.contentItemId,
                itemType:"section",
                __typename:"ContentItem"
              },
              ...values,              
              __typename:"UserContentEdge"
            }],
            __typename:"UserContentConnection"
          },
          __typename:"UserContentStatusUpdatePayload"
        }
      }
    }).then(res => {
      console.log('response')
      console.log(res)
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  },[user])

  return {
    updateUserContentStatus
  }
}

export default useUpdateUserContentStatus