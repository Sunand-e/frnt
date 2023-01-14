import { useCallback, useContext } from "react";
import useCreateTag from "../../hooks/tags/useCreateTag";
import TagForm from "./TagForm";
import { useRouter } from "../../utils/router";
import { closeModal } from "../../stores/modalStore";

const AddTagModal = ({type}) => {

  const router = useRouter()
  const { createTag } = useCreateTag() 

  
  const handleSubmit = useCallback(values => {
    createTag(values)
    router.push('/admin/tags')
    closeModal()
  },[])
  return (
    <>
      <TagForm isModal={true} onSubmit={handleSubmit} />
    </>
  );
}

export default AddTagModal