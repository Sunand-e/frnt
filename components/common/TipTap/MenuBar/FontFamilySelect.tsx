import { TextFont } from '@styled-icons/fluentui-system-filled/TextFont';
import { useContext } from 'react';
import Select, { components } from 'react-select';
import { TenantContext } from '../../../../context/TenantContext';
import useLazyFontLoad from '../../../../hooks/useLazyFontLoad';

const googleFonts = [
  { name: 'Be Vietnam' },
  { name: 'Cormorant' },
  { name: 'DM Sans' },
  { name: 'Inter' },
  { name: 'Lato' },
  { name: 'Lora' },
  { name: 'Lustria' },
  { name: 'Maitree' },
  { name: 'Maven Pro' },
  { name: 'Merriweather' },
  { name: 'Montserrat' },
  { name: 'Open Sans' },
  { name: 'Oswald' },
  { name: 'Poppins' },
  { name: 'Raleway' },
  { name: 'Roboto' },
  { name: 'Roboto Slab' },
];

const defaultFontOptions = googleFonts.map(font => ({
  value: font.name, label: font.name, type: 'google'
}))

const FontFamilyControl = ({ children, ...props }) => (
  <components.Control {...props}>
    <TextFont className="remix w-5 h-6 ml-1 fill-main-secondary" />
    {children}
  </components.Control>
);

const FontFamilySelect = ({value, onChange}) => {
  
  const {fonts} = useContext(TenantContext)
  const customFontOptions = fonts ? fonts.map(font => ({
    value: font.name,
    label: font.name,
    type: 'custom'
  })) : []
  
  const allOptions = [
    ...customFontOptions,
    ...defaultFontOptions
  ]
  
  const selectedOption = allOptions.find(option => {
    return option.value === value    
  })
  
  useLazyFontLoad(selectedOption)
  
console.log('selectedOption')
console.log(selectedOption)

  const options = [
    ...(customFontOptions && [{
      label: 'Custom Fonts',
      options: customFontOptions
    }]),
    {
      label: 'Default Fonts',
      options: defaultFontOptions
    }
  ]
  return (
    <Select 
      value={selectedOption}
      className='mx-1 min-w-[160px] text-main-secondary'
      components={{ Control: FontFamilyControl }}
      options={options}
      isSearchable={false}
      onChange={onChange}
    />
  )
}

export default FontFamilySelect