import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function NoticeBox({ className, children }) {

  const bgClass = "bg-blue bg-opacity-10"

  return (
    <div className={`min-h-60 w-full`}>
      <div className={`w-full rounded-2xl flex items-center border-l-20 border-blue text-blue-dark py-4 px-6 mb-8 ${bgClass} ${className}`}>
        <FontAwesomeIcon className="h-6 mr-9 text-blue" icon={{prefix: 'fas', iconName: 'file-pdf'}} />
        <div className={`w-full`}>
          {children}    
        </div>
      </div>
    </div>
  )

}
