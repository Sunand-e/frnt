import { useTableContext, TableProvider } from "../components/common/tables/tableContext"

interface ConsumerProps {
  type: string
}

const Consumer = ({type}: ConsumerProps) => {
  const count = useTableContext(s => s.count)
  const increase = useTableContext(s => s.increase)
    return (
      <>
        <p>{count} {type}s</p>
        <button onClick={increase}>add one </button>
      </>
    )
}


const TestPage = () => {
  return (<>
  <TableProvider>
    <Consumer type="pig" />
  </TableProvider>
  <TableProvider>
    <Consumer type="dog" />
    <Consumer type="egg" />
  </TableProvider>
  </>
  )
}

export default TestPage