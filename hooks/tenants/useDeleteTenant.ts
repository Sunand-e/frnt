import { useMutation } from "@apollo/client";
import { DELETE_TENANT } from "../../graphql/mutations/tenant/DELETE_TENANT";
import { DeleteTenant, DeleteTenantVariables } from "../../graphql/mutations/tenant/__generated__/DeleteTenant";
import { GET_TENANTS, TenantFragment } from "../../graphql/queries/tenants";

function useDeleteTenant() {

  const [deleteTenantMutation, deleteTenantResponse] = useMutation<DeleteTenant, DeleteTenantVariables>(
    DELETE_TENANT,
    {
      refetchQueries: [GET_TENANTS]
    }
  )

  const deleteTenant = (id) => {
    deleteTenantMutation({
      variables: { 
        id
      },
      optimisticResponse: {
        deleteTenant: {
          __typename: 'DeleteTenantPayload',
          tenant: {
            __typename: 'Tenant',
            id,
            _deleted: true,
          },
          message: ''
        },
      },
    })
  }

      
  return {
    deleteTenant,
  }
}

export default useDeleteTenant
