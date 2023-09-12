import { useRouter } from "next/router"
import Button from "./Button"
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack";

const ButtonBack = ({text, action}) => {

  const router = useRouter()

  const handleClick = (typeof action === 'function')
    ? action
    : () => router.push(action)

  return (
    <Button onClick={handleClick}>
      <span className='hidden lg:block'>{text}</span>
      <span className='block lg:hidden'><ArrowBack width="20" /></span>
    </Button>
  )
}
export default ButtonBack