import Button from "../../common/Button";
import {Cross} from "@styled-icons/entypo/Cross"
import {Check} from "@styled-icons/entypo/Check"

function FeedbackContainer({status, question, children}) {
  let feedback
  if(question.settings?.feedback?.type==='multi') {
    feedback = question.settings.feedback?.[status]
  } else if(question.settings?.feedback?.type==='single') {
    feedback = question.settings.feedback?.single
  }

  let capitalisedStatus = status.charAt(0).toUpperCase() + status.slice(1)

  return (
    <div className="max-w-screen-lg w-full bg-main/5 flex flex-col items-center p-6">
      {status === 'correct' ? (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-main text-white">
          <Check width={24} />
        </div>
      ) : (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500 text-white">
          <Cross width={24} />
        </div>
      )}
      <p>{feedback || capitalisedStatus}</p>
      {children}
    </div>
  )
}

export default FeedbackContainer