import FileDropzone from './FileDropzone';
import useUploadAndNotify from '../hooks/useUploadAndNotify';

const FileUploader = ({
  accept,
  dropZoneContent,
  endpoint=null,
  refetchQuery=null,
  fileParameterName,
  onDrop = acceptedFiles => null,
  onAllUploadsComplete = () => null,
  multiple=true,
  additionalParams={},
}) => {

  const { uploadFileAndNotify } = useUploadAndNotify({
    additionalParams,
    endpoint,
    refetchQuery
  })

  const handleDrop = (acceptedFiles) => {
    const uploadPromises = acceptedFiles.map(file => uploadFileAndNotify(file,fileParameterName))
    Promise.all(uploadPromises).then(onAllUploadsComplete)
    onDrop(acceptedFiles)
  }

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