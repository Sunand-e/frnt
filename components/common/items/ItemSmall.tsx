import Link from "next/link";

export default function ItemSmall({ item, options=null, className='' }) {

  const imageSrc = item.featuredImage ? item.featuredImage.node.sourceUrl : process.env.NEXT_PUBLIC_BASE_PATH || '' + '/images/placeholder-image.png';

  // const href = item.href ?? typeObj.urlPath + '/' + item.slug;
  const href = item.href ?? ''

  return (
    (<Link href={href}>

      <div className={`flex items-center justify-start flex-nowrap rounded-2xl shadow-xl overflow-hidden bg-white ${className}`}>
        <img src={imageSrc} className="w-1/4 mr-4" />
        <div className="flex-1 flex-col justify-between">
          <h2 className="flex-1 text-xl text-main-secondary font-semibold">{item.title}</h2>
          { options?.showExcerpt && item?.excerpt && <p className="flex-1">{item.excerpt}</p>}
        </div>
      </div>

    </Link>)
  );
}
