import { GET_MEDIA_ITEMS } from "../../graphql/queries/allQueries"
import FileUploader from "../FileUploader"

const MediaUploader = () => {

  const refetchQuery = GET_MEDIA_ITEMS
  const endpoint = "/uploads/upload_media"
  const dropZoneText = "Drag and drop some files here, or click this box to select files"
  const accept = [
    'image/jpeg',
    'image/pjpeg',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/gif',
    'image/x-icon',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/mspowerpoint',
    'application/powerpoint',
    'application/vnd.ms-powerpoint',
    'application/x-mspowerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/mspowerpoint',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'application/vnd.oasis.opendocument.text',
    'application/excel',
    'application/vnd.ms-excel',
    'application/x-excel',
    'application/x-msexcel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/octet-stream',
    'application/zip',
    'audio/mpeg3',
    'audio/x-mpeg-3',
    'video/mpeg',
    'video/x-mpeg',
    'audio/m4a',
    'audio/ogg,',
    'audio/wav',
    'audio/x-wav',
    'video/mp4',
    'video/x-m4v',
    'video/quicktime',
    'video/x-ms-asf',
    'video/x-ms-wmv',
    'application/x-troff-msvideo',
    'video/avi',
    'video/msvideo',
    'video/x-msvideo',
    'audio/mpeg',
    'video/mpeg',
    'video/ogg',
    'video/3gpp',
    'audio/3gpp',
    'video/3gpp2',
    'audio/3gpp2'
  ]

  const fileParameterName = 'file'

  const additionalParams = {
    alt_text: 'Test alt text'
  }
  return (
    <FileUploader
      refetchQuery={refetchQuery}
      fileParameterName={fileParameterName}
      additionalParams={additionalParams}
      endpoint={endpoint}
      accept={accept}
      dropZoneText={dropZoneText}
    />
  )
}

export default MediaUploader