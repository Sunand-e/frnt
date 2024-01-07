import { useForm } from "react-hook-form";
import ImageSelectInput from "../../../inputs/ImageSelectInput";
import { SwitchInput } from "../../../inputs/SwitchInput";
import blocktypes from "../../blocktypes";
import { updateBlockStyles, useBlockStore } from "../../useBlockStore";
import ColorPickerInput from "./settings/inputs/ColorPickerInput";
import PaddingSelect from "./settings/inputs/PaddingSelect";
import ReactSelect from "../../../inputs/ReactSelect"
interface StylingFormValues {
  bgImageEnabled: boolean
}

const StylingPanel = ({ block, children = null }) => {

  const blockType = blocktypes[block.type]
  const updateBlock = useBlockStore(state => state.updateBlock)

  const selectPadding = (value, side) => {
    const paddingProperty = `padding${side[0].toUpperCase() + side.substring(1)}`
    updateBlockStyles(block, { [paddingProperty]: value })
  }

  const defaultValues = {
    backgroundPosition: 'center',
    ...block.style
  }

  const { control, watch } = useForm<StylingFormValues>({
    defaultValues
  });

  watch((data, { name, type }) => {
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

  const bgSizeOptions = [
    {
      label: 'Cover',
      value: 'cover'
    },
    {
      label: 'Contain',
      value: 'contain'
    }
  ]
  const bgPositionOptions = [
    { label: 'Center', value: 'center' },
    { label: 'Top left', value: 'top left' },
    { label: 'Top right', value: 'top right' },
    { label: 'Bottom left', value: 'bottom left' },
    { label: 'Bottom right', value: 'bottom right' },
  ]

  const handleChangeBgSize = option => {
    updateBlockStyles(block, {
      backgroundSize: option.value
    })
  }

  const handleChangeBgPosition = option => {
    // alert(e.target.value)
    updateBlockStyles(block, {
      backgroundPosition: option.value
    })
  }
  return (
    <div className="flex flex-col space-y-3">
      <div id="block_padding_settings" className="">
        <label className="text-sm font-medium text-secondary mb-2 block">Padding</label>
        {/* { !parent ? ( */}
        <div className={`flex w-full items-center space-x-4 mb-2`}>
          <PaddingSelect
            side='top'
            onSelect={data => selectPadding(data.value, 'top')}
            selected={block.style?.paddingTop}
            label="Top"
          />
          <PaddingSelect
            side='bottom'
            onSelect={data => selectPadding(data.value, 'bottom')}
            selected={block.style?.paddingBottom}
            label="Bottom"
          />
        </div>
      </div>

      {blockType.canHaveBgImage && !blockType.alwaysHasBgImage && (
        <SwitchInput
          name={'bgImageEnabled'}
          control={control}
          label={'Background image?'}
        />
      )}
      {(bgImageEnabled || blockType.alwaysHasBgImage) && (
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
            showAlpha={true}
          />
          <ReactSelect
            value={bgSizeOptions.find(o => o.value === block.style.backgroundSize)}
            slim={true}
            className={'text-sm'}
            label="Background size:"
            defaultValue={{ label: 'Cover', value: 'cover' }}
            onChange={handleChangeBgSize}
            options={bgSizeOptions}
            getOptionValue={option => option.value}
          />
          <ReactSelect
            defaultValue={{ label: 'Center', value: 'center' }}
            value={bgPositionOptions.find(o => o.value === block.style.backgroundPosition)}
            slim={true}
            className={'text-sm'}
            label="Background position:"
            onChange={handleChangeBgPosition}
            options={bgPositionOptions}
            getOptionValue={option => option.value}
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
      {!blockType.alwaysHasBgImage && !bgImageEnabled && (
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