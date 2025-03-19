import { useRouter } from "next/router"
import Button from "./Button"
import {Add} from "@styled-icons/fluentui-system-filled/Add";

const ButtonAdd = ({text, action, disabled=false}) => {

  const router = useRouter()

  const handleClick = (typeof action === 'function')
    ? action
    : () => router.push(action)

  return (
    <Button onClick={handleClick} disabled={disabled}>
      <span className='hidden lg:block'>{text}</span>
      <span className='block lg:hidden'><Add width="20" /></span>
    </Button>
  )
}
export default ButtonAdd