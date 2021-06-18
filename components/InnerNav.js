import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './InnerNav.module.scss'

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

export default function InnerNav() {

  
  const router = useRouter()

  const [current, setCurrent] = useState(router.pathname);

  return (
    <nav id="nav" className="px-6 sm:px-8 xl:px-16 border-b-2">
      <ul className={`flex space-x-12 ${styles.innerNav}`}>

        { items.map((item, index) => {


          return (  
            // <li className={current === item.title ? styles.current : ''} key={index}>
            <li className={`${(current === item.link) ? 'text-blue': 'text-blue-dark'} ${current === item.link && styles.current}`} key={index}>
              {
                item.onClick ? 
                  ( <span onClick={item.onClick}>{item.title}</span>)
                : (
                    <Link href={item.link} >
                      <a className={`h-16 font-bold pb-2 rounded-2xl flex items-center space-x-2 transition-colors duration-200 text-lg`} onClick={() => setCurrent(item.link)}>
                        <div className={`rounded-full w-6 h-6 flex items-center justify-center mr-2`}>
                          <FontAwesomeIcon className="h-5" icon={{prefix: 'fas', iconName: 'file-pdf'}} />
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
  )
} 