import { useMutation } from "@apollo/client"
import { AddTagsToContent, AddTagsToContentVariables } from "../../graphql/mutations/contentItem/__generated__/AddTagsToContent";
import { ADD_TAGS_TO_CONTENT } from "../../graphql/mutations/contentItem/ADD_TAGS_TO_CONTENT";

function useAddTagsToContent() {

  const [addTagsToContentMutation, addTagsToContentResponse] = useMutation<AddTagsToContent, AddTagsToContentVariables>(
    ADD_TAGS_TO_CONTENT
  );


  const addTagsToContent = (values, cb = null) => {
    // const updateUser = ({name=null, contentBlocks=null}) => {
    addTagsToContentMutation({
      variables: {
        ...values
      },
      onCompleted: cb
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    addTagsToContent,
  }
}

export default useAddTagsToContent