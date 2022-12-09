import { useContext } from 'react';
import { ModalContext } from "../../context/modalContext";
import useDeleteGroup from "../../hooks/groups/useDeleteGroup";
import useSendInvite from '../../hooks/useSendInvite';
import Button from '../common/Button';

const SendGroupInvitesModal = ({group}) => {

  const { sendInvite } = useSendInvite()

  const { closeModal } = useContext(ModalContext)

  const sendGroupInvites = () => {
    const userIds = group.users.edges.map(edge => edge.node.id)
    sendInvite(userIds)
    closeModal()
  }

  return (
    <>
      <p>This will send an invite to all of <span className='font-bold'>{group.name}</span>'s inactive users.</p>
      <p className="font-bold mb-2">This action cannot be undone.</p>
      <Button onClick={sendGroupInvites}>Send invites</Button>
    </>
  );
}

export default SendGroupInvitesModal