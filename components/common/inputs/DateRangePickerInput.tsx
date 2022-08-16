import { DatePicker, DateRangePicker } from '@mantine/dates';
import { useState } from 'react';
import { useController } from 'react-hook-form';

interface DateRangePickerInputProps {
  initialValue?
  control
  name: string
  label: string
}

const DateRangePickerInput = ({initialValue, control, name, label}: DateRangePickerInputProps) => {

  const [value, setValue] = useState(initialValue)

  const { field } = useController({
    control,
    name
  })

  const handleChange = (newVal) => {
    field.onChange(newVal)
    setValue(newVal)
  }

  return (
    <DateRangePicker
      label={label}
      placeholder="Pick dates range"
      value={value}
      onChange={handleChange}
    />
  )
}

export default DateRangePickerInput