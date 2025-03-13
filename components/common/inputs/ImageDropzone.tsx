import React, { useCallback, useEffect, useState } from "react";
import ImageSelect from "../ContentEditor/ImageSelect";
import FileDropzone from "../FileDropzone";
import DropzoneIconAndText from "./DropzoneIconAndText";

const ImageDropzone = ({
  multiple = true,
  onDrop,
  initialValue = null,
  previewClassName = ''
}) => {
  const dropZoneContent = (
    <DropzoneIconAndText
      icon={
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
      }
      fileHintText="PNG, JPG, GIF up to 10MB"
    />
  )

  const accept = {
    'image/*': ['.jpeg', '.pjpeg', '.jpeg', '.pjpeg', '.png', '.gif', '.svg']
  }

  const handleDrop = (acceptedFiles: any, _fileRejections: any, event: any) => {
    const file = acceptedFiles[0]
    setFileUrl(URL.createObjectURL(file)) // Update the file URL
    onDrop(file, event)
  }

  const [fileUrl, setFileUrl] = useState(initialValue);

  const onImgLoad = useCallback(() => {
    URL.revokeObjectURL(fileUrl)
  }, [fileUrl])

  // Update the file URL when the initialValue changes
  useEffect(() => {
    setFileUrl(initialValue);
  }, [initialValue]);

  useEffect(() => {
    // Revoke the URL to avoid memory leaks
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  return (
    <FileDropzone
      multiple={multiple}
      onDrop={handleDrop}
      accept={accept}
      dropZoneContent={
        fileUrl ? (
          <ImageSelect
            src={fileUrl}
            buttonText={'Change image'}
            onLoad={onImgLoad}
            className={previewClassName}
          />
        ) : (
          dropZoneContent
        )
      }
    />
  )
}

export default ImageDropzone
