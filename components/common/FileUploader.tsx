import FileDropzone from './FileDropzone';
import useUploadAndNotify from '../../hooks/useUploadAndNotify';
import { useCallback } from 'react';

const FileUploader = ({
  accept,
  dropZoneContent,
  endpoint=null,
  refetchQuery=null,
  fileParameterName,
  onDrop = acceptedFiles => null,
  onAllUploadsComplete = (data) => null,
  multiple=true,
  additionalParams={},
}) => {

  const { uploadFileAndNotify } = useUploadAndNotify({
    refetchQuery,
    additionalParams
  })

  const handleDrop = useCallback((acceptedFiles) => {
    const uploadPromises = acceptedFiles.map(file => uploadFileAndNotify(file,fileParameterName,endpoint))

    Promise.all(uploadPromises).then((data) => {
      onAllUploadsComplete(data)
    })
    onDrop(acceptedFiles)
  },[endpoint])

  return (
    <FileDropzone
      accept={accept}
      dropZoneContent={dropZoneContent}
      onDrop={handleDrop}
      multiple={multiple}
    />
  )
}

export default FileUploader