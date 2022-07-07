import { useContext } from 'react';
import { ModalContext } from "../../../context/modalContext";
import useDeleteTenant from "../../../hooks/tenants/useDeleteTenant";
import Button from '../../Button';

const DeleteTenantModal = ({tenantId}) => {

    const { deleteTenant } = useDeleteTenant()

    const { closeModal } = useContext(ModalContext)

    const handleDeleteTenant = () => {
        deleteTenant(tenantId)
        closeModal()
    }

    return (
        <>
            <p>Are you sure you want to delete this tenant?</p>
            <p>Warning: This action cannot be undone.</p>
            <Button onClick={handleDeleteTenant} className={`bg-red-500`}>Delete tenant</Button>
        </>
    );
}

export default DeleteTenantModal
