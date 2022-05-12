import { FilePdf, FileEarmarkFill } from '@styled-icons/bootstrap'
import { Microsoftexcel, Microsoftpowerpoint } from '@styled-icons/simple-icons'
import { FileDoc } from '@styled-icons/boxicons-solid/FileDoc'
import {Trash} from '@styled-icons/heroicons-outline/Trash'

const DocumentItem = ({file, onDelete: handleDelete}) => {

  let IconComponent;

  const extension = file.fileName.split('.').pop();

  switch (true) {
    case ["xls", "xlsx"].includes(extension) :
      IconComponent = Microsoftexcel;
      break;
    case ["doc", "docx"].includes(extension) :
      IconComponent = FileDoc;
      break;
    case ["pdf"].includes(extension) :
      IconComponent = FilePdf;
      break;
    case ["ppt, pptx"].includes(extension) :
      IconComponent = Microsoftpowerpoint;
      break;
    default:
      IconComponent = FileEarmarkFill;

} 

  return (
    <a href={file.location} className="block hover:bg-gray-50 group">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center space-x-4">
          <div className="flex-shrink-0">
            <IconComponent className="h-12 w-12 text-main" />
          </div>
          <p className="text-sm font-medium text-main-dark truncate">{file.fileName}</p>
        </div>
        { handleDelete && (
          <div className="ml-auto h-7 flex space-x-2 hidden group-hover:block">
            <Trash className={`w-4 cursor-pointer`} onClick={handleDelete}/>
          </div>
        )}
      </div>
    </a>
  )
}

export default DocumentItem
