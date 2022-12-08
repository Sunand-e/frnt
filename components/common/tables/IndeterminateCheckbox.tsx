import { HTMLProps, useEffect, useRef } from "react"

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
      className={
        className + 
        ' cursor-pointer h-4 w-4 rounded border-gray-300 text-main focus:ring-main'
      }
      {...rest}
    />
  )
}

export default IndeterminateCheckbox