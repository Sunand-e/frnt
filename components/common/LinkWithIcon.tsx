import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { MouseEventHandler } from 'react'

interface LinkWithIconProps {
  icon
  href: string
  children: JSX.Element | string
  theme?: 'boxed'
  onClick?: MouseEventHandler
}

export default function LinkWithIcon({icon, href, children, theme, onClick}: LinkWithIconProps) {
  const boxedClasses = `p-4 bg-main-semitransparent border-main border-2 text-main transform transition-transform hover:scale-105 hover:text-main-secondary hover:border-main-secondary`
  return (
      // <Link href={href} >
      // <Link href={href} >
        <a onClick={onClick} href={href ?? '#'} className={`flex text-main-secondary hover:text-main cursor-pointer items-center mb-2 transform ${theme === 'boxed' && boxedClasses}`}>
          <FontAwesomeIcon className="h-6" icon={icon} />
          <div className="px-4 flex-1">{children}</div>
        </a>
      // </Link>
  )
}
