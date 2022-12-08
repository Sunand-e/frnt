import Link from 'next/link'
import { Menu } from '@headlessui/react';
import classNames from '../../../utils/classNames';
import { forwardRef } from 'react';

const MenuItem = ({label = '', href='#', onClick=null, }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link href={href} onClick={onClick} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
            {label}
        </Link>
      )}
    </Menu.Item>
  )
}
const MenuItems = forwardRef(({ menuItems, align='right' },ref) => {
  const alignClassNames = (align === 'right') ? 'origin-top-right right-0' : 'origin-top-left left-0'
  return (
    <Menu.Items ref={ref} className={`text-left whitespace-nowrap  absolute z-20 mt-2 min-w-[160px] rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}>
      { menuItems.map((item, index) => (
        <MenuItem {...item} key={index} />
        )) }
    </Menu.Items>
  )
})

export default MenuItems
