import { CREATE_RESOURCE } from "../../graphql/mutations/resource/CREATE_RESOURCE"
import { GET_RESOURCES } from "../../graphql/queries/allQueries"
import { useMutation } from "@apollo/client"
import { GetResources } from "../../graphql/queries/__generated__/GetResources";
import { CreateResource, CreateResourceVariables } from "../../graphql/mutations/resource/__generated__/CreateResource";
import { useEffect, useState } from "react";


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
    console.log('values')
    console.log(values)
    createResourceMutation({
      variables: { 
        ...values
      },
      optimisticResponse: {
        createResource: {
          __typename: 'CreateResourcePayload',
          resource: {
            __typename: 'ContentItem',
            id: `tmp-${Math.floor(Math.random() * 10000)}`,
            title: values.title || '',
            settings: {},
            createdAt: '',
            updatedAt: '',
            content: {},
            shared: false,
            contentType: null,
            itemType: 'resource',
            mediaItem: null,
            icon: null,
            prerequisites: null,
            _deleted: false,
            users: { totalCount: 0 },
            audio: null,
            document: null,
            ...values,
            tags: {
              edges: []
            },
            image: null,
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