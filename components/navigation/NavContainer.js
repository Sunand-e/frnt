import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import navStructureUser from '../../navStructureUser'
import navStructureAdmin from '../../navStructureAdmin'
import NavFooter from './NavFooter'
import PrimaryNav from './PrimaryNav'
import SecondaryNav from './SecondaryNav'
import { viewVar } from '../../graphql/cache'
import { useReactiveVar } from '@apollo/client'

export default function NavContainer({navState}) {

  const view = useReactiveVar(viewVar)
  const navStructure = view.isAdmin ? navStructureAdmin : navStructureUser;

  // If the 'topLevel' property of navState is empty, create the default navstate.
  const pageNavState = navState?.topLevel ? navState : {
    topLevel: 'dashboard',
    secondary: 'dashboard'
  }

  const topNavItem = navStructure.find(
    item => item.name === pageNavState.topLevel
  )

  const showSecondary = topNavItem?.subPages?.length > 0

  return (
    <div
      id="sidebar"
      className={`
        shadow-md
        font-text-base
        bg-red
        relative
        z-40
        inset-0
        flex-none
        flex
        h-18
        bg-opacity-25
        lg:bg-white
        lg:static
        lg:h-auto
        lg:overflow-y-visible
        lg:pt-0
      `}
    >
      <PrimaryNav showSecondary={showSecondary} navStructure={navStructure} pageNavState={pageNavState} />
      <SecondaryNav showSecondary={showSecondary} topNavItem={topNavItem} pageNavState={pageNavState} />
      <NavFooter showSecondary={showSecondary} />
    </div>
  )
}