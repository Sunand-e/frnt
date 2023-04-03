import { useReactiveVar } from "@apollo/client"
import { ReactDOM } from "react"
import { headerButtonsVar } from "../../../graphql/cache"

const HeaderButtons = () => {
  const headerButtons = useReactiveVar(headerButtonsVar)
  return (
    <div className="min-w-16 shrink-0 flex items-center justify-end space-x-3 lg:space-x-6 ">
      {headerButtons}
    </div>
  )
}

export default HeaderButtons
