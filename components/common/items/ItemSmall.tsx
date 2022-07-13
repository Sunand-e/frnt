import Link from "next/link";
import contentTypes from "../../../contentTypes";

export default function ItemSmall({ item, options, className }) {

  const imageSrc = item.featuredImage ? item.featuredImage.node.sourceUrl : process.env.NEXT_PUBLIC_BASE_PATH || '' + '/images/placeholder-image.png';

  const itemType = contentTypes.find(type => {
    return item.__typename === type.name.replace(' ', '');
  });

  // const href = item.href ?? typeObj.urlPath + '/' + item.slug;
  const href = item.href ?? `/${itemType.slug}?id=${item.slug}`

  return (
    <Link href={href}>
      <a>
        <div className={`flex items-center justify-start flex-nowrap rounded-2xl shadow-xl overflow-hidden bg-white ${className}`}>
          <img src={imageSrc} className="w-1/4 mr-4" />
          <div className="flex-1 flex-col justify-between">
            <h2 className="flex-1 text-xl text-main-secondary font-semibold">{item.title}</h2>
            { options?.showExcerpt && item?.excerpt && <p className="flex-1">{item.excerpt}</p>}
          </div>
        </div>
      </a>
    </Link>
  )
}
