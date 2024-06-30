import { Menu, Transition } from '@headlessui/react';
import { forwardRef, Fragment } from 'react';
import MenuButton from './MenuButton';
import MenuItems from './MenuItems';
import { Float } from '@headlessui-float/react'

const MenuComponent = ({menuItems=[], button, align='right'}) => {

  return (
    
    <Menu as="div" className="relative inline-block">
      <Float placement="bottom-end" portal>
      { button }
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        >
        <MenuItems menuItems={menuItems} align={align} />
      </Transition>
      </Float>
    </Menu>
  )
}

export default MenuComponent
