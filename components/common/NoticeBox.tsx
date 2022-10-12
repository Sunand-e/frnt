import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactElement } from "react"
import { noticesVar } from "../../graphql/cache"

interface NoticeBoxProps {
  className?: string
  children?: ReactElement
  notice?: {
    content
    id: string
    dismissable: boolean | undefined
  }
}

export default function NoticeBox({ className, notice, children }: NoticeBoxProps) {

  const bgClass = "bg-main bg-opacity-10"

  const dismissNotice = () => {
    noticesVar(
      noticesVar().filter(item => item.id !== notice.id)
    )
  }

  return (
    <div className={`min-h-60 w-full`}>
      <div className={`w-full rounded-2xl flex items-center border-l-20 border-main text-main-secondary py-4 px-6 mb-6 ${bgClass} ${className}`}>
        <FontAwesomeIcon className="h-6 mr-9 text-main" icon={{prefix: 'fas', iconName: 'file-pdf'}} />
        <div className={`w-full`}>
          {notice?.content || children}
        </div>
        { notice?.id && (
          <a className="cursor-pointer" onClick={dismissNotice}>Dismiss</a>
         )}
      </div>
    </div>
  )

}
