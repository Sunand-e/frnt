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
import { useRef, useState } from 'react';
import Announcements from '../components/common/ContentEditor/Announcements';

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

const createSpacer = ({ id }) => ({
  id,
  type: 'spacer',
  properties: {}
})

export default function EditorLayout( {page, navState} ) {

  const blocks = useBlockStore(state => state.blocks)
  const activeDragItem = useBlockStore(state => state.activeDragItem)
  const setBlocks = useBlockStore(state => state.setBlocks)
  const insertBlock = useBlockStore(state => state.insertBlock)
  const blockIds = useBlockStore(state => state.blocks.map(block => block.id))

  const spacerInsertedRef = useRef<Boolean>();
  const currentDragFieldRef = useRef();
  const [activeSidebarType, setActiveSidebarType] = useState(); // only for fields from the sidebar
  
  function getData(prop) {
    return prop?.data?.current ?? {};
  }

  const cleanUp = () => {
    setActiveSidebarType(null);
    setActiveDragItem(null);
    currentDragFieldRef.current = null;
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

    const activeData = getData(active);

    // This is where the cloning starts.
    // We set up a ref to the field we're dragging
    // from the sidebar so that we can finish the clone
    // in the onDragEnd handler.
    if (activeData.fromSidebar) {
      const { type } = activeData;
      // const { type } = field;
      console.log('activeData')
      console.log(activeData)
      setActiveSidebarType(type);
      // Create a new field that'll be added to the fields array
      // if we drag it over the canvas.
      currentDragFieldRef.current = {
        id: active.id,
        type: type.name,
        name: `${type.name}${blocks.length + 1}`,
        parent: null
      };
      return;
    }

    // We aren't creating a new element so go ahead and just insert the spacer
    // since this field already belongs to the canvas.
    const { field, index } = activeData;

    setActiveDragItem(field);
    currentDragFieldRef.current = field;
    insertBlock(createSpacer({ id: active.id }),index,null,true)
  };

  const handleDragOver = (e) => {
    const { active, over } = e;
    const activeData = getData(active);
    // console.log('activeData')
    // console.log(activeData)
    // Once we detect that a sidebar field is being moved over the canvas
    // we create the spacer using the sidebar fields id with a spacer suffix and add into the
    // fields array so that it'll be rendered on the canvas.

    console.log('activeData.index')
    console.log(activeData.index)
    // 🐑 CLONING 🐑
    // This is where the clone occurs. We're taking the id that was assigned to
    // sidebar field and reusing it for the spacer that we insert to the canvas.
    if (activeData.fromSidebar) {
      const overData = getData(over);

      if (!spacerInsertedRef.current) {
        
        const spacer = createSpacer({
          id: active.id + "-spacer"
        });
        console.log('overData.index')
        console.log(overData.index)
        if (!blocks.length) {
          insertBlock(spacer);
        } else {
          const nextIndex = overData.index > -1 ? overData.index : blocks.length;
          insertBlock(spacer,nextIndex);
        }
        spacerInsertedRef.current = true;

      } else if (!over) {
        
        console.log('!over')
        // This solves the issue where you could have a spacer handing out in the canvas if you drug
        // a sidebar item on and then off
        const newBlocks = blocks.filter((f) => f.type !== "spacer");
        setBlocks(newBlocks)
        spacerInsertedRef.current = false;
      } else {
        // Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
        // we need to make sure we're updating the spacer position to reflect where our drop will occur.
        // We find the spacer and then swap it with the over skipping the op if the two indexes are the same
        const spacerIndex = blocks.findIndex(
          (block) => block.id === active.id + "-spacer"
        );
        
        const nextIndex = overData?.sortable?.index > -1 ? overData?.sortable?.index : blocks.length - 1;

        if (nextIndex === spacerIndex) {
          return;
        }

        setBlocks(arrayMove(blocks, spacerIndex, nextIndex));
      }
    }
  };

  const handleDragEnd = (e) => {
    const { over } = e;

    // We dropped outside of the over so clean up so we can start fresh.
    if (!over) {
      cleanUp();
      const newBlocks = blocks.filter((f) => f.type !== "spacer");
      setBlocks(newBlocks)
      return;
    }

    // This is where we commit the clone.
    // We take the field from the this ref and replace the spacer we inserted.
    // Since the ref just holds a reference to a field that the context is aware of
    // we just swap out the spacer with the referenced field.
    let nextField = currentDragFieldRef.current;

    if (nextField) {
      const spacerIndex = blocks.findIndex((f) => f.type === "spacer");
      insertBlock(nextField,spacerIndex,null,true)
    }

    useBlockStore.setState({sidebarFieldsRegenKey: Date.now()});
    cleanUp();
  };


  // console.log('blocktypes[activeSidebarType.data.current.type.name]')
  // console.log(blocktypes[activeSidebarType?.data.current.type.name])
  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={pointerWithin}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      modifiers={activeDragItem ? activeDragItem.data.current?.modifiers : []}

    >
      
      {/* <Announcements /> */}
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
            <>
            {activeSidebarType ? (
              <BlockTypeButton
                type={activeSidebarType}
                isDisabled={false}
                className={`text-main-secondary text-sm ${sidebarBlockButtonClassName}`}
              />
            ) : null}
            {activeDragItem ? <BlockContainer id={activeDragItem.id} /> : null}
{/* 
            {activeDragItem.data.current?.type === 'block' ? (
              <BlockContainer id={activeDragItem.id} />
            ) : (
              <BlockTypeButton
                type={blocktypes[activeDragItem.data.current.type.name]}
                isDisabled={false}
                className={`text-main-secondary text-sm ${sidebarBlockButtonClassName}`}
              />
            )} */}
            </>
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}
