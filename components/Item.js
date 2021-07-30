import Link from "next/link";
import contentTypes from "../contentTypes";
import styles from './Item.module.scss'
function ItemTags({ tags }) {
  return (
    <div className="flex">

      <span>Tags:</span>
      {
        tags.map(tag => {
          return (
            <a href="#" className="text-blue-dark font-semibold">{tag.name}</a>
          )}
        )
      }
    </div>
  )
}

export default function Item({ item, options }) {

  const itemType = contentTypes.find(type => {
    return item.__typename === type.name.replace(' ', '');
  });

  const imageSrc = item.featuredImage ? item.featuredImage.node.sourceUrl : process.env.NEXT_PUBLIC_BASE_PATH || '' + '/images/item-placeholder.jpg';
  const buttonText = item.buttonText || 'Read more';
  // const href = item.href ?? itemType.urlPath + '/' + item.slug;
  const href = item.href ?? `/${itemType?.slug}?id=${item?.slug}`

  return (
    <div className="content-item rounded-2xl flex flex-col overflow-hidden shadow-xl bg-white relative mb-8">
      <Link href={href}>
        <a
          className={`bg-cover bg-center pb-1/2 ${styles.cardImg}`}
        >
          <img
            src={imageSrc}
            style={{
              backgroundImage: `url(${imageSrc})`,
              width: '100%',
              height: '100%',
              position: 'absolute',
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

        { options?.showType && (
          <h2 className="text-lg text-blue mb-2 top-5 font-bold">
            {itemType?.name}
          </h2>
        )}

        <h2 className="text-xl text-blue-dark font-semibold mb-4">{item?.title}</h2>
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
