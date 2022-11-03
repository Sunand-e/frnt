import { UPDATE_CAPABILITY } from "../../graphql/mutations/role/UPDATE_CAPABILITY"
import { GET_CAPABILITIES, GET_CAPABILITY } from "../../graphql/queries/capabilities"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"

function useUpdateCapability(id = null) {

  const [updateCapabilityMutation, updateCapabilityResponse] = useMutation(
    UPDATE_CAPABILITY
  );

  const updateCapability = (values) => {
  // const updateCapability = ({name=null, contentBlocks=null}) => {

    const variables = {
      ...values
    }

    updateCapabilityMutation({
      variables: {
        id,
        ...variables
      },
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
    
  }

  return {
    updateCapability
  }
}

export default useUpdateCapability