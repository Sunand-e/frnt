import { GET_SCORM_PACKAGES } from "../../graphql/queries/scormPackages";
import FileUploader from "../common/FileUploader"

const PackageUploader = () => {

  const refetchQuery = GET_SCORM_PACKAGES
  const endpoint = "/uploads/upload_scorm"
  const dropZoneContent = (
    <p>Drag and drop a SCORM zip archive here, or click this box to select from your computer</p>
  )
  const accept = [ 'application/zip', 'application/x-zip-compressed', 'multipart/x-zip' ]
  const fileParameterName = 'document'
  const additionalParams = {
    content_type: 'scorm'
  }

  return (
    <FileUploader
      refetchQuery={refetchQuery}
      fileParameterName={fileParameterName}
      endpoint={endpoint}
      accept={accept}
      dropZoneContent={dropZoneContent}
      additionalParams={additionalParams}
    />
  )
}

export default PackageUploader