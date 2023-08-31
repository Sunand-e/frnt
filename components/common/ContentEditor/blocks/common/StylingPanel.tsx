import { useContext } from "react";
import { useForm } from "react-hook-form";
import { TenantContext } from "../../../../../context/TenantContext";
import ImageSelectInput from "../../../inputs/ImageSelectInput";
import ReactSelectInput from "../../../inputs/ReactSelectInput";
import { SwitchInput } from "../../../inputs/SwitchInput";
import blocktypes from "../../blocktypes";
import useBlockEditor from "../../useBlockEditor";
import ColorPickerInput from "./settings/inputs/ColorPickerInput";
import PaddingSelect from "./settings/inputs/PaddingSelect"

interface StylingFormValues {
  bgImageEnabled: boolean
}

const StylingPanel = ({block, children = null}) => {

  const blockType = blocktypes[block.type]
  const { updateBlock, updateBlockProperties, getIndexAndParent } = useBlockEditor(block)

  const selectPadding = (value, side) => {
    const paddingProperty = `padding${side[0].toUpperCase() + side.substring(1)}`
    updateBlockProperties(block, {[paddingProperty]: value})
  }
  
  const defaultValues = {
    backgroundPosition: 'center',
    ...block.style
  }

  const { control, watch } = useForm<StylingFormValues>({
    defaultValues
  });

  watch((data, { name, type }) => {
    // console.log(data, name, type)
    const updatedBlock = {
      ...block,
      style: {
        ...block.style,
        [name]: data[name]
      }
    }
    updateBlock(updatedBlock)
  })

  const { bgImageEnabled } = watch()

  return (
    <div className="flex flex-col space-y-3">
      <div id="block_padding_settings" className="">
        <label className="text-sm font-medium text-secondary mb-2 block">Padding</label>
        {/* { !parent ? ( */}
        <div className={`flex w-full items-center space-x-4 mb-2`}>
          <PaddingSelect
            side='top'
            onSelect={data => selectPadding(data.value, 'top')}
            selected={block.properties.paddingTop}
            label="Top"
            />  
          <PaddingSelect 
            side='bottom'
            onSelect={data => selectPadding(data.value, 'bottom')}
            selected={block.properties.paddingBottom}
            label="Bottom"
          />
        </div>
      </div>

      { blockType.canHaveBgImage && !blockType.alwaysHasBgImage && (
        <SwitchInput
          name={'bgImageEnabled'}
          control={control}
          label={'Background image?'}
        />
      )}
      { (bgImageEnabled || blockType.alwaysHasBgImage) && (
        <>
          <ImageSelectInput
          placeholder="/images/image-block-placeholder.jpg"
            name="bgImage"
            control={control}
            buttonText={'Choose image'}
            valueAsObject={true}
            origImage={defaultValues.bgImage}
          />
          <ColorPickerInput
            defaultValue="rgba(0,0,0,0.5)"
            label="Overlay color"
            name='overlayColor'
            control={control}
          />
          {/* <ReactSelectInput
            control={control}
            menuPlacement={'auto'}
            slim={true}
            className={'text-sm'}
            name={'backgroundPosition'}
            label="Background position"
            options={[
              { label: 'Center', value: 'center' },
              { label: 'Top', value: 'top' },
              { label: 'Bottom', value: 'bottom' }
            ]}
          /> */}
        </>
      )}
      { !blockType.alwaysHasBgImage && !bgImageEnabled && (
        <ColorPickerInput
          label="Background color"
          name='bgColor'
          control={control}
        />  
      )}
    </div>
  )
}

export default StylingPanel