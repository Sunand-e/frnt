import { useState } from "react";
import {Film} from '@styled-icons/bootstrap/Film'
import {Speaker2} from '@styled-icons/fluentui-system-filled/Speaker2'
import {Document} from '@styled-icons/fluentui-system-filled/Document'
import {Image} from '@styled-icons/fluentui-system-filled/Image'
import Link from "next/link";

const MediaItem = ({file}) => {
console.log(file)
  const [imgSrc, setImgSrc] = useState('')

  let IconComponent;

  switch(file.mediaType) {
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
      <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-white focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-main overflow-hidden shadow">

        { file.mediaType === 'image'
          ? <img src={file.location} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
          : <Link href={file.location}><a className="aspect-w-10 aspect-h-7"><IconComponent className="text-main p-8  group-hover:opacity-75" /></a></Link>
        }
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {file.fileName}</span>
        </button>
      </div>
      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{file.fileName}</p>
      {/* <p className="block text-sm font-medium text-gray-500 pointer-events-none">{file.size}</p> */}
    </li>
  )
}

export default MediaItem