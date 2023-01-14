import { useCallback } from "react";
import useCreateRole from "../../hooks/roles/useCreateRole";
import RoleForm from "./RoleForm";
import { useRouter } from "../../utils/router";
import { closeModal } from "../../stores/modalStore";

const AddRoleModal = ({type}) => {

  const router = useRouter()
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