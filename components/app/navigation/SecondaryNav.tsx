import { useContext, useMemo } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TenantContext } from '../../../context/TenantContext'
import useUserHasCapability from '../../../hooks/users/useUserHasCapability'
import { useViewStore } from '../../../hooks/useViewStore'

export default function SecondaryNav({showSecondary, primaryNavItem, pageNavState}) {

  const { isSuperAdmin, userHasCapability } = useUserHasCapability()

  const tenant = useContext(TenantContext)

  const navItems = useMemo(() => {
    return primaryNavItem?.subPages?.filter(item => { 
      
      if(item.requireEnabledFeatures) {
        for(let feature of item.requireEnabledFeatures) {
          if(!tenant || !tenant?.[feature]?.enabled) {
            return false
          }
        }
      }
      if(item.removeIfFeaturesDisabled) {
        for(let feature of item.removeIfFeaturesDisabled) {
          if(!tenant || tenant?.[feature]?.enabled === false) {
            return false
          }
        }
      }

      if(!isSuperAdmin && item.capabilities?.length && !userHasCapability(item.capabilities)) {
        return false
      }

      return isSuperAdmin || !item.superAdminOnly
    }) || []
    
  },[primaryNavItem, tenant, isSuperAdmin, userHasCapability])

  return (
    <div id="secondaryNav" className={`z-10 bg-main bg-opacity-10 transition-width ${showSecondary ? 'w-56' : 'w-0'}`}>
      <div className={`sticky z-20 top-0 flex flex-col relative`}>
        { showSecondary && (
          <h3 className="h-18 px-4 bg-main bg-opacity-70 text-white flex items-center text-white">
            {primaryNavItem.title}
          </h3>
        )}
        { showSecondary && 
          <ul>
            { navItems.map((item, index) => {
              let menuItemClasses
              if (pageNavState?.secondary === item.name) {

              // if (current === item.urlPath) {
                menuItemClasses = 'bg-main bg-opacity-20 font-bold'
              } else {
                menuItemClasses = ''
              }
              const IconComponent = item.icon
              return (
                // <li className={current === item.title ? styles.current : ''} key={index}>
                <li className={`text-main-secondary hover:text-main  ${menuItemClasses}`} key={index}>
                  <Link
                    href={item.urlPath}
                    className='h-10 flex items-center flex px-4 space-x-2 transition-colors duration-200 hover:bg-black hover:bg-opacity-5'>

                    { IconComponent && <IconComponent width="24" /> }
                    <span>{item.title}</span>

                  </Link>
                </li>
              );
            })}
          </ul>
        }
      </div>
    </div>
  );
}
