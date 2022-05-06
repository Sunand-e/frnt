import PaddingSelect from "./settings/inputs/PaddingSelect"

const StylingSettings = ({children = null}) => {

  return (
    <>
      <PaddingSelect 
        side='top'
        onSelect={alert}
        selected='none'
        label="Padding Top"
      />
      
      <PaddingSelect 
        side='bottom'
        onSelect={alert}
        selected='none'
        label="Padding Bottom"
      />

      <PaddingSelect 
        side='left'
        onSelect={alert}
        selected='none'
        label="Padding Left"
      />

      <PaddingSelect 
        side='right'
        onSelect={alert}
        selected='none'
        label="Padding Right"
      />

    </>
  )
}

export default StylingSettings