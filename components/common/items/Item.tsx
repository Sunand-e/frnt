import Link from "next/link";
import contentTypes from "../../../contentTypes";
import styles from './Item.module.scss'

function ItemTags({ tags }) {
  return (
    <div className="flex">

      <span>Tags:</span>
      {
        tags.map(tag => {
          return (
            <a href="#" className="text-blue-dark font-semibold">{tag.label}</a>
          )}
        )
      }
    </div>
  )
}

export default function Item({ item, options }) {

  const itemType = contentTypes.find(type => {
    return item.itemType === type.slug
  });
  const imageSrc = item.image?.location || ( process.env.NEXT_PUBLIC_BASE_PATH || '' ) + '/images/placeholder-image.png';
  const buttonText = options?.getReadMoreLabel?.(item) || item.buttonText || 'Read more';
  // const href = item.href ?? itemType.urlPath + '/' + item.slug;

  const href = options?.getHref?.(item) ?? item.href ?? `/${item.itemType}?id=${item.id}`

  let title
  switch(item.__typename) {
    case 'Tag':
      title = item.label
      break;
    default:
      title = item.title
      break;
  }

  const itemTitle = options?.getItemTitle?.(item) || title

  return (
    <div className="content-item rounded-2xl flex flex-col overflow-hidden shadow-lg bg-white relative mb-8">
      <Link href={href}>
        <a
          className={`bg-cover bg-center pb-1/2 ${styles.cardImg}`}
        >
          <img
            src={imageSrc}
            className={'bg-main/20'}
            style={{
              // backgroundImage: `url(${imageSrc})`,
              width: '100%',
              height: '100%',
              position: 'absolute',
              // backgroundColor: 'rgba(0,0,0,0.1)',
              objectFit: 'cover'
            }}
          />
          {/* <div className={styles.cardImg}>
            <a
              className="bg-cover bg-center pb-1/2"
              style={{
                backgroundImage: `url(${imageSrc})`
              }}
            />
          </div> */}
        </a>
      </Link>
      <div className="p-6 pt-4 flex-grow flex flex-col">
        {/* <h2 className="text-lg text-blue-dark mb-2 border-blue border-2 bg-white top-5 font-bold p-1 px-5"> */}
        <h2 className="text-xl text-blue-dark font-semibold mb-2">{itemTitle}</h2>
        { options?.showType && (
          <h2 className="text-lg text-white mb-4 top-5 font-bold">
            <span className="bg-main py-1 px-2">
              {item.contentType}
            </span>
          </h2>
        )}

        { item.status && (
          <h2 className="text-lg te6xt-blue mb-2 top-5 font-bold">
            {item.status}r
          </h2>
        )}
        { item.tags && (
          <h2 className="text-lg text-blue mb-2 top-5 font-bold">
            { item.tags && (
              <span className="bg-main-superlight">
                { item.tags.map(tag => tag.label).join(', ') }
              </span>
            )}
          </h2>
        )}
        {/* { item.contentTagss && <ItemTags tags={item.contentTagss.nodes} /> } */}
        {/* <div dangerouslySetInnerHTML={{
          __html: item.excerpt
        }}></div> */}
        <Link href={href}>
        {/* <Link href={itemType.urlPath + '/' + item.slug}> */}
          <a className="mt-auto bg-blue text-center p-2 text-white uppercase">{buttonText}</a>
        </Link>
      </div>
    </div>
  )

}
