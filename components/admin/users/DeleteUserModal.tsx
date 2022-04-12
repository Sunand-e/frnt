import { useField } from "formik"
import { useContext } from 'react';
import { ModalContext } from "../../../context/modalContext";
import useDeleteUser from "../../../hooks/users/useDeleteUser";
import Button from '../../Button';

const DeleteUserModal = ({userId}) => {

  const { deleteUser } = useDeleteUser()

  const { closeModal } = useContext(ModalContext)

  const handleDeleteUser = () => {
    deleteUser(userId)
    closeModal()
  }

  return (
    <>
      <p>Are you sure you want to delete this user?</p>
      <Button onClick={handleDeleteUser}>Delete user</Button>
    </>
  );
}

export default DeleteUserModal