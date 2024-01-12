import { GET_MEDIA_ITEMS } from "../../graphql/queries/mediaItems";
import DropzoneIconAndText from "../common/inputs/DropzoneIconAndText"
import FileUploader from "../common/FileUploader"

const MediaUploader = ({onUploadComplete}) => {

  const refetchQuery = GET_MEDIA_ITEMS
  const endpoint = "/uploads/upload_media"
  const dropZoneContent = <DropzoneIconAndText
    fileHintText="PNG, JPG, GIF, PDF, DOC, XLS, PPT, MP3, WAV up to 10MB"
  />

  const accept = {
    'image/jpeg': ['.jpeg', '.pjpeg', '.jpeg', '.pjpeg'],
    'image/png': ['.png'],
    'image/gif': ['.gif'],
    'image/x-icon': ['.ico'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc', '.docx'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/mspowerpoint': ['.ppt'],
    'application/powerpoint': ['.ppt'],
    'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
    'application/x-mspowerpoint': ['.ppt'],
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow': ['.ppsx'],
    'application/vnd.oasis.opendocument.text': ['.odt'],
    'application/excel': ['.xls'],
    'application/vnd.ms-excel': ['.xls', '.xlsx'],
    'application/x-excel': ['.xls'],
    'application/x-msexcel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    'application/octet-stream': ['.bin'],
    'application/zip': ['.zip'],
    'audio/mpeg3': ['.mp3'],
    'audio/x-mpeg-3': ['.mp3'],
    'video/mpeg': ['.mpeg'],
    'video/x-mpeg': ['.mpeg'],
    'audio/m4a': ['.m4a'],
    'audio/ogg': ['.ogg'],
    'audio/wav': ['.wav'],
    'audio/x-wav': ['.wav'],
    'video/mp4': ['.mp4'],
    'video/x-m4v': ['.m4v'],
    'video/quicktime': ['.mov'],
    'video/x-ms-asf': ['.asf'],
    'video/x-ms-wmv': ['.wmv'],
    'application/x-troff-msvideo': ['.avi'],
    'video/avi': ['.avi'],
    'video/msvideo': ['.avi'],
    'video/x-msvideo': ['.avi'],
    'audio/mpeg': ['.mp3'],
    'video/ogg': ['.ogg'],
    'video/3gpp': ['.3gpp'],
    'audio/3gpp': ['.3gpp'],
    'video/3gpp2': ['.3gpp2'],
    'audio/3gpp2': ['.3gpp2'],

};

  const fileParameterName = 'file'

  const additionalParams = {
    alt_text: 'Test alt text'
  }
  return (
    <FileUploader
      refetchQuery={refetchQuery}
      onAllUploadsComplete={onUploadComplete}
      fileParameterName={fileParameterName}
      additionalParams={additionalParams}
      endpoint={endpoint}
      accept={accept}
      dropZoneContent={dropZoneContent}
    />
  )
}

export default MediaUploader