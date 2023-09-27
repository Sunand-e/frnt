import TextInput from '../../../inputs/TextInput';
import { updateBlockStyles } from '../../useBlockStore';
import ColorPicker from '../common/settings/inputs/ColorPicker';

export const LineDividerSettings = ({block}) => {

  const selectColor = (color) => {
    updateBlockStyles(block, {color})
  }
  
  const setLineHeight = (e) => {
    const height = parseInt(e.target.value)
    
    updateBlockStyles(block, {height})
  }
  
  return (
    <>
      <TextInput
        label="Divider height"
        type="number"
        inputAttrs={{
          value: block.style?.height,
          onChange: setLineHeight,
          min: 1,
          max: 20
        }}
      />

      <ColorPicker 
        value={block.style?.color} 
        onChange={selectColor}
        label={'Divider colour'}
      />
    </>
  )
}

export default LineDividerSettings