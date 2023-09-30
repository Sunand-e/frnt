import { Switch as ArkSwitch, SwitchControl, SwitchLabel, SwitchThumb } from "@ark-ui/react"
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
        <SwitchControl className={`
          w-11 h-6 bg-gray-200
          relative
          ring-2
          ring-main-dark-30/50
          focus:ring-4 
          focus:outline-none focus:ring-4 
          focus:ring-main/30 
          dark:focus:ring-main
          rounded-full peer dark:bg-gray-700 
          data-[state=checked]:ring-main/30 
          data-[state=checked]:after:translate-x-full 
          data-[state=checked]:after:border-white 
          data-[state=checked]:bg-main
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