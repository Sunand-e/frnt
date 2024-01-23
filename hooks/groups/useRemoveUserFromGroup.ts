import { useMutation, useQuery } from "@apollo/client"
import { RemoveUserFromGroup, RemoveUserFromGroupVariables } from "../../graphql/mutations/group/__generated__/RemoveUserFromGroup";
import { REMOVE_USER_FROM_GROUP } from "../../graphql/mutations/group/REMOVE_USER_FROM_GROUP";

function useRemoveUserFromGroup() {

  const [removeUserFromGroupMutation, removeUserFromGroupResponse] = useMutation<RemoveUserFromGroup, RemoveUserFromGroupVariables>(
    REMOVE_USER_FROM_GROUP
  );


  const removeUserFromGroup = (values, cb = null) => {
    // const updateUser = ({name=null, contentBlocks=null}) => {
  
      removeUserFromGroupMutation({
        variables: {
          ...values
        },
        refetchQueries: ['GetUser'],
        onCompleted: cb
      }).catch(res => {
        // TODO: do something if there is an error!!
      })
    }
  
    return {
      groups: removeUserFromGroupResponse?.data?.removeUserFromGroup?.groups,
      removeUserFromGroup,
    }
}

export default useRemoveUserFromGroup