import { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import DocumentItem from "../ContentEditor/blocks/DocumentBlock/DocumentItem";

const ResourcePreview = ({type, control, onRemove}) => {

  const { field } = useController({
    control,
    name: 'resource'
  });

  switch(type) {
    case 'document':
      return <DocumentItem file={field.value} onRemove={onRemove} />
    case 'video':
    case 'image':
    case 'audio':
    case 'link':
    default:
      return <>Something went wrong. Please go back and try again.</>
  }
}

export default ResourcePreview