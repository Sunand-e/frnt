import { useController } from "react-hook-form";
import GroupSelect from "./GroupSelect";

const GroupSelectInput = ({
  control,
  name="group",
  label=null,
  isMulti=false,
  groupFilter=null,
}) => {
  
  const { field } = useController({
    control,
    name,
  })

  const handleChange = val => {
    const newValue = isMulti ? val.map(value => value.id) : val?.id
    field.onChange(newValue)
  }

  return (
    <label className={`block z-40`}>
      { label && <span className="text-sm font-medium text-gray-700">{ label }</span> }
      <GroupSelect
        onSelect={handleChange} 
        defaultOption={null} 
        selected={field.value} 
        className='w-full'
        groupFilter={groupFilter}
      />
    </label>

  )
}

export default GroupSelectInput