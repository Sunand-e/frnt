import { TextFont } from '@styled-icons/fluentui-system-filled/TextFont';
import { useContext } from 'react';
import Select, { components } from 'react-select';
import { TenantContext } from '../../../context/TenantContext';
import useLazyFontLoad from '../../../hooks/useLazyFontLoad';

const googleFonts = [
  // 'Avenir', 
  // 'Gill Sans', 
  'Be Vietnam', 'Bebas Neue', 'Cormorant', 'DM Sans',
  'Inter', 'Lato', 'Lora', 'Lustria',
  'Maven Pro', 'Merriweather', 'Montserrat', 'Open Sans', 'Oswald',
  'Poppins', 'Raleway', 'Roboto', 'Roboto Slab', 'Rockwell', 'Ubuntu'
];

const websafeFonts = [
  "Arial", "Arial Black", "Courier New", "Georgia", "Helvetica",
  "Impact", "Times New Roman", "Trebuchet MS", "Verdana"
]

const createFontOption = (name, type) => ({
  value: name, label: name, type
})

const defaultFontOptions = [
  ...googleFonts.map(name => createFontOption(name, 'google')),
  ...websafeFonts.map(name => createFontOption(name, 'websafe'))
]

const FontFamilyControl = ({ children, ...props }) => (
  <components.Control {...props}>
    <TextFont className="remix w-5 h-6 ml-1 fill-main-secondary" />
    {children}
  </components.Control>
);

const FontFamilySelect = ({value, onChange}) => {
  
  const {customFonts} = useContext(TenantContext)
  
  const customFontOptions = customFonts ? fonts.map(font => ({
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
      menuPortalTarget={document.body}
      menuPlacement={'auto'}
      className='mx-1 min-w-[160px] text-main-secondary'
      components={{ Control: FontFamilyControl }}
      options={options}
      isSearchable={false}
      onChange={onChange}
    />
  )
}

export default FontFamilySelect