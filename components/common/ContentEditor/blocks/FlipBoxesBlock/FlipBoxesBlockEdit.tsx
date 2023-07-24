import { FlipBoxes } from '../../../FlipBoxes';
import useBlockEditor from '../../useBlockEditor';
const FlipBoxesBlockEdit = ({block}) => {

  const { updateBlock } = useBlockEditor()

  return (
    <FlipBoxes />
  );
}

export default FlipBoxesBlockEdit
