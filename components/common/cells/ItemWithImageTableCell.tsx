import Link from "next/link"

const roundedMap = new Map([
  ['none', 'rounded-none'],
  ['md', 'rounded-md'],
  ['full', 'rounded-full'],
]);

const objectFitMap = new Map([
  ['fill', 'object-fill'],
  ['cover', 'object-cover'],
  ['contain', 'object-contain'],
]);

const ItemWithImageTableCell = ({
  rounded='full', 
  imgDivClass='', 
  title, 
  objectFit='cover', 
  placeholder=null, 
  secondary=null, 
  image=null, 
  imageSrc=null, 
  icon=null, 
  href=null
}) => {

  return (
    <Link href={href ?? '#'}>
    <a className="text-main-secondary">
      <div className="flex items-center max-w-xs">
        <div className={`h-10 w-10 flex justify-center items-center shrink-0 overflow-hidden ${imgDivClass} ${roundedMap.get(rounded)}`}>
          { image || imageSrc ? (
            <img 
              className={`h-10 w-10 ${objectFitMap.get(objectFit)}`} 
              src={imageSrc || `/uploaded_images/${image?.id}?w=50`}
              alt=""
            />
          ) : (
            <>
              {icon ?? (
                <img 
                  className={`h-10 w-10 ${objectFitMap.get(objectFit)}`} 
                  src={placeholder ?? '/images/placeholder-image.png'} 
                  alt=""
                 />
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
