import { useState } from 'react';
import useGetGroup from '../../../hooks/groups/useGetGroup';
import useIssueGroupCredits from '../../../hooks/groups/useIssueGroupCredits';
import { closeModal } from '../../../stores/modalStore'; // Remove if not using modal
import Button from '../../common/Button';
import LoadingSpinner from '../../common/LoadingSpinner';
import ReactSelect from '../../common/inputs/ReactSelect';
import useConfirmAction from '../../../hooks/useConfirmAction';

const creditOptions = [
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 250, label: '250' },
  { value: 500, label: '500' },
];


const customStyles = {
  option: (provided, state) => {
    return ({
      ...provided,
      padding: 8,
      height: 'auto',
      lineHeight: 1.5
    })
  },
    menu: (base) => ({
      ...base,
      width: "max-content",
      minWidth: "100%"
    }),
  menuPortal: (provided, state) => ({
    ...provided,
    zIndex: 13000,
  }),
  input: (provided, state) => ({
    ...provided,
    boxShadow: 'none',
  }),
  control: (provided, state) => ({
    ...provided,
    minWidth: "240px"

  }),
}

const IssueGroupCredits = ({ groupId, onSubmit=null, selectedValue=null }) => {

  const { issueGroupCredits } = useIssueGroupCredits(groupId);
  const { group, loading, error } = useGetGroup(groupId);
  
  const [selectedCreditOption, setSelectedCreditOption] = useState(creditOptions.find(option => option.value === selectedValue));

  const handleIssueCredits = () => {
    issueGroupCredits(groupId, selectedCreditOption.value);
    if (onSubmit) {
      onSubmit();
    }
    closeModal();
  };

  const { confirmAction } = useConfirmAction({
    title: `Issue ${selectedCreditOption?.value} credits`,
    content: (
      <>
        <p>
          Are you sure you want to add 
          <strong> {selectedCreditOption?.value} </strong>
          credits to <strong>{group?.name}?</strong>
        </p>
        <p>This will incur costs as outlined in the pricing table.</p>
      </>
    ),
    buttonTitle: `Yes, issue credits`,
    onConfirm: handleIssueCredits,
  })

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
      <div className='mb-2'>
        {`Credits remaining: `}
        <span className='font-bold text-xl'>{group.creditTotal - group.creditsUsed}</span>
        {` (used: `}<span className='font-bold'>{group.creditsUsed}</span>{`)`}
      </div>
      <p className='mb-2'>Issue new credits to <span className='font-bold'>{group.name}</span>.</p>
      {/* <NumberPropertyInput
        unit="credits"
        min={0}
        step={1}
        value={creditIncrement}
        inputAttrs={{
          onChange: (e) => setCreditIncrement(Number(e.target.value)),
        }}
        className="mb-2"
      /> */}
      <ReactSelect
        value={selectedCreditOption}
        onChange={(option) => {
          setSelectedCreditOption(option);
        }}
        options={creditOptions}
        className="mb-2 z-[9999] h-[678]"
        menuPortalTarget={document.body}
        menuPlacement={'auto'}
        menuPosition="fixed"
        styles={customStyles}
      />
      <Button disabled={!selectedCreditOption} onClick={confirmAction}>{`Issue credits`}</Button>
    </>
  );
};

export default IssueGroupCredits;