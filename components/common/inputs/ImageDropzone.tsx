import React, { useCallback, useEffect, useState } from "react";
import ImageSelect from "../../ContentEditor/ImageSelect";
import FileDropzone from "../../FileDropzone";
import DropzoneIconAndText from "./DropzoneIconAndText";

const ImageDropzone = ({
  multiple=true,
  onDrop,
}) => {

  const dropZoneContent = (
    <DropzoneIconAndText
      icon={(
        <svg
        className="mx-auto h-12 w-12 text-gray-400"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      )}
      fileHintText="PNG, JPG, GIF up to 10MB"
    />
  )

  const accept = [
    'image/jpeg',
    'image/pjpeg',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/gif',
  ]
  
  const handleDrop = (acceptedFiles, fileRejections, event) => {
    const file = acceptedFiles[0]
    const fileWithPreview = Object.assign(file, {
      preview: URL.createObjectURL(file)
    })
    setFile(fileWithPreview)
    onDrop(file, event)
  }

  const [file, setFile] = useState(null);

  const onImgLoad = useCallback(() => { 
    URL.revokeObjectURL(file.preview)
  },[file?.preview])
  
  useEffect(() => {
    // Make sure to revoke the data uri to avoid memory leaks, will run on unmount
    return () => {
      file && URL.revokeObjectURL(file.preview);
    }
  }, [file]);

  return (
    <FileDropzone
      multiple={multiple}
      onDrop={handleDrop}
      accept={accept}
      dropZoneContent={file ? (
        <ImageSelect
          src={file.preview}
          buttonText={'Change image'}
          onLoad={onImgLoad}
        />
      ) : dropZoneContent
      }
    /> 
  )
}

export default ImageDropzone