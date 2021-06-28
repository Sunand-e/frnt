import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import navStructureUser from '../navStructureUser'
import navStructureAdmin from '../navStructureAdmin'
import { NavContext } from '../navContext'


export default function PrimaryNav({navState, admin}) {

  const navStructure = admin ? navStructureAdmin : navStructureUser;

  const router = useRouter()

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
      menuItemClasses = 'bg-blue bg-opacity-20 text-blue'
    } else {
      menuItemClasses = 'text-blue-dark'
    }

  const item
  const  menuItemClasses
  return (  
    // <li className={current === item.title ? styles.current : ''} key={index}>
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
}