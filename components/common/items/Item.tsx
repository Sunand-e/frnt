import Link from "next/link";
import ButtonLink from "../../common/ButtonLink";
import { resourceTypes } from "../../resources/resourceTypes";
import ProgressBar from "../ProgressBar";
import styles from './Item.module.scss'

import { InformationCircle } from '@styled-icons/heroicons-solid/InformationCircle'
import Tippy from "@tippyjs/react";
import useGetThumbnail from "./useGetThumbnail";

export default function Item({ item, options }) {


  const { src } = useGetThumbnail(item)
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
  if(item.itemType === 'resource' && !src) {

    const IconComponent = resourceTypes[item.contentType].icon
    itemImage = (
      <div 
        className="w-full justify-center text-center"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          // backgroundColor: 'rgba(0,0,0,0.1)',
          objectFit: 'cover'
        }}
      >
        <IconComponent className = "w-1/2 text-main  p-6" />
      </div>
    )
  } else {
    itemImage = (
      <img
        className={'bg-main/20'}
        src={src || ( process.env.NEXT_PUBLIC_BASE_PATH || '' ) + '/images/placeholder-image.png'}
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
      <Link
        href={href}
        className={`bg-cover bg-center pb-1/2 ${styles.cardImg}`}>

        {itemImage}
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
          {/* <img src={item.tags[0].image?.location} className="mt-1 h-12 rounded-full" /> */}
          {/* { item.tags?.[0]?.image?.id && (
            <div className={`h-12 w-12 flex justify-center items-center shrink-0 overflow-hidden rounded-full`}>
              <img 
                className={`h-12 w-12 object-cover`} 
                src={`/uploaded_images/${item.tags[0].image?.id}?w=50`}
                alt=""
              />
            </div>
          )} */}
        </div>
        { options?.showType && (
          <h2 className="text-lg text-white mb-4 top-5 font-bold">
            <span className="bg-main py-1 px-2">
              {item.contentType}
            </span>
          </h2>
        )}
        { !!item?.tags?.length && (
          <h2 className="text-main mb-2 top-5 font-normal text-sm">
            <span className="bg-main-superlight">
              { item.tags.edges.map(({node}, index) => {
                return (
                  <div key={index} className="flex space-x-2 items-center">
                    {/* <img src={tag.image.location} className="h-8 rounded-full" /> */}
                    <span>
                      {node.label}
                    </span>
                  </div>
                )
              }) }
            </span>
          </h2>
        )}
        <div className="mt-auto w-full">
          { item?.score !== null && item?.score !== undefined && (
            <span className="mb-2 mt-2">
              <ProgressBar value={item.score} />
            </span>
          )}
          <ButtonLink className="uppercase w-full mt-2" href={href}>
            <span className="w-full text-center">
              {buttonText}
            </span>
          </ButtonLink>
        </div>
      </div>
    </div>
  );

}
