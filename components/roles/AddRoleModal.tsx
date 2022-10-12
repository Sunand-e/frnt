import { useCallback, useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import useCreateRole from "../../hooks/roles/useCreateRole";
import RoleForm from "./RoleForm";
import { useRouter } from "../../utils/router";

const AddRoleModal = ({type}) => {

  const router = useRouter()
  const { closeModal } = useContext(ModalContext);
  const { createRole } = useCreateRole() 

  
  const handleSubmit = useCallback(values => {
    createRole(values)
    router.push('/admin/users/roles')
    closeModal()
  },[])
  return (
    <>
      <RoleForm onSubmit={handleSubmit} />
    </>
  );
}

export default AddRoleModal