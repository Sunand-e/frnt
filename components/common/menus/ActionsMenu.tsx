import { Menu } from '@headlessui/react';
import ChevronDownIcon from '@heroicons/react/20/solid/ChevronDownIcon';
import useUserHasCapability from '../../../hooks/users/useUserHasCapability';
import MenuComponent from './MenuComponent';


const ActionsMenu = ({menuItems, buttonText='Actions', align='right'}) => {

  const { userHasCapability } = useUserHasCapability()
  
  const filteredMenuItems = menuItems.filter(item => {
    return item.capability ? userHasCapability(item.capability) : true
  })

  const disabled = !filteredMenuItems.length
  
  const button = (
    <Menu.Button 
      disabled={disabled}
      className={`inline-flex justify-center rounded-md border border-gray-300 hover:border-gray-400/60 ${disabled ? 'bg-gray-300 text-gray-400' : 'bg-white text-main-secondary'} bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2 focus:ring-offset-gray-100`}
    >
      { buttonText }
      <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
    </Menu.Button>    
  )

  return (
    <MenuComponent 
      align={align}
      menuItems={filteredMenuItems}
      button={button}
    />
  )
}

export default ActionsMenu