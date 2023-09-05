import Button from "../Button";
import MediaLibrary from "../../media/MediaLibrary";
import DocumentItem from "../ContentEditor/blocks/DocumentBlock/DocumentItem";
import { handleModal } from "../../../stores/modalStore";
import MediaUploader from "../../media/MediaUploader";
import FileUploader from "../FileUploader";
import FileDropzone from "../FileDropzone";
import DropzoneIconAndText from "./DropzoneIconAndText";
import FileDropzoneV2 from "../FileDropzoneV2";

const DocumentSelector = ({file, onSelect, onRemove}) => {

  const selectDocumentModal = () => {
    handleModal({
      title: `Choose a file`,
      content: <MediaLibrary typeFilter={['document']} onItemSelect={onSelect} />,
      size: 'lg'
    })
  }

  const accept = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc', '.docx'],
    'application/vnd.ms-excel': ['.xls', '.xlsx'],
    'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
    'application/rtf': ['.rtf'],
    'application/vnd.oasis.opendocument.text': ['.odt'],
    'text/plain': ['.txt'],
    'text/csv': ['.csv'],
  };

  return (
    <>
      { file ? (
        <DocumentItem file={file} onRemove={onRemove} />
      ) : (
        <div className='text-center'>
                    {/* <FileDropzoneV2
            onClick={selectDocumentModal}
            onUpload={onSelect}
            preventInteraction={true}
            accept={accept}
            fileHintText="PDF, Word, Excel, PowerPoint, RTF, ODT, TXT, CSV up to 10MB"
          /> */}
          <Button onClick={selectDocumentModal}>Select a document file</Button>
        </div>
      )}
    </>
  )
}

export default DocumentSelector