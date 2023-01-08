import Button from "../common/Button";

interface MediaInUseProps {
  item: any
  usage: any[],
  buttonAction: any
}

const MediaInUse: React.FunctionComponent<MediaInUseProps> = ({item, usage, buttonAction}) => {

  const usageReportData = usage.reduce((acc, val) => {
    acc[val.type] = [...(acc?.[val.type] || []), val.title]
    return acc
  }, {})

  let usageReport = []
  
  for (const type in usageReportData) {
    usageReport.push(
      <>
        <span className="text-gray-500 uppercase">{type}s</span>
        <ul role="list" className="list-disc list-inside mb-2">
          { usageReportData[type].map((title, idx) => (
            <li key={idx} className="relative">
              { title }
            </li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <>
      <p className="mb-2">You cannot delete <span className="font-bold">{item.fileName}</span> as it is currently in use in the following content items:</p>
      { usageReport }
      <Button onClick={buttonAction}>Go back</Button>
    </>
  )
}

export default MediaInUse