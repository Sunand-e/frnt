import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ContentNav({show, topNavItem, pageNavState}) {

  return (
    <div id="contentNav" className={`bg-main bg-opacity-20 transition-width ${show ? 'w-56' : 'w-0'}`}>
      <div className={`sticky z-20 top-0 flex flex-col relative`}>
        { show && (
          <h3 className="h-18 px-4 bg-main bg-opacity-50 text-white flex items-center text-base">
            {topNavItem.title}
          </h3>
        )}
        { show && 
          <ul>
            { topNavItem.subPages.map((item, index) => {
              let menuItemClasses
              if (pageNavState?.secondary === item.name) {

              // if (current === item.urlPath) {
                menuItemClasses = 'bg-blue bg-opacity-20 text-blue'
              } else {
                menuItemClasses = 'text-blue-dark'
              }

              return (  
                // <li className={current === item.title ? styles.current : ''} key={index}>
                <li className={``} key={index}>
                  {
                    item.onClick ? 
                      ( <span onClick={item.onClick}>{item.title}</span>)
                    : (
                      <Link href={item.urlPath}>
                        <a className={`${menuItemClasses} h-10 flex items-center hover:bg-black hover:bg-opacity-5 space-x-4 px-4 transition-colors duration-200 text-base`}>
                          {item.title}
                        </a>
                      </Link>
                    )
                  }
                </li>
              )
            })}
          </ul>
        }
      </div>
    </div>
  )
}