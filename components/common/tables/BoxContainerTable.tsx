import BoxContainer from "../containers/BoxContainer";
import { TableWithoutProvider } from "./Table";
import { TableProvider } from "./tableContext";

const BoxContainerTable = ({tableProps, title, icon, button=null}) => {
  return (
    <TableProvider tableProps={{
      ...tableProps,
      showTop: false,
      maxVisibleRows: 5,
      scrollInTable: true,
    }}>
      <BoxContainer title={title} icon={icon} button={button} hasTable={true}>
        <TableWithoutProvider />
      </BoxContainer>
    </TableProvider>
  )
}

export default BoxContainerTable;