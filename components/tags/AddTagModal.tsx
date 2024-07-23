import { useCallback, useContext } from "react";
import useCreateTag from "../../hooks/tags/useCreateTag";
import TagForm from "./TagForm";
import { useRouter } from "../../utils/router";
import { closeModal } from "../../stores/modalStore";
import { tagTypes } from "../common/tagTypes";

const AddTagModal = ({type}) => {

  const tagType = tagTypes[type]
  const router = useRouter()
  const { createTag } = useCreateTag() 

  
  const handleSubmit = useCallback(values => {
    createTag(values)
    router.push(tagType.indexUrl)
    closeModal()
  },[])
  return (
    <>
      <TagForm typeName={tagType.name} isModal={true} onSubmit={handleSubmit} />
    </>
  );
}

export default AddTagModal