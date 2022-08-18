import Button from "../Button"
import NoticeBox from "../NoticeBox"

const ResumeRecentActivity = () => {
  
  return (
    <NoticeBox>
    <div className="flex flex-col justify-baseline space-y-3 sm:space-y-0 sm:justify-between sm:flex-row">
      <h1 className="font-bold text-lg"><span>Pick up where you left off:</span> <em className="text-main">Know your why</em></h1>
      <Button>Start now</Button>
    </div>
    </NoticeBox>
  )
}

export default ResumeRecentActivity
