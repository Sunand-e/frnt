import { useState } from "react";
import {Film} from '@styled-icons/bootstrap/Film'
import {Speaker2} from '@styled-icons/fluentui-system-filled/Speaker2'
import {Document} from '@styled-icons/fluentui-system-filled/Document'
import {Image} from '@styled-icons/fluentui-system-filled/Image'
import Link from "next/link";
import MediaImageThumb from "./MediaImageThumb";

const MediaLibraryItem = ({item, onItemSelect=(e)=>null}) => {

  let IconComponent;

  switch(item.mediaType) {
    case 'video': {
      IconComponent = Film
      break
    }
    case 'audio': {
      IconComponent = Speaker2
      break
    }
    case 'document': {
      IconComponent = Document
      break
    }
    case 'image': {
      IconComponent = Image
      break
    }
  }

  return <>
    <div onClick={() => onItemSelect(item)} className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-white focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-main overflow-hidden shadow">
      { item.mediaType === 'image'
        ? <MediaImageThumb image={item} />
        : <Link href={item.location} className="aspect-w-10 aspect-h-7"><IconComponent className="text-main p-8  group-hover:opacity-75" /></Link>
      }
      <button type="button" className="absolute inset-0 focus:outline-none">
        <span className="sr-only">View details for {item.fileName}</span>
      </button>
    </div>
    <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{item.fileName}</p>
  </>;
}

export default MediaLibraryItem