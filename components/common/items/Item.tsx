import Link from "next/link";
import ButtonLink from "../../ButtonLink";
import LoadingSpinner from "../../LoadingSpinner";
import { resourceTypes } from "../../resources/resourceTypes";
import ProgressBar from "../ProgressBar";
import styles from './Item.module.scss'

import { InformationCircle } from '@styled-icons/heroicons-solid/InformationCircle'
import Tippy from "@tippyjs/react";
export default function Item({ item, options }) {

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

  const itemInfoContent = options?.getInfoContent?.(item)

  let itemImage;
  let linkPaddingBottom = '';
  if(item.itemType === 'library_item' && item.contentType !== 'image') {
    const IconComponent = resourceTypes[item.contentType].icon
    itemImage = (
      <div className="w-full justify-center text-center">
        <IconComponent className = "w-1/2 text-main" />
      </div>
    )
  } else {
    linkPaddingBottom = 'pb-1/2'
    itemImage = (
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
    )    
  }
  return (
    <div className="h-full content-item rounded-2xl flex flex-col overflow-hidden shadow-lg bg-white relative">
      <Link href={href}>
        <a
          className={`bg-cover bg-center ${linkPaddingBottom} ${styles.cardImg}`}
        >
          {itemImage}
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
      <div className="p-4 pt-4 grow flex flex-col">
        {/* <h2 className="text-lg text-main-secondary mb-2 border-blue border-2 bg-white top-5 font-bold p-1 px-5"> */}
        <div className="flex space-x-2 items-start justify-between">
          <h2 className="text-xl text-main-secondary font-semibold mb-2 flex justify-between w-full">
            {itemTitle}
            {itemInfoContent && (
              <Tippy
                interactive={true}
                className={`text-white px-4 py-2 z-50`}
                theme="memberhub-white"
                arrow={true}
                trigger="click"
                content={(
                  <div dangerouslySetInnerHTML={{__html: itemInfoContent}} />
                )}
              >
                <InformationCircle className="text-secondary w-8" />
              </Tippy>
            )}
          </h2>
          { item.tags?.[0] && <img src={item.tags[0].image?.location} className="mt-1 h-12 rounded-full" /> }
        </div>
        { options?.showType && (
          <h2 className="text-lg text-white mb-4 top-5 font-bold">
            <span className="bg-main py-1 px-2">
              {item.contentType}
            </span>
          </h2>
        )}
        { !!item?.tags?.length && (
          <h2 className="text-lg text-main mb-2 top-5 font-normal text-sm">
            <span className="bg-main-superlight">
              { item.tags.map((tag, index) => {
                return (
                  <div key={index} className="flex space-x-2 items-center">
                    {/* <img src={tag.image.location} className="h-8 rounded-full" /> */}
                    <span>
                      {tag.label}
                    </span>
                  </div>
                )
              }) }
            </span>
          </h2>
        )}
        {/* { item.status && (
          <h2 className="text-lg text-main mb-2 top-5 font-bold">
            {item.status}
          </h2>
        )} */}
        { item?.score !== null && item?.score !== undefined && (
          <span className="mb-2">
            <ProgressBar value={item.score} />
          </span>
        )}
        {/* <div dangerouslySetInnerHTML={{
          __html: item.excerpt
        }}></div> */}
        <ButtonLink className="uppercase mt-auto" href={href}>
          <span className="w-full text-center">
            {buttonText}
          </span>
        </ButtonLink>

      </div>
    </div>
  )

}
