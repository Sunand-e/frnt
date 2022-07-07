import { UpdateTenant, UpdateTenantVariables } from "../../graphql/mutations/tenant/__generated__/UpdateTenant";
import { UPDATE_TENANT } from "../../graphql/mutations/tenant/UPDATE_TENANT"
import { GET_TENANT } from "../../graphql/queries/tenants"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"

function useUpdateTenant(id = null) {

    const { loading, error, data: {tenant} = {} } = useQuery(
        GET_TENANT,
        {
            variables: {
                id
            }
        }
    );

    const [updateTenantMutation, updateTenantResponse] = useMutation<UpdateTenant, UpdateTenantVariables>(
        UPDATE_TENANT
    );

    const updateTenant = (values, cb = null) => {
        // const updateTenant = ({name=null, contentBlocks=null}) => {

        const variables = {
            ...values
        }

        updateTenantMutation({
            variables: {
                id,
                ...variables
            },
            optimisticResponse: {
                updateTenant: {
                    __typename: 'UpdateTenantPayload',
                    tenant: {
                        ...tenant,
                        ...variables
                    },
                }
            },
            onCompleted: cb
        }).catch(res => {
            // : do something if there is an error!!
        })
    }

    return {
        tenant,
        loading,
        error,
        updateTenant
    }
}

export default useUpdateTenant
