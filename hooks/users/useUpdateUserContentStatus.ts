import { useCallback } from 'react'
import { useMutation } from "@apollo/client"

import { UpdateUserContentStatus, UpdateUserContentStatusVariables } from "../../graphql/mutations/user/__generated__/UpdateUserContentStatus";
import { UPDATE_USER_CONTENT_STATUS, UserContentStatusFragment } from "../../graphql/mutations/user/UPDATE_USER_CONTENT_STATUS";
import useGetCurrentUser from "../../hooks/users/useGetCurrentUser"
import cache from '../../graphql/cache';
import { userContentEdgeDefaults } from './userContentEdgeDefaults';

function useUpdateUserContentStatus() {

  const [updateUserContentStatusMutation, updateUserContentStatusResponse] = useMutation<UpdateUserContentStatus, UpdateUserContentStatusVariables>(
    UPDATE_USER_CONTENT_STATUS
  );

  const { user } = useGetCurrentUser()

  const updateUserContentStatus = useCallback((values) => {
    if(values.contentItemId && user) {

      const cachedContentStatus = cache.readFragment({
        fragment: UserContentStatusFragment,
        fragmentName: 'UserContentStatusFragment',
        id: `UserContentEdge:${user.id}:${values.contentItemId}`
      },true);

      updateUserContentStatusMutation({
        variables: {
          ...values
        },

        optimisticResponse: {
          updateUserContentStatus:{
            userContents:{
              edges:[{
                ...userContentEdgeDefaults,
                userId: user?.id,
                node:{
                  ...userContentEdgeDefaults.node,
                  id: values.contentItemId,
                  __typename:"ContentItem"
                },
                ...(cachedContentStatus),
                ...values,
                __typename:"UserContentEdge"
              }],
              __typename:"UserContentConnection"
            },
            __typename:"UserContentStatusUpdatePayload"
          }
        }
      }).then(res => {
        // console.log('response')
        // console.log(res)
      }).catch(res => {
        // TODO: do something if there is an error!!
      })
    }
  },[user])

  return {
    updateUserContentStatus
  }
}

export default useUpdateUserContentStatus