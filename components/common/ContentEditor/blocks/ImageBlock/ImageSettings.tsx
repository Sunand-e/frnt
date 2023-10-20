import { useEffect } from "react"
import { useForm } from "react-hook-form"
import NumberPropertyInput from "../../../inputs/NumberPropertyInput"
import ReactSelectInput from "../../../inputs/ReactSelectInput"
import { Switch } from "../../../inputs/Switch"
import ImageSelectFromLibrary from "../../ImageSelectFromLibrary"
import { getIndexAndParent, updateBlockProperties, updateBlockStyles, useBlockStore } from "../../useBlockStore"

export const ImageSettings = ({block}) => {

  const updateBlock = useBlockStore(state => state.updateBlock)
  const { parent } = getIndexAndParent(block.id)

  const defaultValues = {
    imageSize: block.imageSize || 'default',
    style: {
      width: '50%'
    }
  }

  const { control, watch } = useForm({
    defaultValues,
  });

  // useEffect(() => {
  //   if(block.style?.width) {
  //     setValue('style.width', block.style.width)
  //   }

  // },[block.style?.width])

  watch((data, { name, type }) => {
    const updatedBlock = {
      ...block,
      [name]: data[name]
    }
    updatedBlock.displayType = (data.imageSize === 'fullwidth') ? 'fullwidth' : 'normal'
    updateBlock(updatedBlock)
  })

  const handleChangeWidth = e => {
    // alert(e.target.value)
    updateBlockStyles(block, {
      width: e.target.value
    })
  }

  const setImage = image => {
    updateBlockProperties(block, {
      url: image?.location,
      fileName: image?.fileName,
      mediaId: image?.id,
    })
  }
  
  const setShowCaption = value => {
    updateBlockProperties(block, {
      showCaption: value
    })
  }
  const { imageSize } = watch()

  return (
    <>
      <ImageSelectFromLibrary
        label="Image file"
        src={block.properties?.url}
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
          ...(parent?.type !== 'columns' ? [{ label: 'Full width', value: 'fullwidth'}] : []),
          { label: 'Custom width', value: 'custom' },
        ]}
      />
      { (imageSize === 'custom') && (
        <NumberPropertyInput
          inputAttrs={{
            value: block.style?.width,
            onChange: handleChangeWidth
          }}
          unit={'px'}
          className={'text-sm'}
          label="Image width"
        />
      )}
      <Switch
        label={'Show caption?'}
        value={block.properties?.showCaption}
        onChange={setShowCaption}
      />
    </>
  );
}

export default ImageSettings