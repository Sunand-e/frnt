import { useCallback, useContext } from "react";
import Button from "../../Button";
import { ModalContext } from "../../../context/modalContext";
import useCreateTag from "../../../hooks/tags/useCreateTag";
import TagForm from "./TagForm";
import { useRouter } from "../../../utils/router";

const AddTagModal = ({type}) => {

  const router = useRouter()
  const { closeModal } = useContext(ModalContext);
  const { createTag } = useCreateTag() 

  
  const handleSubmit = useCallback(values => {
    createTag(values)
    router.push('/admin/tags')
    closeModal()
  },[])
  return (
    <>
      <TagForm onSubmit={handleSubmit} />
    </>
  );
}

export default AddTagModal