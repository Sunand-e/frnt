import Tippy from "@tippyjs/react"
import { useState } from "react";
import { useController } from "react-hook-form";
// import { ColorPicker as ColorPickerIcon } from "@styled-icons/evaicons-solid/ColorPicker"
import { ColorPicker as ColorPickerIcon } from "css.gg/icons/tsx/ColorPicker"

import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaGradient,
  ColorPickerAreaThumb,
  ColorPickerChannelInput,
  ColorPickerChannelSliderBackground,
  ColorPickerChannelSliderThumb,
  ColorPickerChannelSliderTrack,
  ColorPickerContent,
  ColorPickerEyeDropperTrigger,
  ColorPickerSwatch,
  ColorPickerSwatchBackground,
  ColorPickerSwatchGroup,
} from '@ark-ui/react/color-picker'

const ColorPickerControl = ({color, onChange}) => {

  const handleChange = ({value}) => onChange(value)
  
  return (
    // <ColorPicker value={color} onChange={onChange}>
    // <ColorPicker value={color} onChange={handleChange}>
    <ColorPicker defaultValue="rgba(0, 181, 59, 0.5)" onChange={handleChange}>
      {(api) => {
        api.setFormat('hsla')
        const [hue, saturation, lightness] = api.channels
        return (
          <ColorPickerContent className="rounded-lg w-[266px] overflow-hidden">
            <output>
              <ColorPickerSwatch value={api.value} readOnly />
            </output>
            <ColorPickerArea xChannel={saturation} yChannel={lightness} className="h-[266px]">
              <ColorPickerAreaGradient className="h-full"/>
              <ColorPickerAreaThumb 
                className="h-4 w-4"
                style={{
                  borderRadius: '100%',
                  border: '2px solid white',
                  boxShadow: 'black 0px 0px 0px 1px, black 0px 0px 0px 1px inset',
                  outline: 'none',
                  zIndex: 1
                }}
              />
            </ColorPickerArea>
            <div className="flex flex-col space-y-4 pt-4 overflow-visible">
              <div className="flex space-x-4  overflow-visible">
                <ColorPickerEyeDropperTrigger><ColorPickerIcon className="w-8"/></ColorPickerEyeDropperTrigger>
                
                <div className="flex flex-col space-y-4 w-full">
                  <ColorPickerChannelSliderTrack channel={hue} className="h-3 rounded-full w-full">
                    <ColorPickerChannelSliderBackground className="rounded-full" />
                    <ColorPickerChannelSliderThumb
                      className="h-3 w-3"
                      style={{
                        borderRadius: '100%',
                        border: '2px solid white',
                        transform: 'translate(-50%, -50%)',
                        outline: 'none',
                        boxShadow: 'black 0px 0px 0px 1px, black 0px 0px 0px 1px inset',
                      }}
                    />
                  </ColorPickerChannelSliderTrack>
        
                  <ColorPickerChannelSliderTrack channel="alpha" className="h-3 rounded-full">
                    <ColorPickerChannelSliderBackground className="rounded-full" />
                    <ColorPickerChannelSliderThumb 
                      className="h-3 w-3"
                      style={{
                        borderRadius: '100%',
                        border: '2px solid white',
                        transform: 'translate(-50%, -50%)',
                        outline: 'none',
                        boxShadow: 'black 0px 0px 0px 1px, black 0px 0px 0px 1px inset',
                      }}
                    />
                  </ColorPickerChannelSliderTrack>
                </div>
              </div>
              <div className="flex space-x-4">
                <ColorPickerChannelInput
                  className={`px-3 p-1.5 block w-full rounded-md border-gray-300 hover:border-gray-400/60 shadow-sm focus:border-main focus:ring focus:ring-main/50`}
                  channel="hex"
                />
                <ColorPickerChannelInput
                  className={`px-3 p-1.5 block w-full rounded-md border-gray-300 hover:border-gray-400/60 shadow-sm focus:border-main focus:ring focus:ring-main/50`}
                  channel="alpha"
                />
              </div>
            </div>
  
            <ColorPickerSwatchGroup>
              <ColorPickerSwatch value="#123123">
                <ColorPickerSwatchBackground />
              </ColorPickerSwatch>
              <ColorPickerSwatch value="#ff1321">
                <ColorPickerSwatchBackground />
              </ColorPickerSwatch>
            </ColorPickerSwatchGroup>
  
          </ColorPickerContent>
        )
      }}
    </ColorPicker>
  )
} 

export default ColorPickerControl