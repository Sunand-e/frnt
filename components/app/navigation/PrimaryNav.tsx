import Link from 'next/link'
import navStructureUser from '../../../navStructureUser'
import navStructureAdmin from '../../../navStructureAdmin'
import { forwardRef, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Tippy from '@tippyjs/react';
import { PrimaryNavItem } from './PrimaryNavItem';
import NavFooter from "./NavFooter";
import { TenantContext } from '../../../context/TenantContext';
import useUserHasCapability from '../../../hooks/users/useUserHasCapability';
import { useViewStore } from '../../../hooks/useViewStore';
import useTenantFeaturesEnabled from '../../../hooks/users/useTenantFeaturesEnabled';

const PrimaryNav = ({isSlim, pageNavState}) => {

  const ref = useRef(null)
  const tenant = useContext(TenantContext)
  const isAdminView = useViewStore(state => state.isAdminView)
  const { tenantFeaturesEnabled } = useTenantFeaturesEnabled()
  const { isSuperAdmin, userHasCapability, tenantLevelCapabilityArray } = useUserHasCapability()

  const navStructure = isAdminView ? navStructureAdmin : navStructureUser;
  const navItems = useMemo(() => {
    return navStructure.filter(item => {
      if(item.requireEnabledFeatures && !tenantFeaturesEnabled(item.requireEnabledFeatures)) {
        return false
      }
      
      if(!isSuperAdmin && item.capabilities?.length && !userHasCapability(item.capabilities)) {
        return false
      }

      return isSuperAdmin || !item.superAdminOnly

    })
  },[navStructure, tenant, isSuperAdmin, tenantLevelCapabilityArray])

  let logoImage;
  const defaultLogo = `${process.env.NEXT_PUBLIC_BASE_PATH}/images/elp-logo-notext-white.svg`
  logoImage = tenant?.logo_white ?? defaultLogo
  if(isSlim) {
    logoImage = tenant?.logo_square_white ?? logoImage
  }
  return (
    <div id="primaryNav" className={`transition-width ${isSlim ? 'w-16 slim-nav' : 'w-64'} flex flex-col h-full`}>
      <div ref={ref} className="sticky z-30 top-0 flex flex-col justify-between h-full overflow-auto">
        <div className={"prim-list-content"}>
          <div className={`h-18 ${isAdminView ? 'bg-main-secondary' : 'bg-main'} flex justify-center items-center px-2 py-4`}>
            <img 
              src={logoImage}
              className="w-auto max-h-full"
            />
          </div>

          <div
              id="navWrapper"
              // className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent overflow-hidden bg-white mr-24 lg:mr-0"
              className={`h-full ${isSlim ? 'overflow-x-hidden' : 'overflow-visible'} scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent bg-white`}
          >
            <nav
                id="nav"
                className="overflow-x-hidden"
            >
              <ul>

                { navItems.map((item, index) => {
                  let menuItemClasses, menuIconClasses
                  if (pageNavState?.topLevel === item.name) {

                    // if (current === item.urlPath) {
                    menuIconClasses = 'bg-main bg-opacity-20 text-main'
                    menuIconClasses = 'bg-main text-white border-white'
                  } else {
                    menuItemClasses = 'group bg-white text-main-secondary hover:bg-main hover:bg-opacity-10'
                    // menuIconClasses = 'group-hover:bg-white border-2 group-hover:border-main-secondary'
                    menuIconClasses = ''
                  }

                  const ThisWillWork = forwardRef((props, ref) => {
                    return <PrimaryNavItem {...props} innerRef={ref} />;
                  });

                  if(isSlim) {
                    return (
                        // <Tippy
                        //     key={index}
                        //     className="bg-main text-white p-2 cursor-pointer whitespace-nowrap"
                        //     interactive={true}
                        //     hideOnClick={false}
                        //     placement='right'
                        //     theme="memberhub"

                        //     // placement='right-start'
                        //     // placement='right-end'
                        //     // theme='light'
                        //     content = {item.title}
                        //     // content={
                        //     //   <>
                        //     //     <ul className="flex flex-col">
                        //     //       {
                        //     //         item.subPages?.map((item, index) => (
                        //     //           <li key={index} onClick={() => {}}>
                        //     //             <Link href={item.urlPath}>
                        //     //               {item.title}
                        //     //             </Link>
                        //     //           </li>
                        //     //         ))
                        //     //       }
                        //     //     </ul>
                        //     //   </>
                        //     // }
                        // >
                          <ThisWillWork key={index} item={item} index={index} iconClasses={menuIconClasses} itemClasses={menuItemClasses} />
                        // </Tippy>
                    )
                  } else {
                    return (
                        <PrimaryNavItem key={index} item={item} index={index} iconClasses={menuIconClasses} itemClasses={menuItemClasses} />
                        // <li className={current === item.title ? styles.current : ''} key={index}>
                    )
                  }
                })}
              </ul>
            </nav>
          </div>
        </div>
        <NavFooter isSlim={isSlim}/>
      </div>
    </div>
  )
}

export default PrimaryNav
