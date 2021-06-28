import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PrimaryNav({showSecondary, navStructure, pageNavState}) {

  const itemClasses = ''
  return (
    <div id="primaryNav" className={`transition-width ${showSecondary ? 'w-16' : 'w-64'}`}>
      <div className="sticky top-0">
        <div className="h-18 bg-main flex justify-center py-4">
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/elp-logo-notext-white.svg`} className="w-auto"/>
          {/* {showSecondary ? 'secondary active' : 'secondary INACTIVE'} */}
        </div>

        <div 
          id="navWrapper"
          className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent overflow-hidden bg-white mr-24 lg:mr-0"
        >
          <nav
            id="nav"
            className="overflow-x-hidden"
          >
            <ul>

              { navStructure.map((item, index) => {
                let menuItemClasses, menuIconClasses
                if (pageNavState?.topLevel === item.name) {

                // if (current === item.urlPath) {
                  menuItemClasses = 'bg-blue bg-opacity-20 text-blue'
                  menuIconClasses = 'bg-blue text-white border-white'
                } else {
                  menuItemClasses = 'group bg-white text-blue-dark hover:bg-blue hover:bg-opacity-10'
                  // menuIconClasses = 'group-hover:bg-white border-2 group-hover:border-blue-dark'
                  menuIconClasses = ''
                }

                return (
                  // <li className={current === item.title ? styles.current : ''} key={index}>
                  <li className={``} key={index}>
                    {
                      item.onClick ? 
                        ( <span onClick={item.onClick}>{item.title}</span>)
                      : (
                        <Link href={item.urlPath}>
                          <a 
                          // href={item.urlPath} 
                            className={`${menuItemClasses} h-12 flex items-center px-4 transition-colors duration-100 text-base`}
                          >
                            <div className={`${menuIconClasses} rounded-full flex-none w-8 h-8 flex items-center justify-center mr-4`}>
                              <FontAwesomeIcon className="text-xl" icon={{prefix: 'fas', iconName: 'file-pdf'}} />
                            </div>
                            <span className="mr-8">
                              {item.title}
                            </span>
                            <FontAwesomeIcon className="ml-auto h-4" icon={{prefix: 'fas', iconName: 'chevron-right'}} />
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
    </div>
  )
}