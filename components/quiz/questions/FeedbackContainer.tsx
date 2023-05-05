import Button from "../../common/Button";

function FeedbackContainer({status,question, children}) {
  let feedback
  if(question.settings.feedback.type==='multi') {
    feedback = question.settings.feedback[status]
  }
  if(question.settings.feedback.type==='single') {
    feedback = question.settings.feedback.single
  }
  return (
    <div className="max-w-screen-lg w-full">
      <p>{feedback}</p>
      {children}
    </div>
  )
}

export default FeedbackContainer