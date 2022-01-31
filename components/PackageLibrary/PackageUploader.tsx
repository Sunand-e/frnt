import { GET_SCORM_MODULES } from "../../graphql/queries/allQueries"
import FileUploader from "../FileUploader"

const PackageUploader = () => {

  const refetchQuery = GET_SCORM_MODULES
  const endpoint = "/uploads/upload_scorm"
  const dropZoneText = "Drag and drop a SCORM zip archive here, or click this box to select from your computer"
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
      dropZoneText={dropZoneText}
      additionalParams={additionalParams}
    />
  )
}

export default PackageUploader