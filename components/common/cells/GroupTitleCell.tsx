import {Group2} from "@styled-icons/remix-fill/Group2"
import { getGroupType } from "../groupTypes"
import ItemWithImage from "./ItemWithImage"

const GroupTitleCell = ({ group, itemWithImageProps }) => {
  
  const type = getGroupType(group)
  const icon = <type.icon className={type.name === 'group' ? '' : 'p-1'} />

  const cellProps = {
    image: group.image,
    title: group.name,
    icon,
    ...itemWithImageProps
  }
  return (
    <ItemWithImage { ...cellProps } />
  )
}

export default GroupTitleCell