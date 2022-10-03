import Link from 'next/link'
import navStructureUser from '../../navStructureUser'
import navStructureAdmin from '../../navStructureAdmin'
import { forwardRef, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Tippy from '@tippyjs/react';
import { viewVar } from '../../graphql/cache';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { PrimaryNavItem } from './PrimaryNavItem';
import { useWindowSize } from 'rooks';
import NavFooter from "./NavFooter";
import { TenantContext } from '../../context/TenantContext';
import useUserHasCapability from '../../hooks/users/useUserHasCapability';

const PrimaryNav = ({isSlim, pageNavState}) => {

  /*
    If we need to use js to change the positioning of
    the 'Settings' menu item, we can use the following code, to set a boolean,
    'showSettingsAtBottomOfScreen'.
  */
  const { innerHeight } = useWindowSize();

  const ref = useRef(null)

  // const [showSettingsAtBottomOfScreen, setShowSettingsAtBottomOfScreen] = useState(true);

  useEffect(() => {
    console.log('innerHeight')
    console.log(innerHeight)
    console.log('ref?.current')
    console.log(ref?.current.clientHeight)
    // do the calculation here
    // if(innerHeight < ref?.current.clientHeight) {
    //   setShowSettingsAtBottomOfScreen(false)
    // } else {
    //   setShowSettingsAtBottomOfScreen(true)
    // }

  },[innerHeight])
  /*
   This is the end of the 'optional' code block
  */

  const view = useReactiveVar(viewVar);

  const { userType } = useUserHasCapability()

  const [ isSuperAdmin, setIsSuperAdmin ] = useState(false)

  const tenant = useContext(TenantContext)

  useEffect(() => {
    if(userType) {
      setIsSuperAdmin(userType === 'SuperAdmin')
    }
  },[userType])

  const navStructure = view.isAdmin ? navStructureAdmin : navStructureUser;
  
  const navItems = useMemo(() => {
    return isSuperAdmin ? navStructure : navStructure.filter(item => {
      return !item.superAdminOnly
      // return !item.superAdminOnly && (userHasCapability(item.capabilities)
    })
  })

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
          <div className={`h-18 ${view.isAdmin ? 'bg-main-secondary' : 'bg-main'} flex justify-center items-center px-2 py-4`}>
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
                        <Tippy
                            key={index}
                            className="bg-main text-white p-2 cursor-pointer whitespace-nowrap"
                            interactive={true}
                            hideOnClick={false}
                            placement='right'
                            theme="memberhub"

                            // placement='right-start'
                            // placement='right-end'
                            // theme='light'
                            content = {item.title}
                            // content={
                            //   <>
                            //     <ul className="flex flex-col">
                            //       {
                            //         item.subPages?.map((item, index) => (
                            //           <li key={index} onClick={() => {}}>
                            //             <Link href={item.urlPath}>
                            //               {item.title}
                            //             </Link>
                            //           </li>
                            //         ))
                            //       }
                            //     </ul>
                            //   </>
                            // }
                        >
                          <ThisWillWork item={item} index={index} iconClasses={menuIconClasses} itemClasses={menuItemClasses} />
                        </Tippy>
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
