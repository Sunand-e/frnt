import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Layout';
import { motion } from 'framer-motion';
import { Sidebar } from '../components/common/ContentEditor/Sidebar';
import { closestCenter, closestCorners, defaultDropAnimationSideEffects, DndContext, DragOverlay, DropAnimation, PointerSensor, pointerWithin, useSensor, useSensors } from '@dnd-kit/core';
import { setActiveDragItem, useBlockStore } from '../components/common/ContentEditor/useBlockStore';
import { createPortal } from 'react-dom';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import BlockTypeButton from '../components/common/ContentEditor/BlockTypeButton';
import blocktypes from '../components/common/ContentEditor/blocktypes';
import BlockContainer from '../components/common/ContentEditor/BlockContainer';
import { sidebarBlockButtonClassName } from '../components/common/ContentEditor/Sidebar/Sidebar';
import { arrayMove } from '@dnd-kit/sortable';
import { useRef } from 'react';

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

export default function EditorLayout( {page, navState} ) {

  const blocks = useBlockStore(state => state.blocks)
  const activeDragItem = useBlockStore(state => state.activeDragItem)
  const setBlocks = useBlockStore(state => state.setBlocks)
  const blockIds = useBlockStore(state => state.blocks.map(block => block.id))

  const spacerInsertedRef = useRef<Boolean>();

  
  function getData(prop) {
    return prop?.data?.current ?? {};
  }

  const cleanUp = () => {
    // setActiveSidebarField(null);
    setActiveDragItem(null);
    // currentDragFieldRef.current = null;
    spacerInsertedRef.current = false;
  };

  const sensors = useSensors(
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: sortableKeyboardCoordinates,
    // }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragStart = ({active}) => {
    setActiveDragItem(active)
  }

  const handleDragEnd = ({active, over}) => {
    if(active.data.current?.type === 'block') {      
      const activeIndex = blocks.findIndex(block => block.id === active.id);
      const overIndex = blocks.findIndex(block => block.id === over.id);

      const newBlocks = arrayMove(
        blocks,
        activeIndex,
        overIndex
      )
      setBlocks(newBlocks);
    }
    setActiveDragItem(null)
  }

  const handleDragOver = ({active, over, ...restOfEvent}) => {

    const overData = getData(over)

    const overId = over?.id;

    if (overId === 'editor_pane' || blockIds.includes(overId)) {
      console.log('yup')

      // alert('moved to editor')
      return;
    }  
    if (!spacerInsertedRef.current) {

      const spacer = {
        type: 'dragBlock',
        id: active.id,
        properties: {}
      }
      
      let newBlocks = []
      if (!blocks.length) {
        newBlocks.push(spacer);
      } else {

        const nextIndex = overData.index > -1 ? overData.index : blocks.length;

        newBlocks = blocks.splice(nextIndex, 0, spacer);
      }
      setBlocks([
        ...newBlocks,
        {
          type: 'dragBlock',
          id: active.id,
          properties: {}
        }
      ])
      spacerInsertedRef.current = true;
        
    } else if (!over) {
      // This solves the issue where you could have a spacer handing out in the canvas if you drug
      // a sidebar item on and then off
      setBlocks(blocks.filter((f) => f.type !== "dragBlock" ));
      spacerInsertedRef.current = false;
    } else {
      // Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
      // we need to make sure we're updating the spacer position to reflect where our drop will occur.
      // We find the spacer and then swap it with the over skipping the op if the two indexes are the same
      // updateData((draft) => {
      //   const spacerIndex = draft.fields.findIndex(
      //     (f) => f.id === active.id + "-spacer"
      //   );

      //   const nextIndex =
      //     overData.index > -1 ? overData.index : draft.fields.length - 1;

      //   if (nextIndex === spacerIndex) {
      //     return;
      //   }

      //   draft.fields = arrayMove(draft.fields, spacerIndex, overData.index);
      // });
    }
  }



  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      modifiers={activeDragItem ? activeDragItem.data.current?.modifiers : []}

    >
      <Layout {...{
        page,
        navState,
        // ...(course && {
        sidebarComponent: (
          <Sidebar />
        )
        // })
      }}>
        {/*<div className="w-full h-[calc(100%-4.5rem)] mx-auto bg-white">*/}
        <div className="w-full mx-auto bg-white">
          <div className="lg:flex">
            <div id="content-wrapper" className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible flex h-full">
              <ToastContainer />
              <motion.div
                className="w-full flex justify-center h-[calc(100vh-108px)] overflow-auto"
                layoutScroll
              >
                <div className="min-w-0 w-full flex-auto">
                  {page}
                </div>
              </motion.div>
              
            </div>
          </div>
        </div>
      </Layout>
      {createPortal(
        <DragOverlay dropAnimation={dropAnimation}>
          {activeDragItem && (
            <>
            {activeDragItem.data.current?.type === 'block' ? (
              <BlockContainer id={activeDragItem.id} />
            ) : (
              <BlockTypeButton
                type={blocktypes[activeDragItem.data.current.type.name]}
                isDisabled={false}
                className={`text-main-secondary text-sm ${sidebarBlockButtonClassName}`}
              />
            )}
            </>
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}
