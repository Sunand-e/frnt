import useDeleteScormModule from "../../hooks/scormModules/useDeleteScormModule";
import Button from '../Button';

interface DeletePackageModalProps {
  module
  onDelete?
  onCancel?
}

const DeletePackageModal = ({module, onDelete, onCancel}: DeletePackageModalProps) => {

  const { deleteScormModule } = useDeleteScormModule()

  const handleDelete = async () => {
    const response = await deleteScormModule(module.id)
    onDelete && onDelete(module)
  }

  return (
    <>
      <p>
        Are you sure you want to delete the SCORM package: <span className="font-bold"> 
          {module.title}
        </span>
        ?
      </p>
      <p className="font-bold mb-2">This action cannot be undone.</p>
      <div className='flex space-x-4'>
        <Button onClick={onCancel}>Cancel</Button>
        <Button displayType="alert" onClick={handleDelete}><>Delete SCORM package</></Button>
      </div>

    </>
  );
}

export default DeletePackageModal