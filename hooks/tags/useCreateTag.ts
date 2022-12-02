import { useMutation } from "@apollo/client"
import { GetTags } from "../../graphql/queries/__generated__/GetTags";
import { CreateTag, CreateTagVariables } from "../../graphql/mutations/tag/__generated__/CreateTag";
import { useEffect, useState } from "react";
import { CREATE_TAG } from "../../graphql/mutations/tag/CREATE_TAG";
import { GET_TAGS } from "../../graphql/queries/tags";


function useCreateTag() {

  const [createTagMutation, createTagResponse] = useMutation<CreateTag, CreateTagVariables>(
    CREATE_TAG,
    {
      // refetchQueries: [GET_TAGS],
      update(cache, { data: { createTag } } ) {
        const cachedData = cache.readQuery<GetTags>({
          query: GET_TAGS
        })

        cache.writeQuery({
          query: GET_TAGS,
          data: {
            ...cachedData,
            tags: [
              createTag.tag,
              ...cachedData.tags
            ]
          }
        })
      }
    }
  );

  const createTag = (values, cb = null) => {
    createTagMutation({
      variables: { 
        ...values
      },
      optimisticResponse: {
        createTag: {
          __typename: 'CreateTagPayload',
          tag: {
            __typename: 'Tag',
            id: `tmp-${Math.floor(Math.random() * 10000)}`,
            image: null,
            ...values
          },
        }
      },
      onCompleted: cb
      // refetchQueries: [{ query: GET_TAG }]
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    // tag: createTagResponse?.data?.createTag?.tag,
    createTag
  }
}

export default useCreateTag