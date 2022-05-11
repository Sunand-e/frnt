import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SecondaryNav({showSecondary, topNavItem, pageNavState}) {

  return (
    <div id="secondaryNav" className={`bg-main bg-opacity-20 transition-width ${showSecondary ? 'w-56' : 'w-0'}`}>
      <div className={`sticky z-20 top-0 flex flex-col relative`}>
        { showSecondary && (
          <h3 className="h-18 px-4 bg-main bg-opacity-50 text-white flex items-center text-base">
            {topNavItem.title}
          </h3>
        )}
        { showSecondary && 
          <ul>
            { topNavItem.subPages.map((item, index) => {
              let menuItemClasses
              if (pageNavState?.secondary === item.name) {

              // if (current === item.urlPath) {
                menuItemClasses = 'bg-blue bg-opacity-20 text-blue'
              } else {
                menuItemClasses = 'text-blue-dark'
              }
              const IconComponent = item.icon
              return (  
                // <li className={current === item.title ? styles.current : ''} key={index}>
                <li className={`${menuItemClasses} flex text-main-dark px-4 space-x-2 transition-colors duration-200 hover:bg-black hover:bg-opacity-5`} key={index}>
                  { IconComponent && <IconComponent width="24" /> }
                  <Link href={item.urlPath}>
                    <a className={`h-10 flex items-center  text-base`}>
                      {item.title}
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        }
      </div>
    </div>
  )
}