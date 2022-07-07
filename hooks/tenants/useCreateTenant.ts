import { useMutation } from "@apollo/client"
import { GetTenants } from "../../graphql/queries/__generated__/GetTenants";
import { CreateTenant, CreateTenantVariables } from "../../graphql/mutations/tenant/__generated__/CreateTenant";
import { useEffect, useState } from "react";
import { CREATE_TENANT } from "../../graphql/mutations/tenant/CREATE_TENANT";
import { GET_TENANTS } from "../../graphql/queries/tenants";


function useCreateTenant() {

  const [createTenantMutation, createTenantResponse] = useMutation<CreateTenant, CreateTenantVariables>(
    CREATE_TENANT,
    {
      // refetchQueries: [GET_TENANTS],
      update(cache, { data: { createTenant } } ) {
        const data = cache.readQuery<GetTenants>({
          query: GET_TENANTS
        })
        cache.writeQuery({
          query: GET_TENANTS,
          data: {
            tenants: [createTenant.tenant, ...data.tenants]
          }
        })
      }
    }
  );

  const createTenant = (values, cb = null) => {
    createTenantMutation({
      variables: { 
        ...values
      },
      optimisticResponse: {
        createTenant: {
          __typename: 'CreateTenantPayload',
          tenant: {
            __typename: 'Tenant',
            id: `tmp-${Math.floor(Math.random() * 10000)}`,
            _deleted: false,
            createdAt: 0,
            updatedAt: 0,
            shortName: '',
            ...values
          },
        }
      },
      // onCompleted: cb
      // refetchQueries: [{ query: GET_TENANT }]
    }).catch(res => {
      // : do something if there is an error!!
    })
  }

  return {
    createTenant
  }
}

export default useCreateTenant
