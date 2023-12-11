import useSendInvite from '../../hooks/useSendInvite';
import { closeModal } from '../../stores/modalStore';
import Button from '../common/Button';

const SendGroupInvitesModal = ({group}) => {

  const { sendInvite } = useSendInvite()

  const sendGroupInvites = () => {
    const userIds = group.users.edges.map(edge => edge.node.id)
    sendInvite(userIds)
    closeModal()
  }

  return (
    <>
      <p>This will send an invitation email to all of <span className='font-bold'>{group.name}</span>'s inactive users.</p>
      <p className="font-bold mb-2">This action cannot be undone.</p>
      <Button onClick={sendGroupInvites}>Send invitation</Button>
    </>
  );
}

export default SendGroupInvitesModal