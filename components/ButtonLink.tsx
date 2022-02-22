import Link from 'next/link'
import { forwardRef } from 'react'
import styles from './Button.module.scss'

interface ButtonLinkProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  href?: string
  style?: "primary" | "cancel"
  children: JSX.Element | string
}

const ButtonLink = ({href, children, style, onClick}: ButtonLinkProps) => {

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
        className={`${hoverEffectStyles} cursor-pointer flex items-center whitespace-nowrap nowrap 
        font-medium text-sm focus:bg-opacity-50 focus:outline-none active:bg-opacity-50 bg-${bgColor} text-${textColor} rounded-md px-8`}
      >
        {children}
      </a>
    </Link>
  )
}

export default ButtonLink