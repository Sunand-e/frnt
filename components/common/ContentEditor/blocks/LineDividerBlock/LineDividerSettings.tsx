import { updateBlockProperties } from '../../useBlockStore';
import ColorPicker from '../common/settings/inputs/ColorPicker';

export const LineDividerSettings = ({block}) => {

  const selectColor = (color) => {
    updateBlockProperties(block, {color})
  }
  
  const setLineHeight = (e) => {

    const height = e.target.value
    
    updateBlockProperties(block, {height})
  }
  
  return (
    <>
      <input value={block.properties?.height} onChange={setLineHeight} />
      <ColorPicker value={block.properties?.color} onChange={selectColor} />
    </>
  )
}

export default LineDividerSettings