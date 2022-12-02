import {Trash} from '@styled-icons/heroicons-outline/Trash'
import {Download} from '@styled-icons/heroicons-outline/Download'
import dynamic from 'next/dynamic';
import { getIconFromFilename } from '../../../../../utils/getIconFromFilename';

const DynamicPdfViewer = dynamic(
  () => import('../../../../common/PdfViewer'),
  {
    ssr: false, 
  }
)


const DocumentItem = ({file, onRemove=null, pdfPreview=false}) => {

  const IconComponent = getIconFromFilename(file.fileName);

  const handleRemove = (e) => {
    e.preventDefault()
    onRemove(e)
  }

  return (
    <>
      <a href={file.location} className="block hover:bg-gray-50 group" target="_blank">
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="min-w-0 flex-1 flex items-center space-x-4">
            <div className="shrink-0">
              <IconComponent className="h-12 w-12 text-main" />
            </div>
            <p className="text-sm font-medium text-main-secondary truncate">{file.fileName}</p>
          </div>
            <div className="ml-auto h-7 flex space-x-4 hidden group-hover:block text-main">
            <Download className={`w-6 cursor-pointer hover:w-8`} />
            { onRemove && (
              <Trash className={`w-6 cursor-pointer hover:w-8 text-red-800`} onClick={handleRemove} />
            )}
            </div>
        </div>
      </a>
      { pdfPreview && file.location.endsWith('pdf') && (
        // <p>Hi</p>
        <DynamicPdfViewer url={file.location} className='w-full h-[600px]' />
      )}
    </>
  )
}

export default DocumentItem
