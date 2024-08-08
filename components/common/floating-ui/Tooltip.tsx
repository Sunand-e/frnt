import { ReactNode, useRef, useState } from 'react'
import {
  ReferenceType,
  offset,
  shift,
  flip,
  useFloating,
  autoUpdate,
  useInteractions,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  arrow,
  FloatingArrow,
  useTransitionStyles,
  Placement,
  FloatingPortal,
  useClientPoint,
} from '@floating-ui/react'
import { useViewStore } from '../../../hooks/useViewStore'
import classNames from '../../../utils/classNames'
// import { getColor } from '../theme/getters'

export interface RenderOpenerProps extends Record<string, unknown> {
  ref: (node: ReferenceType | null) => void
}

interface TooltipProps {
  content?: ReactNode
  renderOpener: (props: RenderOpenerProps) => ReactNode
  showArrow?: boolean
  arrowClassName?: string
  followMouse?: boolean
  placement?: Placement
  className?: string
}

export const Tooltip = ({
  content,
  renderOpener,
  showArrow = false,
  followMouse = false,
  arrowClassName = 'fill-white',
  placement = 'top',
  className = 'bg-white text-sm',
}: TooltipProps) => {
  
  const [isOpen, setIsOpen] = useState(false)

  const arrowRef = useRef(null)
  const mainScrollableRef = useViewStore(state => state.mainScrollableRef)

  const {
    refs: { setReference, setFloating },
    floatingStyles,
    context,
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      offset({ mainAxis: 6 }),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const hover = useHover(context, { 
    move: false, 

  })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  useClientPoint(context, { enabled: followMouse })
  const role = useRole(context, { role: 'tooltip' })
  

  const { styles: transitionStyles } = useTransitionStyles(context, {
    initial: {
      opacity: 0,
      transform: 'scale(0.8)',
    },
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ])

  return (
    <>
      {renderOpener({ ref: setReference, ...getReferenceProps() })}
      {isOpen && content && (
        <FloatingPortal root={mainScrollableRef}>
        <div
          ref={setFloating}
          style={{ ...floatingStyles, zIndex: 12500, position: 'absolute', top:-1}}
          {...getFloatingProps()}
        >
          <div style={transitionStyles} className={classNames(
            "font-medium shadow rounded px-4 py-1 max-w-[320px] break-words",
            className,
          )}>
            { showArrow && <FloatingArrow className={arrowClassName} tipRadius={2} height={8} ref={arrowRef} context={context} /> }
            <div>
              {content}
            </div>
          </div>
        </div>
        </FloatingPortal>
      )}
    </>
  )
}