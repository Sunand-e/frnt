import { useState } from "react";
import {Film} from '@styled-icons/bootstrap/Film'
import {Speaker2} from '@styled-icons/fluentui-system-filled/Speaker2'
import {Document} from '@styled-icons/fluentui-system-filled/Document'
import {Image} from '@styled-icons/fluentui-system-filled/Image'
import Link from "next/link";
import MediaImageThumb from "./MediaImageThumb";

const MediaItem = ({item, onItemSelect}) => {

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
  // var reader = new FileReader();
  // var url = reader.readAsDataURL(file);

  // reader.onloadend = function (e) {
  //   console.log(reader.result)
  //   setImgSrc(reader.result);
  // }

  return (
    <li className="relative">
      <span className="p-2 break-all">
        { JSON.stringify(item.id,null,2) }
      </span>
      <div onClick={() => onItemSelect(item)} className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-white focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-main overflow-hidden shadow">
        { item.mediaType === 'image'
          ? <MediaImageThumb item={item} />
          : <Link href={item.location}><a className="aspect-w-10 aspect-h-7"><IconComponent className="text-main p-8  group-hover:opacity-75" /></a></Link>
        }
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {item.fileName}</span>
        </button>
      </div>
      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{item.fileName}</p>
      {/* <p className="block text-sm font-medium text-gray-500 pointer-events-none">{file.size}</p> */}
    </li>
  )
}

export default MediaItem