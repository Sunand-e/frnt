import { MoreHorizontal } from '@styled-icons/fluentui-system-filled/MoreHorizontal';
import {arrow, FloatingArrow, FloatingPortal, hide, useClick, useDismiss, useFloating, useHover, useInteractions} from '@floating-ui/react';
import { useRef, useState } from 'react';
import { useEditorViewStore } from '../common/ContentEditor/useEditorViewStore';


const SidebarItemMenu = ({ actions, isOpen, setIsOpen, position='right', className='' }) => {

  const [] = useState(false);
  const arrowRef = useRef(null);
  const isDraggingSidebar = useEditorViewStore(state => state.isDraggingSidebar)

  const {refs, floatingStyles, context} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-end',
    middleware: [
      arrow({
        element: arrowRef,
      }),
      hide(),
    ],
  });
  const dismiss = useDismiss(context);
  const click = useClick(context)
  const {getReferenceProps, getFloatingProps} = useInteractions([
    click,
    dismiss
  ]);
  return !isDraggingSidebar && (
    <>
    <div ref={refs.setReference} {...getReferenceProps()}>
      <MoreHorizontal className='group-hover:shadow-md w-6 rounded-full bg-white text-main-secondary' />
      {isOpen && (
      <>
      {/* <FloatingArrow ref={arrowRef} context={context} /> */}
        <ul
          className='bg-white shadow-md rounded-md z-10 text-sm text-main-secondary'
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          { actions.map((menuItem, index) => (
            <li key={index}>
              <button
                className="w-full text-left rounded-md whitespace-nowrap p-2 hover:bg-gray-100"
                onClick={menuItem.onClick}
              >
                {menuItem.label}
              </button>
            </li>
          ))}
        </ul>
      </>
    )}
    </div>
    </>
  )
}

export default SidebarItemMenu
