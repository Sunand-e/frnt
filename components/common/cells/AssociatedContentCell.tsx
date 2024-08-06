import { getAssociatedContentString } from "../../../utils/getAssociatedContentString"
import TooltipIfClamped from "../floating-ui/TooltipIfClamped"

const AssociatedContentCell = ({ entity, keyPrefix }) => {

  const contentString = getAssociatedContentString(entity, keyPrefix)
  
  return (
    <TooltipIfClamped className="line-clamp-2">
      {contentString}
    </TooltipIfClamped>
  )
}
export default AssociatedContentCell