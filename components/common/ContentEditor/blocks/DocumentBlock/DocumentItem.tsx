import {Trash} from '@styled-icons/heroicons-outline/Trash'
import {Download} from '@styled-icons/heroicons-outline/Download'
import dynamic from 'next/dynamic';
import { getIconFromFilename } from '../../../../../utils/getIconFromFilename';
import Button from '../../../Button';
import { handleModal } from '../../../../../stores/modalStore';
import ButtonLink from '../../../ButtonLink';

const DynamicPdfViewer = dynamic(
  () => import('../../../../common/PdfViewer'),
  {
    ssr: false, 
  }
)


const DocumentItem = ({file, onRemove=null, viewButton=false, pdfPreview=false, removeable=false}) => {

  const IconComponent = getIconFromFilename(file.fileName);

  const handleRemove = (e) => {
    e.preventDefault()
    onRemove(e)
  }

  const handleViewDocument = (e) => {
    e.preventDefault()
    handleModal({
      size: 'lg',
      title: file.fileName,
      content: <DynamicPdfViewer url={file.location} className='w-full h-[600px]' />
    })
  }

  return (
    <>
      <div className="block bg-white shadow-md group flex items-center p-8 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center justify-center space-x-8">
          <div className="shrink-0">
            <IconComponent className="h-10 w-10 text-main" />
          </div>
          <p className="text-md font-medium text-main-secondary truncate">{file.fileName}</p>
          { viewButton && file.location.endsWith('pdf') && (
            <Button onClick={handleViewDocument}>View document</Button>
        )}
            {/* : (
            <ButtonLink href={file.location} className='flex items-center justify-center h-9 text-white space-x-4'>
              <Download className='w-5 mr-2 -ml-1' /><span>Download document</span>
            </ButtonLink>
          )} */}

          <a href={file.location} target="_blank" className='flex items-center justify-center rounded-full hover:scale-125 w-9 h-9 bg-main hover:bg-main/80 text-white'>
            <Download className={`w-6`} />
          </a>

        </div>
        { removeable && (
          <div className="ml-auto h-7 flex space-x-4  text-main">
            { onRemove && (
              <Trash className={`w-6 cursor-pointer hover:scale-125 text-red-800`} onClick={handleRemove} />
            )}
          </div>
        )}
      </div>
      { pdfPreview && file.location.endsWith('pdf') && (
        // <p>Hi</p>
        <DynamicPdfViewer url={file.location} className='w-full h-[600px]' />
      )}
    </>
  )
}

export default DocumentItem
