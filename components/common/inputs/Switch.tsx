import { Switch as ArkSwitch, SwitchControl, SwitchInput, SwitchLabel, SwitchThumb } from "@ark-ui/react"
import { useState } from "react"

export const Switch = ({
  onChange,
  value,
  label=null
}) => {
  return (    
    <ArkSwitch 
      checked={value}
      onChange={(e) => onChange(e.checked)}
      className={`w-full flex items-center justify-between`}
    >
      { label && <SwitchLabel className="text-sm font-medium text-gray-700">{label}</SwitchLabel> }
      <div className="relative flex items-center cursor-pointer mr-1">
        <SwitchInput className="sr-only peer"/>
        <SwitchControl className={`
          w-11 h-6 bg-gray-200
          relative
          ring-2
          ring-main-dark-30/50
          peer-focus:ring-4 
          peer-focus:outline-none peer-focus:ring-4 
          peer-focus:ring-main/30 
          dark:peer-focus:ring-main
          rounded-full peer dark:bg-gray-700 
          peer-checked:ring-main/30 
          peer-checked:after:translate-x-full 
          peer-checked:after:border-white 
          peer-checked:bg-main
          after:content-[''] 
          after:absolute 
          after:top-[2px] after:left-[2px] 
          after:bg-white after:border-gray-300 after:border 
          after:rounded-full
          after:h-5 after:w-5 
          after:transition-all 
          dark:border-gray-600 
        `}>
          <SwitchThumb />
        </SwitchControl>
      </div>
    </ArkSwitch>
  )
}