import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import navStructureUser from '../navStructureUser'
import navStructureAdmin from '../navStructureAdmin'
import { NavContext } from '../navContext'

import Tippy from '@tippyjs/react';
import { useViewStore } from '../../../hooks/useViewStore'

export default function NavItem({navState, admin}) {

  const navStructure = admin ? navStructureAdmin : navStructureUser;

  const router = useRouter()
  const isAdminView = useViewStore(state => state.isAdminView)

  // If the 'topLevel' property of navState is empty, create the default navstate.
  const pageNavState = navState?.topLevel ? navState : {
    topLevel: 'dashboard',
    secondary: 'dashboard'
  }

  const topNavItem = navStructure.find(
    item => item.name === pageNavState.topLevel
  )
  
  if (pageNavState?.secondary === item.name) {

    // if (current === item.urlPath) {
      menuItemClasses = 'bg-main bg-opacity-20 text-main'
    } else {
      menuItemClasses = 'text-main-secondary'
    }

  const item
  const  menuItemClasses

  const ListItem = () => (
    <li className={``} key={index}>
      {
        item.onClick ? 
          ( <span onClick={item.onClick}>{item.title}</span>)
        : (
          <Link href={item.urlPath}>
            <a className={`${menuItemClasses} h-10 flex items-center hover:bg-black hover:bg-opacity-5 space-x-4 px-4 transition-colors duration-100 text-base`}>
              {item.title}
            </a>
          </Link>
        )
      }
    </li>
  )

  const showSecondaryNav = topNavItem?.subPages?.length > 0

  if(showSecondaryNav) {
    return (
      <Tippy
        className="bg-main text-white p-2 cursor-pointer w-60"
        interactive={true}
        hideOnClick={false}
        placement='top'
        theme="memberhub"
        // placement='right-start'
        // placement='right-end'
        // theme='light'
        content={
          <ul className="flex flex-col">
            <li onClick={() => {}}>Log out</li>
            <li onClick={() => {}}>{`${isAdminView ? 'User' : 'Admin'} View`}</li>
          </ul>
        }
      >
      </Tippy>
    )
  } else {

  return (
    <ListItem />
    // <li className={current === item.title ? styles.current : ''} key={index}>
  )
}

}
