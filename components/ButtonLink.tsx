import Link from 'next/link'
import { forwardRef } from 'react'
import styles from './Button.module.scss'

interface ButtonLinkProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  href?
  style?: "primary" | "cancel"
  className?
  displayType?: string
  children: JSX.Element | string
}

const ButtonLink = ({href, displayType="normal", children, style, className, onClick}: ButtonLinkProps) => {

  let bgColor = ''
  let textColor = ''
  let hoverEffectStyles = ''

  let bgColorClass
  switch(displayType) {
    case 'cancel': {
      bgColorClass = 'bg-gray-800 group-hover:bg-gray-700 transition-colors duration-1000'
      break;
    }
    case 'alert': {
      bgColorClass = 'bg-red-800 group-hover:bg-red-700 transition-colors duration-1000'
      break;
    }
    default: {
      bgColorClass = 'bg-main group-hover:bg-opacity-80 transition-colors duration-1000'
      textColor = 'white'
      hoverEffectStyles = styles.button
      break;
    }
  }
  switch(style)  {
    case 'cancel': {
      // bgColor = 'gray-300'
      bgColor = 'gray-200'
      textColor = 'gray-800'
      // textColor = 'gray-100'
      hoverEffectStyles = styles.button_grey
      break
    }


  }

  return (
    <Link href={href}>
      <a 
        onClick={onClick} 
        className={`
        ${className}
        ${styles.button}
        ${styles.button_bestia}
        min-w-16 py-2 px-8
        whitespace-nowrap nowrap
        border border-transparent rounded-md
        text-sm
        bg-main text-white
        focus:bg-opacity-50 focus:outline-none 
        active:bg-opacity-50 
      `}
      >
      <div className={`${styles.button__bg} ${bgColorClass}`}></div>
        <span className={styles.button__span}>{children}</span>
      </a>
    </Link>
  )
}

export default ButtonLink