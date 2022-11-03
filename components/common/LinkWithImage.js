import Link from 'next/link'

export default function LinkWithImage({image, href, children, theme}) {
  const boxedClasses = `p-4 bg-main-semitransparent border-main border-2 text-main transform transition-transform hover:scale-105 hover:text-main-secondary hover:border-main-secondary`
  return (
    (<Link
      href={href}
      className={`flex items-center transform ${theme === 'boxed' && boxedClasses}`}>

      <FontAwesomeIcon className="h-6" icon={icon} />
      <div className="px-4 flex-1 text-main-secondary">{children}</div>

    </Link>)
  );
}
