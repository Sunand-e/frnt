import { CheckCircleIcon, ChevronDownIcon, MailIcon } from '@heroicons/react/solid'
import { FunctionComponent } from 'react'

const DocumentItem = ({file}) => {
  return (
    <a href={file.location} className="block hover:bg-gray-50">
    <div className="flex items-center px-4 py-4 sm:px-6">
      <div className="min-w-0 flex-1 flex items-center">
        <div className="flex-shrink-0">
          <img className="h-12 w-12 rounded-full" src={file.location} alt="" />
        </div>
        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
          <div>
            <p className="text-sm font-medium text-indigo-600 truncate">{file.fileName}</p>
            <p className="mt-2 flex items-center text-sm text-gray-500">
              <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              <span className="truncate">{file.email}</span>
            </p>
          </div>
          <div className="hidden md:block">
            <div>
              <p className="text-sm text-gray-900">
                Applied on <time dateTime={file.date}>{file.dateFull}</time>
              </p>
              <p className="mt-2 flex items-center text-sm text-gray-500">
                <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                {file.stage}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
    </div>
  </a>
  )
}

export default DocumentItem
