import { useMutation } from "@apollo/client"
import { UpdateUserContentStatus, UpdateUserContentStatusVariables } from "../../graphql/mutations/user/__generated__/UpdateUserContentStatus";
import { UPDATE_USER_CONTENT_STATUS } from "../../graphql/mutations/user/UPDATE_USER_CONTENT_STATUS";
import { useEffect } from "react";

function useUpdateUserContentStatus() {

    const [updateUserContentStatusMutation, updateUserContentStatusResponse] = useMutation<UpdateUserContentStatus, UpdateUserContentStatusVariables>(
      UPDATE_USER_CONTENT_STATUS,
      {}
    );
  
    const updateUserContentStatus = (values) => {
      updateUserContentStatusMutation({
        variables: {
          ...values
        },
      }).then(res => {
        console.log('resresresresresresresresresresresresresres')
        console.log(res)        
      }).catch(res => {
        // TODO: do something if there is an error!!
      })
    }
  
  
  
    useEffect(() => {
    }, [updateUserContentStatusResponse])
  
    return {
      updateUserContentStatus
    }
  }
  
  export default useUpdateUserContentStatus