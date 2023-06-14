import { PlusCircle } from '@styled-icons/boxicons-regular';
import { closeModal, handleModal } from '../../../stores/modalStore';
import LineWithIcon from '../../common/LineWithIcon'
import BlockSelector from './BlockSelector';

const BlockFooter = ({block}) => {

  const blockButtonClassName = `
    flex flex-none justify-center items-center
    space-x-2 p-3 text-center text-main
    bg-white rounded-lg
    shadow shadow-lg
    mb-3
  `
  const handleAddBlock = () => {
    handleModal({
      title: `Choose a block`,
      content: (
        <BlockSelector
          blockButtonClassName={blockButtonClassName}
          className={'flex flex-wrap justify-center items-center space-x-3'}
          block={block}
          // exclude={['columns','package']}
          onSelect={closeModal}
        />
      )
    })  
  }

  return (
    <>
      <div
        className={`z-32 absolute flex justify-center -bottom-5 text-main opacity-0 group-hover:opacity-100 w-full`}
        // onClick={() => setShowBlockSelector(!showBlockSelector)}
        >
          {/* <div
            className='w-10 p-1 bg-white/80 rounded-full'
            style={{pointerEvents: 'all'}}
            >dsa</div> */}
          <PlusCircle
            onClick={handleAddBlock}
            className='w-9 h-9 px-0.5 bg-white/80 rounded-full'
            style={{pointerEvents: 'all'}}
          />
      </div>
    </>
  );
}

export default BlockFooter