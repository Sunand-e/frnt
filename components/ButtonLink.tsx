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
    <a href={href} onClick={onClick} className={`${hoverEffectStyles} cursor-pointer flex items-center nowrap focus:bg-opacity-50 focus:outline-none active:bg-opacity-50 h-8 bg-${bgColor} text-${textColor} rounded-full font-base text-base px-8 whitespace-nowrap`}>{children}</a>
  )
}

export default ButtonLink