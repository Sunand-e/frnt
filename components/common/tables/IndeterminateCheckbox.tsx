import { HTMLProps, useEffect, useRef } from "react"
import classNames from "../../../utils/classNames"

const IndeterminateCheckbox = ({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={classNames(
        className,
        ' h-4 w-4 rounded border-gray-300 text-main focus:ring-main',
        rest.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
      )}
      {...rest}
    />
  )
}

export default IndeterminateCheckbox