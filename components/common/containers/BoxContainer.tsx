import { StyledIcon } from '@styled-icons/styled-icon';
import Button from '../Button';
import BoxContainerTableBulkActions from '../tables/BoxContainerTableBulkActions';
interface BoxContainerProps {
  title: string,
  contentClassName?: string,
  hasTable?: boolean,
  button?: {
    text: string
    onClick: any,
    disabled?: boolean,
  } | null,
  bulkActions?: {
    label: string,
    onClick: (ids: string[]) => void
  }[] | null,
  icon: StyledIcon | null,
  children: any
}

const BoxContainer = ({title, button=null, icon: IconComponent=null, contentClassName=null, hasTable=false, children}: BoxContainerProps) => {

  const headerButton = !!button && (
    <Button onClick={button?.onClick} disabled={button?.disabled}>
      {button?.text}
    </Button>
  )

  return (
    <div className="bg-white shadow-xl rounded-md containerClassname">
      <div className="bg-main/20 rounded-t-md flex justify-end space-x-2 items-center px-3 py-2">
        <div className="flex text-main-secondary mr-auto">
          { IconComponent && <IconComponent className="w-7 mr-2" /> }
          <h3>{title}</h3>
        </div>
        {hasTable && <BoxContainerTableBulkActions />}
        {headerButton}
      </div>
      <div className={`${contentClassName}`}>
        {children}
      </div>
    </div>
  )
}

export default BoxContainer
