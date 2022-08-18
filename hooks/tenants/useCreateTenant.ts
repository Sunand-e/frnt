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
      update(cache, { data: { createTenant } } ) {
        const cachedData = cache.readQuery<GetTenants>({
          query: GET_TENANTS
        })
        cache.writeQuery({
          query: GET_TENANTS,
          data: {
            ...cachedData,
            tenants: {
              ...cachedData.tenants,
              edges: [{node: createTenant.tenant}, ...cachedData.tenants.edges]
            }            
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
            settings: {},
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
