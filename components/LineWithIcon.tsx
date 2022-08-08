import styles from './LineWithIcon.module.scss'
import { PlusCircle } from '@styled-icons/heroicons-solid/PlusCircle'
interface LineWithIconProps {
  onClick?: React.MouseEventHandler;
  children?: JSX.Element | string
}

const LineWithIcon = ({onClick, children}: LineWithIconProps) => (
  <div className={`
    flex items-center
    h-12
    before:grow before:border-t-2
    after:grow after:border-t-2
  `}>
    <PlusCircle className={`px-4 w-16`} />
  </div>
)

export default LineWithIcon
