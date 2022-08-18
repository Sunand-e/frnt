import { DatePicker, DateRangePicker } from '@mantine/dates';
import { useState } from 'react';
import { useController } from 'react-hook-form';

interface DatePickerInputProps {
  isRangeAvailable: boolean
  initialValue?: Date[]
  control
  name: string
  label: string
}

const DatePickerInput = ({
  isRangeAvailable=false, 
  initialValue, 
  control, 
  name, 
  label
}: DatePickerInputProps) => {

const [startDate, setStartDate] = useState(initialValue?.[0])
const [endDate, setEndDate] = useState(initialValue?.[1])

const [isDateRange, setIsDateRange] = useState(false)

  const { field } = useController({
    control,
    name
  })

  const handleChange = (value, dateType) => {
    if(dateType === 'start') {
      setStartDate(value)
      if(isDateRange) {
        field.onChange([startDate])
      } else {
        field.onChange([field.value?.[0], startDate])
      }
    } else if(dateType === 'end') {
      setEndDate(value)
    }
  }

  const onIsDateRangeChange = (boolValue) => {
    setIsDateRange(prevValue => !prevValue)

  }

  return (
    <>
      <pre>
      { JSON.stringify(startDate,null,2) }
      </pre>
      <p>isRangeAvailable: {isRangeAvailable ? 'true' : 'false' }</p>
      <DatePicker
        label={label}
        placeholder={`Choose a ${isDateRange ? 'start ' : ''}date`}
        value={startDate}
        onChange={(value) => handleChange(value, 'start')}
        />

      { isDateRange && (
        <DatePicker
        label={label}
        placeholder="Choose an end date"
        value={endDate}
        onChange={(value) => handleChange(value, 'end')}
        />
      )}

      { isRangeAvailable && (
        <label className="flex w-full justify-start">
          <span className="text-gray-700">Multi-day event?</span>
          <input 
            type="checkbox"
            onChange={onIsDateRangeChange}
            checked={isDateRange}
            className="
              mt-1
              block
              rounded-md
              border-main/50
              shadow-sm
              focus:border-main focus:ring focus:ring-main/50
            "
          />
        </label>

      )}
    </>
  )
}

export default DatePickerInput