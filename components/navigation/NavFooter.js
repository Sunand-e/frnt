import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NavFooter({children, showSecondary}) {

  return (
    <div id="navFooter" className={`fixed bottom-0 overflow-x-hidden transition-width ${showSecondary ? 'w-16' : 'w-60'}`}>

    {children}

    <Link href='/'>
      <a 
      // href={item.urlPath} 
        className={`text-blue h-12 flex items-center px-4 transition-colors duration-100 text-base`}
      >
        <div className={`rounded-full flex-none w-8 h-8 flex items-center justify-center mr-4`}>
          <FontAwesomeIcon className="text-xl" icon={{prefix: 'fas', iconName: 'cog'}} />
        </div>
        <span className="mr-8">
          Settings
        </span>
      </a>
    </Link>
    </div>
  )
}