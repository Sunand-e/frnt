import Link from "next/link"

const ItemWithImageTableCell = ({title, placeholder=null, secondary=null, image=null, href=null}) => {
  return (
    <Link href={href ?? '#'}>
    <a className="text-blue-dark">
      <div className="flex items-center max-w-xs wra">
        <div className="h-10 w-10 flex-shrink-0">
          <img className="h-10 w-10 rounded-full" src={image ?? placeholder ?? '/images/item-placeholder.jpg'} alt="" />
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