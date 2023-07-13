import { CREATE_RESOURCE } from "../../graphql/mutations/resource/CREATE_RESOURCE"
import { GET_RESOURCES } from "../../graphql/queries/allQueries"
import { useMutation } from "@apollo/client"
import { GetResources } from "../../graphql/queries/__generated__/GetResources";
import { CreateResource, CreateResourceVariables } from "../../graphql/mutations/resource/__generated__/CreateResource";
import { useEffect, useState } from "react";
import { contentItemDefaults } from "../contentItems/contentItemDefaults";


function useCreateResource() {

  const [createResourceMutation, createResourceResponse] = useMutation<CreateResource, CreateResourceVariables>(
    CREATE_RESOURCE,
    {
      // the update function updates the list of resources returned from the cached query.
      // This runs twice - once after the optimistic response, and again after the server response.
      update(cache, { data: { createResource } } ) {
        const cachedData = cache.readQuery<GetResources>({
          query: GET_RESOURCES
        })
        cache.writeQuery({
          query: GET_RESOURCES,
          data: {
            ...cachedData,
            resources: {
              ...cachedData.resources,
              edges: [{node: createResource.resource}, ...cachedData.resources.edges]
            }            
          }
        })
      },
    }
  );

  const [resource, setResource] = useState(null)
  useEffect(() => {
    if(createResourceResponse.data) {
      setResource(createResourceResponse.data.createResource.resource)
    }
  }, [createResourceResponse.data])

  const createResource = (values, cb = null) => {

    createResourceMutation({
      variables: { 
        ...values
      },
      optimisticResponse: {
        createResource: {
          __typename: 'CreateResourcePayload',
          resource: {
            ...contentItemDefaults,
            id: `tmp-${Math.floor(Math.random() * 10000)}`,
            ...values,
            itemType: 'resource',
            tags: contentItemDefaults.tags,
            title: values.title || ''
          },
          message: ''
        }
      },
      onCompleted: cb
      // refetchQueries: [{ query: GET_RESOURCE }]
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    resource: resource,
    createResource: createResource
  }
}

export default useCreateResource