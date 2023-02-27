import { useRef, useEffect } from "react";
import { UpdateResource, UpdateResourceVariables } from "../../graphql/mutations/resource/__generated__/UpdateResource";
import { UPDATE_RESOURCE } from "../../graphql/mutations/resource/UPDATE_RESOURCE"
import { ResourceFragment, GET_RESOURCE } from "../../graphql/queries/allQueries"
import { ResourceFragment as ResourceFragmentType } from '../../graphql/queries/__generated__/ResourceFragment';
import { useMutation, useQuery } from "@apollo/client"
import cache from "../../graphql/cache"


function useUpdateResource(id=null) {

  const { loading, error, data: {resource: resource} = {} } = useQuery(
    GET_RESOURCE,
    {
      variables: {
        id
      },
      skip: !id
    }
  );

  const [updateResourceMutation, updateResourceResponse] = useMutation<UpdateResource, UpdateResourceVariables>(
    UPDATE_RESOURCE
  );

  const updateResource = (values, cb = null) => {
    updateResourceMutation({
      variables: {
        id,
        ...values
      },
      optimisticResponse: {
        updateResource: {
          __typename: 'UpdateResourcePayload',
          resource: {
            ...resource,
            ...values,
            id,
            tags: {
              edges: []
            }
          },
        }
      },
      onCompleted: cb

    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }
  
  return {
    resource,
    loading,
    error,
    updateResource
  }
}

export default useUpdateResource