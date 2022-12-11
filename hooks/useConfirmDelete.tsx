import { useField } from "formik"
import { useContext } from 'react';
import { ModalContext } from "../context/modalContext";
import useDeleteResource from "./resources/useDeleteResource";
import Button from '../components/common/Button';

const useConfirmDelete = ({type, name, onConfirm}) => {

  const { handleModal, closeModal } = useContext(ModalContext)

  const handleDelete = () => {
    onConfirm()
    closeModal()
  }

  const displayName = name ? (
    <>
      the {type}: <span className="font-bold">{name}</span>
    </>
  ) : (
    <>this {type}</>
  )

  const confirmDelete = () => {
    handleModal({
      title: `Delete ${type}`,
      content: (
        <>
          <p>
            Are you sure you want to delete {displayName} ?
          </p>
          <p className="font-bold mb-2">This action cannot be undone.</p>
          <Button onClick={handleDelete}>{`Delete ${type}`}</Button>
        </>
      )
    })
  }

  return {
    confirmDelete
  }
}

export default useConfirmDelete