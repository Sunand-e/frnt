import { useRef, useEffect } from "react";
import { UpdateGroup, UpdateGroupVariables } from "../../graphql/mutations/group/__generated__/UpdateGroup";
import { UPDATE_GROUP } from "../../graphql/mutations/group/UPDATE_GROUP"
import { ContentFragment, GET_GROUP } from "../../graphql/queries/allQueries"
import { ContentFragment as ContentFragmentType } from '../../graphql/queries/__generated__/ContentFragment';
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import cache, { currentContentItemVar } from "../../graphql/cache"

function useUpdateGroup(id = null) {

    const { loading, error, data: {group} = {} } = useQuery(
    GET_GROUP,
    {
      variables: {
        id
      }
    }
  );

  const [updateGroupMutation, updateGroupResponse] = useMutation<UpdateGroup, UpdateGroupVariables>(
    UPDATE_GROUP
  );

  const updateGroup = (values) => {
  // const updateGroup = ({name=null, contentBlocks=null}) => {

    const variables = {
      ...values
    }

    updateGroupMutation({
      variables: {
        id,
        ...variables
      },
      optimisticResponse: {
        updateGroup: {
          __typename: 'UpdateGroupPayload',
          group: {
            ...group,
            ...variables
          },
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    group,
    loading,
    error,
    updateGroup
  }
}

export default useUpdateGroup