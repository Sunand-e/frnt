import { TextInput } from '@mantine/core';
import TextInputInlineLabel from '../../../TextInputInlineLabel';
import useBlockEditor from '../../useBlockEditor';
import ColorPicker from '../common/settings/inputs/ColorPicker';

export const LineDividerSettings = ({block}) => {

  const { updateBlockProperties } = useBlockEditor()

  const selectColor = (color) => {
    updateBlockProperties(block, {color})
  }
  
  const setLineHeight = (e) => {

    const height = e.target.value
    
    updateBlockProperties(block, {height})
    console.log('height')
    console.log(height)
    console.log(block)
  }
  
  return (
    <>
      <input value={block.properties?.height} onChange={setLineHeight} />
      <ColorPicker value={block.properties?.color} onChange={selectColor} />
    </>
  )
}

export default LineDividerSettings