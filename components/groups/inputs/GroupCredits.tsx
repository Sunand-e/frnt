import { handleModal } from '../../../stores/modalStore';
import Button from '../../common/Button';
import IssueGroupCredits from './IssueGroupCredits';

const GroupCredits = ({ group }) => {

  const handleIssueCredits = () => {
    handleModal({
      title: `Issue credits`,
      content: <IssueGroupCredits groupId={group.id} />
    })
  }

  return (
    <div className='flex items-center mb-2'>
      <div className=''>
        {`Credits remaining: `}
        <span className='font-bold text-xl'>{group.creditTotal - group.creditsUsed}</span>
        {` (used: `}<span className='font-bold'>{group.creditsUsed}</span>{`)`}
      </div>
      <Button className='ml-4' displayType='white' onClick={handleIssueCredits}>
        Issue Credits
      </Button>
    </div>
  )
}

export default GroupCredits;