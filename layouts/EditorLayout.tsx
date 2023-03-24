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
    console.log('restOfEvent')
    console.log(restOfEvent)
    console.log('over')
    console.log(over)
    console.log('active')
    console.log(active)
    console.log('blockIds')
    console.log(blockIds)
    const overId = over?.id;

    if (blockIds.includes(overId)) {
      console.log('yup')
      // alert('moved to editor')
      return;
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
                className="w-full flex justify-center h-[calc(100vh-120px)] overflow-auto"
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
      (       
      {createPortal(
        <DragOverlay dropAnimation={dropAnimation}>
          {activeDragItem && (
            <>
            {activeDragItem.data.current?.type === 'block' ? (
              <BlockContainer id={activeDragItem.id} />
            ) : (
              <BlockTypeButton
                type={blocktypes[activeDragItem.id]}
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
