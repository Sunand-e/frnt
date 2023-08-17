import Select, { components } from 'react-select';
import remixiconUrl from './remixicon.symbol.svg';

const lineHeights = [
  0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5
  // "100%", "115%", "150%", "200%", "250%", "300%"
]

const lineHeightOptions = lineHeights.map(size => ({
  value: size, label: size
}))

const LineHeightControl = ({ children, ...props }) => (
  <components.Control {...props}>
    <svg className="remix w-5 h-6 ml-1 fill-main-secondary">
      <use xlinkHref={`${remixiconUrl}#ri-line-height`} />
    </svg>
    {children}
  </components.Control>
);

const LineHeightSelect = ({value, onChange}) => {
  return (
    <Select 
      value={value}
      className='mx-1 text-main-secondary'
      components={{ Control: LineHeightControl }}
      options={lineHeightOptions}
      isSearchable={false}
      onChange={onChange}
    />
  )
}

export default LineHeightSelect