import Link from 'next/link'
import { forwardRef } from 'react'
import styles from './Button.module.scss'

interface ButtonLinkProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  href?: string
  style?: "primary" | "cancel"
  className?
  children: JSX.Element | string
}

const ButtonLink = ({href, children, style, className, onClick}: ButtonLinkProps) => {

  let bgColor = ''
  let textColor = ''
  let hoverEffectStyles = ''

  switch(style)  {
    case 'cancel': {
      // bgColor = 'gray-300'
      bgColor = 'gray-200'
      textColor = 'gray-800'
      // textColor = 'gray-100'
      hoverEffectStyles = styles.button_grey
      break
    }
    default: {
      bgColor = 'main'
      textColor = 'white'
      hoverEffectStyles = styles.button
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
        <div className={styles.button__bg}></div>
        <span>{children}</span>
      </a>
    </Link>
  )
}

export default ButtonLink