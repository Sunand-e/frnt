import { useRouter } from "next/router"
import { useEffect } from "react"
import Button from "../components/Button"
import { headerButtonsVar } from "../graphql/cache"

const useHeaderButtons = (buttons) => {

  const router = useRouter()

  useEffect(() => {
    headerButtonsVar(
      <>
        { buttons.map((button, idx) => (
          <Button key={idx} onClick={() => {
            if(typeof button[1] === 'string') {
              router.push(button[1])
            } else if(typeof button[1] === 'function') {
              button[1]()
            }
          }}>
            {button[0]}
          </Button>
        ))}
      </>
    )
  },[])

}

export default useHeaderButtons