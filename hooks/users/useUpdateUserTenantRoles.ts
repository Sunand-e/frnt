import { useMutation } from "@apollo/client"
import { ASSIGN_CAPABILITY_TO_ROLE } from "../../graphql/mutations/role/ASSIGN_CAPABILITY_TO_ROLE";
import { UPDATE_USER_TENANT_ROLES } from "../../graphql/mutations/user/UPDATE_USER_TENANT_ROLES";
import { UpdateUserTenantRoles, UpdateUserTenantRolesVariables } from "../../graphql/mutations/user/__generated__/UpdateUserTenantRoles";


function useUpdateUserTenantRoles() {

  const [updateUserTenantRolesMutation, updateUserTenantRolesResponse] = useMutation<UpdateUserTenantRoles, UpdateUserTenantRolesVariables>(
    UPDATE_USER_TENANT_ROLES
  );

  const updateUserTenantRoles = (values, cb = null) => {
    updateUserTenantRolesMutation({
      variables: { 
        ...values
      },
      onCompleted: cb
      // refetchQueries: [{ query: GET_ROLE }]
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    updateUserTenantRoles,
    user: updateUserTenantRolesResponse?.data?.updateUserTenantRoles.user
  }
}

export default useUpdateUserTenantRoles