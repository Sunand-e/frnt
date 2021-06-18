import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const items = [
  {
    title: 'Dashboard',
    link: '/',
  },
  {
    title: 'Programmes',
    link: '/programmes'
  },
  {
    title: 'Library',
    link: '/library'
  },
  {
    title: 'Resources',
    link: '/resources'
  },
  {
    title: 'Upcoming Events',
    link: '/events'
  },
  {
    title: 'Community',
    link: '/forum'
  },
]

export default function Navigation() {

  
  const router = useRouter()

  const [current, setCurrent] = useState(router.pathname);

  return (
    <div
      id="sidebar"
      className="fixed z-40 inset-0 flex-none h-full bg-black bg-opacity-25 w-full lg:bg-white lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-80 xl:w-80 lg:block hidden"
    >
      <div 
        id="navWrapper"
        className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent overflow-hidden lg:top-18 bg-white mr-24 lg:mr-0"
      >
        <div
          className="hidden lg:block h-12 pointer-events-none absolute inset-x-0 z-10 bg-gradient-to-b from-white"
        >
        </div>
        <nav
          id="nav"
          className="px-5 overflow-y-auto font-medium text-base lg:text-sm py-10"
        >
          <ul>

            { items.map((item, index) => {
              let menuItemClasses, menuIconClasses 
              if (current === item.link) {
                menuItemClasses = 'bg-blue bg-opacity-20 text-blue'
                menuIconClasses = 'bg-blue text-white'
              } else {
                menuItemClasses = 'bg-white text-blue-dark'
                menuIconClasses = 'bg-blue bg-opacity-10'
              }

              return (  
                // <li className={current === item.title ? styles.current : ''} key={index}>
                <li className={``} key={index}>
                  {
                    item.onClick ? 
                      ( <span onClick={item.onClick}>{item.title}</span>)
                    : (
                        <Link href={item.link} >
                          <a className={`${menuItemClasses} h-16 mb-2 rounded-2xl flex items-center hover:bg-black hover:bg-opacity-5 space-x-4 px-3 transition-colors duration-200 text-lg`} onClick={() => setCurrent(item.link)}>
                            <div className={`${menuIconClasses} rounded-full w-12 h-12 flex items-center justify-center mr-3`}>
                              <FontAwesomeIcon className="h-7" icon={{prefix: 'fas', iconName: 'file-pdf'}} />
                            </div>
                            {item.title}
                          </a>
                        </Link>
                    )
                  }
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}