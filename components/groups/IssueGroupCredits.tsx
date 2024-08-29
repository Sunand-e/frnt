import { useState } from 'react';
import useGetGroup from '../../hooks/groups/useGetGroup';
import useIssueGroupCredits from '../../hooks/groups/useIssueGroupCredits';
import { closeModal } from '../../stores/modalStore'; // Remove if not using modal
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import NumberPropertyInput from '../common/inputs/NumberPropertyInput'; // Import NumberPropertyInput

const IssueGroupCredits = ({ groupId, onSubmit=null }) => {
  const [creditIncrement, setCreditIncrement] = useState(0);
  const { issueGroupCredits } = useIssueGroupCredits(groupId);
  const { group, loading, error } = useGetGroup(groupId);

  const handleIssueCredits = () => {
    issueGroupCredits(groupId, creditIncrement);
    if (onSubmit) {
      onSubmit();
    }
    closeModal(); // Remove if not using modal
  };

  if (loading) {
    return (
      <LoadingSpinner 
        showSpinner={false}
        text="Loading"
      />
    );
  }

  if (error) {
    return <p>Error loading group data.</p>;
  }

  return (
    <>
      <p className='mb-2'>Issue new credits to <span className='font-bold'>{group.name}</span>.</p>
      <div className='mb-2'>Current credit total: <span className='font-bold'>{group.creditTotal}</span></div>
      <NumberPropertyInput
        unit="credits"
        min={0}
        step={1}
        value={creditIncrement}
        inputAttrs={{
          onChange: (e) => setCreditIncrement(Number(e.target.value)),
        }}
        className="mb-2"
      />
      <Button disabled={!creditIncrement} onClick={handleIssueCredits}>{`Issue credits`}</Button>
    </>
  );
};

export default IssueGroupCredits;