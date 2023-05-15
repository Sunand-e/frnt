import { Fragment } from "react"
import { useViewStore } from "../../../hooks/useViewStore"

const HeaderButtons = () => {

  const headerButtons = useViewStore(state => [...state.headerButtons].sort((a, b) => {
    if (a.order === undefined && b.order === undefined) {
      return 0;
    } else if (a.order === undefined) {
      return 1;
    } else if (b.order === undefined) {
      return -1;
    } else {
      return a.order - b.order;
    }
  }))

  return (
    <div className="min-w-16 shrink-0 flex items-center justify-end space-x-3 lg:space-x-6 ">
      {headerButtons.map(button => <Fragment key={button.id}>{button.component}</Fragment>)}
    </div>
  )
}

export default HeaderButtons
