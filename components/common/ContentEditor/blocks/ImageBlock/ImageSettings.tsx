import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import NumberPropertyInput from "../../../inputs/NumberPropertyInput"
import ReactSelectInput from "../../../inputs/ReactSelectInput"
import ImageSelectFromLibrary from "../../ImageSelectFromLibrary"
import useBlockEditor from "../../useBlockEditor"

export const ImageSettings = ({block}) => {

  const { updateBlock, updateBlockProperties } = useBlockEditor(block)

  const defaultValues = {
    imageSize: 'default',
    style: {
      width: '50%'
    }
  }

  const { control, watch, register, setValue } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if(block.style?.width) {
      setValue('style.width', block.style.width)
    }

  },[block.style?.width])

  watch((data, { name, type }) => {
    console.log(data, name, type)
    const updatedBlock = {
      ...block,
      [name]: data[name]
    }
    updatedBlock.displayType = (data.imageSize === 'fullwidth') ? 'fullwidth' : 'normal'
    updateBlock(updatedBlock)
  })

  const setImage = image => {
    updateBlockProperties(block, {
      url: image?.location,
      fileName: image?.fileName,
      mediaId: image?.id,
    })
  }
  
  const { imageSize } = watch()

  return (
    <>
      <ImageSelectFromLibrary
        label="Image file"
        placeholder="image"
        src={block.properties.url}
        buttonText="Select image"
        isButtonAlwaysVisible={true}
        className="h-36 overflow-hidden"
        onSelect={setImage}
      />
      <ReactSelectInput
        control={control}
        menuPlacement={'auto'}
        slim={true}
        className={'text-sm'}
        name={'imageSize'}
        label="Image size"
        options={[
          { label: 'Default', value: 'default' },
          { label: 'Custom width', value: 'custom' },
          { label: 'Full width', value: 'fullwidth' }
        ]}
      />
      { (imageSize === 'custom') && (
        <NumberPropertyInput
          inputAttrs={register('style.width')}
          unit={'px'}
          className={'text-sm'}
          label="Image width"
        />
      )}
    </>
  );
}

export default ImageSettings