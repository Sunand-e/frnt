import Button from "../common/Button";

interface PackageInUseProps {
  item: any
  usage: any[],
  buttonAction: () => void
}

const PackageInUse: React.FunctionComponent<PackageInUseProps> = ({item, usage, buttonAction}) => {

  return (
    <>
      <p className="mb-2">You cannot delete <span className="font-bold">{item.title}</span> as it is currently in use in the following courses:</p>
      <ul role="list" className="list-disc list-inside mb-2">
      {/* <ul role="list" className=""> */}
        { usage.map((usage, idx) => (
          <li key={idx} className="relative">
            { usage.title }
            {/* <pre>
            { JSON.stringify(usage,null,2) }
            </pre> */}
          </li>
        ))}
      </ul>
      <Button onClick={buttonAction}>Go back</Button>
    </>
  )
}

export default PackageInUse