import { closeModal, handleModal } from '../../../../../stores/modalStore';
import Button from '../../../Button'
import BlockSelector from '../../BlockSelector';

const PlaceholderBlockEdit = ({block}) => {
  const blockButtonClassName = `
  flex flex-none justify-center items-center
  space-x-2 p-3 text-center text-main
  bg-white rounded-lg
  shadow shadow-lg
  mb-3
`
  const handleBlockSelect = () => {
    handleModal({
      title: `Choose a block`,
      content: (
        <BlockSelector
          blockButtonClassName={blockButtonClassName}
          className={'flex flex-wrap justify-center items-center space-x-3'}
          block={block}
          replace={true}
          exclude={['columns','tabs','carousel','package','accordion']}
          onSelect={closeModal}
        />
      )
    })  
  }
  
  return (
    <div className={`flex align-center items-center justify-center h-full min-h-[80px]`}>
      <Button onClick={handleBlockSelect}>Add block</Button>
    </div>
  )
}

export default PlaceholderBlockEdit