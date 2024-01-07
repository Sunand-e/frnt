import { UpdateRole, UpdateRoleVariables } from "../../graphql/mutations/role/__generated__/UpdateRole";
import { UPDATE_ROLE } from "../../graphql/mutations/role/UPDATE_ROLE"
import { GET_ROLE } from "../../graphql/queries/roles"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"

function useUpdateRole(id = null) {

    const { loading, error, data: {role} = {} } = useQuery(
    GET_ROLE,
    {
      variables: {
        id
      }
    }
  );

  const [updateRoleMutation, updateRoleResponse] = useMutation<UpdateRole, UpdateRoleVariables>(
    UPDATE_ROLE
  );

  const updateRole = (values) => {
  // const updateRole = ({name=null, contentBlocks=null}) => {
    const variables = {
      ...values
    }

    updateRoleMutation({
      variables: {
        id,
        ...variables
      },
      optimisticResponse: {
        updateRole: {
          __typename: 'UpdateRolePayload',
          role: {
            ...role,
            ...variables
          },
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    role,
    loading,
    error,
    updateRole
  }
}

export default useUpdateRole