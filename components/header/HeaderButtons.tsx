import { useReactiveVar } from "@apollo/client"
import { ReactDOM } from "react"
import { headerButtonsVar } from "../../graphql/cache"

const HeaderButtons = () => {
  const headerButtons = useReactiveVar(headerButtonsVar)
  return (
    <div className="min-w-16 lg:w-64 pl-8 shrink-0 flex items-center justify-end space-x-6">
      {headerButtons}
    </div>
  )
}

export default HeaderButtons
