import { TextFont } from '@styled-icons/fluentui-system-filled/TextFont';
import Select, { components } from 'react-select';
import remixiconUrl from './remixicon.symbol.svg';

const FontSizeControl = ({ children, ...props }) => (
  <components.Control {...props}>
    <svg className="remix w-5 h-6 ml-1 fill-main-secondary">
      <use xlinkHref={`${remixiconUrl}#ri-font-size`} />
    </svg>
    {children}
  </components.Control>
);
  
const defaultFontSizes = [
  10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52
]

const headingFontSizes = [
  20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72
]

const FontSizeSelect = ({value, onChange, isHeading}) => {

  const sizes = isHeading ? headingFontSizes : defaultFontSizes
  const fontSizeOptions = sizes.map(size => ({
    value: `${size}px`,
    label: `${size}px`
  }))

  return (
    <Select 
      value={value}
      className='mr-1 text-main-secondary'
      components={{ Control: FontSizeControl }}
      // isSearchable={false}
      options={fontSizeOptions}
      onChange={onChange}
    />
  )
}

export default FontSizeSelect