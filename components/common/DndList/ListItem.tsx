import classNames from 'classnames'
import styles from './ListItem.module.scss'
import { forwardRef } from "react"

const ListItem = forwardRef<HTMLLIElement, any>(({
  listeners,
  liClassName,
  liStyle,
  divStyle,
  divClassName,
  icon,
  after,
  title,
  onSelect,
  active
}, ref) => {

  const IconComponent = icon

  const bg = active ? `text-main bg-main/[.1]` : `bg-transparent`

  return (
    <li
      className={classNames(
        styles.Wrapper,
        bg,
        `flex hover:bg-main hover:bg-opacity-5 text-main-secondary`,
        liClassName
      )}
      style={liStyle}
      ref={ref}
    >
      <div
        className={`
          flex items-center w-full px-4 py-2
          ${divClassName}
        `}
        style={divStyle}
        // data-cypress="draggable-item"
        {...listeners}
        tabIndex={0}
      >
        <div className="min-w-0 flex-1 flex items-center group cursor-pointer" onClick={onSelect}>
          <>
          <a className={`flex py-1 space-x-2`}>
            { IconComponent && <IconComponent className="h-5 w-5 flex-0"/> }
            <span className="min-w-0 flex-1 text-sm font-medium break-words">
              { title || 'Untitled lesson'}
            </span>
          </a>
          { after }
          </>
        </div>
      </div>
    </li>
  )
})

export default ListItem