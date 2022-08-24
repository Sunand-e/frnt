import Link from "next/link"

const ItemWithImageTableCell = ({rounded='full', title, placeholder=null, secondary=null, image=null, icon=null, href=null}) => {

  let roundedClass
  switch(rounded) {
    case 'none':
      roundedClass = ''
      break
    case 'md':
      roundedClass = 'rounded-md'
      break
    case 'full':
    default:
      roundedClass = 'rounded-full'
      break

  }
  return (
    <Link href={href ?? '#'}>
    <a className="text-main-secondary">
      <div className="flex items-center max-w-xs">
        <div className={`h-10 w-10 shrink-0  ${roundedClass}`}>
          { image ? (
            <img className={`h-full w-auto`} src={image} alt="" />
          ) : (
            <>
              {icon ?? (
                <img className={`h-full w-auto`} src={placeholder ?? '/images/placeholder-image.png'} alt="" />
              )}
            </>
          )}
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-900">{title}</div>
          { secondary && <div className="text-gray-500">{secondary}</div> }
        </div>
      </div>
    </a>
  </Link>
  )
}

export default ItemWithImageTableCell
