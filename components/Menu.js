import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Menu.module.scss'
export default function Menu({items, className}) {

  const router = useRouter()

  const [current, setCurrent] = useState(router.pathname);

  return (
    <ul className={`${className} ${styles.menu}`}>

      { items.map((item, index) => {

        let menuItemClass = '';

        if (current === item.link) {
          menuItemClass = styles.current
        }

        return (  
          // <li className={current === item.title ? styles.current : ''} key={index}>
          <li className={menuItemClass} key={index}>
            {
              item.onClick ? 
                ( <span onClick={item.onClick}>{item.title}</span>)
              : (
                  <Link href={item.link} >
                    <a onClick={() => setCurrent(item.link)}>{item.title}</a>
                  </Link>
              )
            }
          </li>
        )
        
      })}

    </ul>
  )
}