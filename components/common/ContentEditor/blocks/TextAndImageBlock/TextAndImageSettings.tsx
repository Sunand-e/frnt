import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import NumberPropertyInput from "../../../inputs/NumberPropertyInput"
import ReactSelect from "../../../inputs/ReactSelect"
import ReactSelectInput from "../../../inputs/ReactSelectInput"
import ImageSelectFromLibrary from "../../ImageSelectFromLibrary"
import useBlockEditor from "../../useBlockEditor"
import { updateBlockProperties, useBlockStore } from "../../useBlockStore"
import StylingPanel from "../common/StylingPanel"

export const TextAndImageSettings = ({block}) => {

  const setShowSettings = ({value}) => {
    let showText = true
    let showImage = true
    switch(value) {
      case 'textonly': {
        showImage = false
        break
      }
      case 'imageonly': {
        showText = false
        break
      }
    }
    updateBlockProperties(block, {
      showText,
      showImage      
    })
  }

  const showPartsOptions = [
    { label: 'Text and image', value: 'textandimage' },
    { label: 'Text only', value: 'textonly' },
    { label: 'Image only', value: 'imageonly' }
  ]
  
  let value = 'textandimage'
  if(block.properties?.showImage === false) {
    value = 'textonly'
  } else if(block.properties?.showText === false) {
    value = 'imageonly'
  }
  
  return (
    <>
      <ReactSelect
        value={showPartsOptions.find(o => o.value === value)}
        menuPlacement={'auto'}
        slim={true}
        className={'text-sm'}
        label="Show:"
        onChange={setShowSettings}
        options={showPartsOptions}
        getOptionValue={option => option.value}
      />
      <StylingPanel block={block} />
    </>
  );
}

export default TextAndImageSettings