import { useMutation } from "@apollo/client";
import { REORDER_TAGS } from "../../graphql/mutations/tag/REORDER_TAGS";
import { GET_TAGS } from "../../graphql/queries/tags";
import useGetTags from "./useGetTags";

function useReorderTags() {

  const { tags, loading, error } = useGetTags()

  const [reorderTagsMutation, reorderTagsMutationResponse] = useMutation(
    REORDER_TAGS,
    {
      update(cache, { data: { reorderTags } }) {
        const newData = {
          tags: tags.map(tag => {
            if (tag.id === reorderTags.tag.id) {
              return {
                ...tag,
                order: reorderTags.tag.order
              };
            } else if (tag.order >= reorderTags.tag.order) {
              return {
                ...tag,
                order: tag.order + 1
              };
            } else {
              return tag;
            }
          })
        };
        cache.updateQuery({ query: GET_TAGS, optimistic: true }, (data) => ({
          ...data,
          ...newData
        }));
      }
    }
  );

  const reorderTags = (id, newOrder) => {
    reorderTagsMutation({
      variables: {
        id,
        order: newOrder
      },
      optimisticResponse: {
        reorderTags: {
          __typename: "ReorderTagsPayload",
          tag: {
            id,
            order: newOrder
          }
        }
      }
    });
  };

  return {
    reorderTags,
    reorderTagsMutationResponse
  };
}

export default useReorderTags;