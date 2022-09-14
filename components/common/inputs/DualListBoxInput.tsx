import { useState } from "react";
import { Control, useController } from "react-hook-form";
import { ChevronLeft, ChevronDoubleLeft, ChevronRight, ChevronDoubleRight } from '@styled-icons/heroicons-solid';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import styles from './DualListBoxInput.module.scss'

type DualListBoxInputProps = {
  control?: Control
  options
  lang
  name?: string
  label?: string
}

const DualListBoxInput = ({
  control,
  name,
  label,
  ...props
}: DualListBoxInputProps) => {

  const { field } = useController({
    control,
    name,
  });
  console.log(field.value)

  const handleChange = value => {
    field.onChange(value)
  }

  return (
    <div>
      { label &&
        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            {label}
          </span>
        </label>
      }
      <DualListBox
        selected={field.value}
        className={styles.DualInput}
        onChange={handleChange}
        showHeaderLabels={true}
        canFilter
        icons={{
          moveLeft: <ChevronLeft className='h-5' />,
          moveAllLeft: <ChevronDoubleLeft className='h-5' />,
          moveRight: <ChevronRight className='h-5' />,
          moveAllRight: <ChevronDoubleRight className='h-5' />,
        }}
        {...props}
      />
    </div>
  )
}

export default DualListBoxInput