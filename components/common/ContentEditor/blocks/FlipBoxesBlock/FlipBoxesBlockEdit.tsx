import { FlipBoxes } from '../../../FlipBoxes';
import useBlockEditor from '../../useBlockEditor';
import { useBlockStore } from '../../useBlockStore';
const FlipBoxesBlockEdit = ({block}) => {

  const { updateBlock } = useBlockStore()

  return (
    <FlipBoxes />
  );
}

export default FlipBoxesBlockEdit
