import React, {useCallback, useEffect, useRef, useState} from 'react';
import {createPortal, unstable_batchedUpdates} from 'react-dom';
import {
  CancelDrop,
  closestCenter,
  rectIntersection,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  Modifiers,
  useDroppable,
  UniqueIdentifier,
  useSensors,
  useSensor,
  MeasuringStrategy,
  PointerSensor,
  pointerWithin,
  getFirstCollision,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  SortingStrategy,
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';

import { v4 as uuidv4 } from 'uuid';

import {Item, Container} from '../../common/dnd-kit';

import {createRange} from './utilities';
import { DroppableContainer } from './DroppableContainer';
import { SortableItem } from './SortableItem';
import { useStructureContext } from './CourseStructureStore';

export default {
  title: 'Presets/Sortable/Multiple Containers',
};

const dropAnimation: DropAnimation = {
  ...defaultDropAnimation,
  dragSourceOpacity: 0.5,
};

type Items = Record<string, string[]>;

interface Props {
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  columns?: number;
  containerStyle?: React.CSSProperties;
  getItemStyles?(args: {
    id: UniqueIdentifier;
    index: number;
    overIndex: number;
    isDragging: boolean;
    containerId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: {index: number}): React.CSSProperties;
  onRemoveContainer;
  handle?: boolean;
  onDragContainerEnd?: any;
  onDragItemEnd?: any;
  renderItem?: any;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  minimal?: boolean;
  trashable?: boolean;
  scrollable?: boolean;
  vertical?: boolean;
}

export const TRASH_ID = 'void';
const PLACEHOLDER_ID = 'placeholder';

export function MultipleContainers({
  adjustScale = false,
  cancelDrop,
  columns,
  handle = false,
  onDragContainerEnd: handleDragContainerEnd,
  onDragItemEnd,
  onRemoveContainer,
  containerStyle,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  minimal = false,
  modifiers,
  renderItem,
  strategy = verticalListSortingStrategy,
  trashable = false,
  vertical = false,
  scrollable,
}: Props) {

  
  const items = useStructureContext((s) => s.items)
  const setItems = useStructureContext((s) => s.setItems)
  const sectionIds = useStructureContext((s) => s.sectionIds)
  const setClonedItems = useStructureContext((s) => s.setClonedItems)
  const clonedItems = useStructureContext((s) => s.clonedItems)
  
  const [activeId, setActiveId] = useState<string | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? sectionIds.includes(activeId) : false;

  const handleDragItemEnd = (newItems) => {
    onDragItemEnd(newItems)
    // setItems(newItems) <-- check this
  }

  // console.log('reloaded multisectionIds');
  // Custom collision detection strategy optimized for multiple sectionIds
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in items
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, 'id');
      console.log('intersections')
      console.log(intersections)
      if (overId != null) {
        if (overId === TRASH_ID) {
          // If the intersecting droppable is the trash, return early
          // Remove this if you're not using trashable functionality in your app
          return intersections;
        }
        console.log('overId')
        console.log(overId)
        if (overId in items) {
          const containerItems = items[overId];
          console.log('overId in items')
          console.log('items')
          console.log({...items})
          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            console.log('Return the closest droppable within that container')
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                container.id !== overId &&
                containerItems.includes(container.id)
                ),
              })[0]?.id;
            console.log('RECALCULATED OVERID')
            console.log(overId)
          }
        }

        lastOverId.current = overId;

        return [{id: overId}];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{id: lastOverId.current}] : [];
    },
    [activeId, items]
  );

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  
  const findContainer = (id: string, items) => {
    if (id in items) {
      return id;
    }
    return Object.keys(items).find((key) => items[key].includes(id));
  };

  const getIndex = (id: string) => {
    const container = findContainer(id, items);

    if (!container) {
      return -1;
    }

    const index = items[container].indexOf(id);

    return index;
  };

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containrs
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);
  
  const handleDragOver = ({active, over}) => {

    const overId = over?.id;

    console.log('DRAGGING overId')
    console.log(overId)
    // Get the id of the item or container which is being dragged over

    // if there is no item being dragged over, or we're dragging a container, don't do anything.
    if (!overId || overId === TRASH_ID || active.id in items) {
      return;
    }
    
    // Get the object for the container being dragged over, based on the item we're over:
    const overContainer = findContainer(overId, items);
    // get the container which was being dragged from
    const activeContainer = findContainer(active.id, items);


    // if either the container we're dragging into of from doesn't exist, don't do anything:
    if (!overContainer || !activeContainer) {
      return;
    }
    
    // If dragging an item to another container, we need to 'place' the item in the new container 
    if (activeContainer !== overContainer) {
      const activeItems = items[activeContainer];
      const overItems = items[overContainer];
      const overIndex = overItems.indexOf(overId);
      const activeIndex = activeItems.indexOf(active.id);

      // determine the index at which to place the item in it's new container
      let newIndex: number;

      if (overId in items) {
        
        // dragging an item to another container, but not over an item. Set the index position to the last position.
        newIndex = overItems.length + 1;
      } else {
        // dragging an item over another item in another container
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top >
            over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newIndex =
          overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      recentlyMovedToNewContainer.current = true;

      setItems({
        ...items,
        [activeContainer]: items[activeContainer].filter(
          (item) => item !== active.id
        ),
        [overContainer]: [
          ...items[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...items[overContainer].slice(
            newIndex,
            items[overContainer].length
          ),
        ],
      })
    }
  }
  const handleDragEnd = useCallback(({active, over}) => {

    const oldoverId = over?.id;
    const overId = lastOverId.current;
    console.log('DRAG END')
    console.log('OLDoverId', oldoverId)
    console.log('overId', overId)

    const activeContainer = findContainer(active.id, items)

    if (!activeContainer) {
      setActiveId(null);
      return;
    }

    if (!overId) {
      setActiveId(null);
      return;
    }

    // if (overId === TRASH_ID) {
    //   setItems((items) => ({
    //     ...items,
    //     [activeContainer]: items[activeContainer].filter(
    //       (id) => id !== activeId
    //     ),
    //   }));
    //   setActiveId(null);
    //   return;
    // }


    // if (overId === PLACEHOLDER_ID) {
    //   const newContainerId = 'newContainerId';

    //   unstable_batchedUpdates(() => {
    //     setContainers((sectionIds) => [...sectionIds, newContainerId]);
    //     setItems((items) => ({
    //       ...items,
    //       [activeContainer]: items[activeContainer].filter(
    //         (id) => id !== activeId
    //       ),
    //       [newContainerId]: [active.id],
    //     }));
    //     setActiveId(null);
    //   });
    //   return;
    // }

    // const originalContainer = findContainer(active.id, clonedItems);
    const originalContainer = findContainer(active.id, items);
    // alert(JSON.stringify(items,null,2))
    
    const overContainer = findContainer(overId, items);
    console.log('active.id')
    console.log(active.id)
    console.log('overId')
    console.log(overId)
    console.log('clonedItems')
    console.log({...clonedItems})
    console.log('items')
    console.log({...items})
    console.log('overContainer')
    console.log(overContainer)
    console.log('originalContainer')
    console.log(originalContainer)
    // console.log('items')
    // console.log(items)
    if (overContainer) {
      const activeIndex = items[activeContainer].indexOf(active.id);
      const overIndex = items[overContainer].indexOf(overId);
      
      // If the item has not chanaged it's container:
      if(originalContainer === overContainer) {
        // console.log('the item has not changed it\'s container');
        // If the item hasn't changed position, do nothing
        if (activeIndex === overIndex) {
          // console.log('the item hasn\'t changed position, do nothing');
          return false;
        }
        // console.log('items')
        // console.log(items)
        const updatedSectionChildIds = arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        // ).filter(id => !!id)
        )

        // console.log('overContainer')
        // console.log(overContainer)
        // console.log('items[overContainer]')
        // console.log(items[overContainer])
        console.log('activeIndex, overIndex')
        console.log(activeIndex, overIndex)
        // console.log('updatedSectionChildIds')
        // console.log(updatedSectionChildIds)
        // console.log('the item has changed position');
        console.log('error1');
        handleDragItemEnd({
          ...items,
          [overContainer]: updatedSectionChildIds,
        })
      } else {
        // The item has changed sectionIds, or a container is being dragged.
        // If a container is being dragged:
        if (active.id in items) {
          console.log('A container is changing position')
          const activeIndex = sectionIds.indexOf(active.id);
          const overIndex = sectionIds.indexOf(over.id);
          const newSectionIds = arrayMove(sectionIds, activeIndex, overIndex);
          console.log('newSectionIds')
          console.log(newSectionIds)
          handleDragContainerEnd(newSectionIds)
        } else {
          // console.log('The item has changed sectionIds');
          // console.log('items')
          // console.log(items)
          // console.log('items[overContainer]')
          // console.log(items[overContainer])
          console.log('error2');
          handleDragItemEnd({
            ...items,
            [overContainer]: arrayMove(
              items[overContainer],
              activeIndex,
              overIndex
            ),
          })  
        }
      }
    }
    setActiveId(null);
  },[items, clonedItems, sectionIds])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={({active}) => {
        // alert('dragstart')
        console.log('START DRAGGING')
        setActiveId(active.id);
        setClonedItems(items);
      }}

      // When dragging over:
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      modifiers={modifiers}
    >
      <div
        style={{
          // display: 'inline-grid',
          boxSizing: 'border-box',
          gridAutoFlow: vertical ? 'row' : 'column',
        }}
      >
        <SortableContext
          // items={[...sectionIds, PLACEHOLDER_ID]}
          items={sectionIds}
          strategy={
            vertical
              ? verticalListSortingStrategy
              : horizontalListSortingStrategy
          }
        >
          {sectionIds.map((containerId) => (
            <DroppableContainer
              key={containerId}
              id={containerId}
              label={minimal ? undefined : `${containerId}`}
              columns={columns}
              items={items[containerId]}
              scrollable={scrollable}
              style={containerStyle}
              unstyled={minimal}
              onRemove={() => onRemoveContainer(containerId)}
            >
              <SortableContext items={items[containerId]} strategy={strategy}>
                {items[containerId].map((value, index) => {
                  return (
                    <SortableItem
                      disabled={isSortingContainer}
                      key={value}
                      id={value}
                      index={index}
                      handle={handle}
                      style={getItemStyles}
                      wrapperStyle={wrapperStyle}
                      renderItem={renderItem}
                      containerId={containerId}
                      getIndex={getIndex}
                    />
                  );
                })}
              </SortableContext>
            </DroppableContainer>
          ))}
          {/* {minimal ? undefined : (
            <DroppableContainer
              id={PLACEHOLDER_ID}
              disabled={isSortingContainer}
              items={empty}
              onClick={handleAddColumn}
              placeholder
            >
              + Add column
            </DroppableContainer>
          )} */}
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
          {activeId
            ? sectionIds.includes(activeId)
              ? renderContainerDragOverlay(activeId)
              : renderSortableItemDragOverlay(activeId)
            : null}
        </DragOverlay>,
        document.body
      )}
      {trashable && activeId && !sectionIds.includes(activeId) ? (
        <Trash id={TRASH_ID} />
      ) : null}
    </DndContext>
  );

  function renderSortableItemDragOverlay(id: string) {
    return (
      <Item
        id={id}
        handle={handle}
        style={getItemStyles({
          containerId: findContainer(id, items) as string,
          overIndex: -1,
          index: getIndex(id),
          id: id,
          isSorting: true,
          isDragging: true,
          isDragOverlay: true,
        })}
        wrapperStyle={wrapperStyle({index: 0})}
        renderItem={renderItem}
        dragOverlay
      />
    );
  }

  function renderContainerDragOverlay(containerId: string) {
    return (
      <Container
        label={`${containerId}`}
        columns={columns}
        style={{
          height: '100%',
        }}
        shadow
        unstyled={false}
      >
        {items[containerId].map((item, index) => (
          <Item
            key={item}
            id={item}
            handle={handle}
            style={getItemStyles({
              containerId,
              overIndex: -1,
              index: getIndex(item),
              id: item,
              isDragging: false,
              isSorting: false,
              isDragOverlay: false,
            })}
            wrapperStyle={wrapperStyle({index})}
            renderItem={renderItem}
          />
        ))}
      </Container>
    );
  }

  // function handleRemove(containerID: UniqueIdentifier) {
  //   setContainers((sectionIds) =>
  //     sectionIds.filter((id) => id !== containerID)
  //   );
  // }
}

function Trash({id}: {id: UniqueIdentifier}) {
  const {setNodeRef, isOver} = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        left: '50%',
        marginLeft: -150,
        bottom: 20,
        width: 300,
        height: 60,
        borderRadius: 5,
        border: '1px solid',
        borderColor: isOver ? 'red' : '#DDD',
      }}
    >
      Drop here to delete
    </div>
  );
}

export interface SortableItemProps {
  containerId: string;
  id: string;
  index: number;
  handle: boolean;
  disabled?: boolean;
  style(args: any): React.CSSProperties;
  getIndex(id: string): number;
  renderItem(): React.ReactElement;
  wrapperStyle({index}: {index: number}): React.CSSProperties;
}

export function useMountStatus() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500);

    return () => clearTimeout(timeout);
  }, []);

  return isMounted;
}