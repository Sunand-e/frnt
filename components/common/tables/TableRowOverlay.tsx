import BlinkingEllipsis from '../misc/BlinkingEllipsis';
import { Dot } from '../misc/Dot';

const TableRowOverlay = ({row, rowElementRef, text=''}) => {

  return (
    <tr className="absolute border-0 z-10 w-full">
      <td 
        className="block"
        style={{
          height: rowElementRef.current?.offsetHeight
        }}
        colSpan={row._getAllVisibleCells().length}
      >
        <div className="w-full h-full flex items-center justify-center">
          {/* <LoadingSpinner size="sm" text={'Cloning course'} textPosition="right" /> */}
          { text || 'Please wait' }
          <BlinkingEllipsis />
        </div>
      </td>
    </tr>
  )
}

export default TableRowOverlay