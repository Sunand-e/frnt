import { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import DocumentItem from "../ContentEditor/blocks/DocumentBlock/DocumentItem";
import VideoItem from "./display/VideoItem";
import ImageItem from "./display/ImageItem";
import AudioPlayer from "../common/audio/AudioPlayer";

const ResourcePreview = ({control, onRemove}) => {

  const { field } = useController({
    control,
    name: 'resourceValue'
  });

  const { field: typeField } = useController({
    control,
    name: 'type'
  });

  switch(typeField.value?.name) {
    case 'document':
      return <DocumentItem pdfPreview={true} file={field.value} onRemove={onRemove} />
    case 'video':
      return <VideoItem url={field.value} onRemove={onRemove} />
      case 'image':
      return <ImageItem image={field.value} onRemove={onRemove} />
      case 'audio':
      return <AudioPlayer url={field.value?.location} onClose={onRemove} />
    case 'link':
    default:
      return <>Something went wrong. Please go back and try again.</>
  }
}

export default ResourcePreview