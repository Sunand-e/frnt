import Button from "../Button";

interface PackageInUseProps {
  item: any
  usage: any[],
  buttonAction: () => void
}

const PackageInUse: React.FunctionComponent<PackageInUseProps> = ({item, usage, buttonAction}) => {

  return (
    <>
      <p className="mb-2">You cannot delete <span className="font-bold">{item.fileName}</span> as it is currently in use in the following content items:</p>
      <ul role="list" className="list-disc list-inside mb-2">
      {/* <ul role="list" className=""> */}
        { usage.map((courseTitle, idx) => (
          <li key={idx} className="relative">
            {courseTitle}
          </li>
        ))}
      </ul>
      <Button onClick={buttonAction}>Go back</Button>
    </>
  )
}

export default PackageInUse