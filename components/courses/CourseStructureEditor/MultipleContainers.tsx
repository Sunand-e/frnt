import React, {useCallback, useEffect, useRef, useState} from 'react';
import {createPortal, unstable_batchedUpdates} from 'react-dom'
import {
  CancelDrop,
  closestCenter,
  pointerWithin,
  rectIntersection,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  getFirstCollision,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  Modifiers,
  useDroppable,
  UniqueIdentifier,
  useSensors,
  useSensor,
  MeasuringStrategy,
  KeyboardCoordinateGetter,
  defaultDropAnimationSideEffects,
  PointerSensor,
} from '@dnd-kit/core';
import {
  AnimateLayoutChanges,
  SortableContext,
  useSortable,
  arrayMove,
  defaultAnimateLayoutChanges,
  verticalListSortingStrategy,
  SortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';
import {coordinateGetter as multipleContainersCoordinateGetter} from './multipleContainersKeyboardCoordinates';

import {Item, Container, ContainerProps} from '../../common/dnd-kit';
import { DroppableContainer } from './DroppableContainer';
import { SortableItem } from './SortableItem';
import { clone, isEqual } from 'lodash';

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

export type StructureItems = Record<UniqueIdentifier, UniqueIdentifier[]>;

interface Props {
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  columns?: number;
  containerStyle?: React.CSSProperties;
  coordinateGetter?: KeyboardCoordinateGetter;
  getItemStyles?(args: {
    value: UniqueIdentifier;
    index: number;
    overIndex: number;
    isDragging: boolean;
    containerId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: {index: number}): React.CSSProperties;
  itemCount?: number;
  items?: StructureItems;
  handle?: boolean;
  renderItem?: any;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  minimal?: boolean;
  trashable?: boolean;
  scrollable?: boolean;
  vertical?: boolean;
  onContainerReorder?: (ids: Array<UniqueIdentifier>) => void;
  onItemReorder?: (newItems: StructureItems, oldItems: StructureItems) => void;
  onAddItem?: (newItems: StructureItems, oldItems: StructureItems) => void;
  onRemoveItem?: (newItems: StructureItems, oldItems: StructureItems) => void;
  onAddContainer?: () => void;
  onRemoveContainer?: (id: UniqueIdentifier) => void;
}

export const TRASH_ID = 'void';
const PLACEHOLDER_ID = 'placeholder';
const empty: UniqueIdentifier[] = [];

export function MultipleContainers({
  adjustScale = false,
  cancelDrop,
  columns,
  handle = false,
  items: initialItems,
  containerStyle,
  coordinateGetter = multipleContainersCoordinateGetter,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  minimal = false,
  modifiers,
  renderItem,
  strategy = verticalListSortingStrategy,
  trashable = false,
  vertical = false,
  scrollable,
  onItemReorder,
  onContainerReorder,
  onAddContainer,
  onRemoveContainer: onRemoveContainer,
  onAddItem,
  onRemoveItem
}: Props) {
  
  const [items, setItems] = useState<StructureItems>(
    () =>
    initialItems ?? {
      A: [],
      }
      );
      
  // const [containers, setContainers] = useState(
  //   Object.keys(items) as UniqueIdentifier[]
  // );
  const containers = Object.keys(items) as UniqueIdentifier[]

  const isDragging = useRef<boolean>(false)
  // const [clonedItems, setClonedItems] = useState<StructureItems | null>(initialItems);
  const clonedItems = useRef<StructureItems>(initialItems);
  
  useEffect(() => {
    // alert('initialItems have changed')
    // console.log('initialItemsaa')
    // console.log(initialItems)
    setItems(initialItems)
    clonedItems.current = initialItems
    // setContainers(Object.keys(initialItems) as UniqueIdentifier[])
  },[initialItems])

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;
  
  // useEffect(() => {
  //   if(containers.length > 0) {
  //     onContainerReorder(containers)
      // console.log('containers.length > 0')
      // console.log('containers')
      // console.log(containers)
      // const obj: StructureItems = {}
      // for (const id of containers) {
      //   obj[id] = items[id];
      // }
      // onItemReorder(obj, items)
  //   }
  // },[containers])
  /**
   * Custom collision detection strategy optimized for multiple containers
   *
   * - First, find any droppable containers intersecting with the pointer.
   * - If there are none, find intersecting containers with the active draggable.
   * - If there are no intersecting containers, return the last matched intersection
   *
   */
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

      if (overId != null) {
        if (overId === TRASH_ID) {
          // If the intersecting droppable is the trash, return early
          // Remove this if you're not using trashable functionality in your app
          return intersections;
        }

        if (overId in items) {
          const containerItems = items[overId];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.includes(container.id)
              ),
            })[0]?.id;
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
      coordinateGetter,
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  };

  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    const index = items[container].indexOf(id);

    return index;
  };

  const onDragCancel = () => {
    if (clonedItems.current) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems.current);
    }

    setActiveId(null);
    isDragging.current = false
    // setClonedItems(null);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  return (
    <div className="flex">
    <div className="w-[400px]">
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={({active}) => {
        setActiveId(active.id);
        clonedItems.current = items;
        isDragging.current = true;
      }}
      onDragOver={({active, over}) => {
        const overId = over?.id;

        if (overId == null || overId === TRASH_ID || active.id in items) {
          return;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if (!overContainer || !activeContainer) {
          return;
        }

        if (activeContainer !== overContainer) {
          setItems((items) => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.indexOf(overId);
            const activeIndex = activeItems.indexOf(active.id);

            let newIndex: number;

            if (overId in items) {
              newIndex = overItems.length + 1;
            } else {
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

            return {
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
            };
          });
        }
      }}
      onDragEnd={({active, over}) => {

        let newItems = items;

        if (active.id in items && over?.id) {
          const activeIndex = containers.indexOf(active.id);
          const overIndex = containers.indexOf(over.id);
          let containerArray = arrayMove(containers, activeIndex, overIndex);
          const obj: StructureItems = {}
          for (const sectionId of containerArray) {
            obj[sectionId] = items[sectionId];
          }
          newItems = obj
          setItems(newItems)
        }

        const activeContainer = findContainer(active.id);

        if (!activeContainer) {
          setActiveId(null);
          return;
        }

        const overId = over?.id;

        if (overId == null) {
          setActiveId(null);
          return;
        }

        const overContainer = findContainer(overId);


        if (overContainer) {
          const activeIndex = items[activeContainer].indexOf(active.id);
          const overIndex = items[overContainer].indexOf(overId);
          if (activeIndex !== overIndex) {
            newItems = {
              ...items,
              [overContainer]: arrayMove(
                items[overContainer],
                activeIndex,
                overIndex
              ),
            }
            setItems(newItems)
          }
        }
        // alert('gothere')
        if(!isEqual(newItems, clonedItems.current)) {
          onItemReorder(newItems, clonedItems.current)
        } else if(!isEqual(Object.keys(newItems), Object.keys(clonedItems.current))) {
          onContainerReorder(Object.keys(newItems))
        }
  
        setActiveId(null);
      }}
      cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      modifiers={modifiers}
    >
      <div
        style={{
          // display: 'inline-grid',
          boxSizing: 'border-box',
          // padding: 20,
          gridAutoFlow: vertical ? 'row' : 'column',
        }}
      >
        <SortableContext
          items={[...containers, PLACEHOLDER_ID]}
          strategy={
            vertical
              ? verticalListSortingStrategy
              : horizontalListSortingStrategy
          }
        >
          {containers.map((containerId) => (
            <DroppableContainer
              key={containerId}
              id={containerId}
              label={minimal ? undefined : `Column ${containerId}`}
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
          {minimal ? undefined : (
            <DroppableContainer
              id={PLACEHOLDER_ID}
              disabled={isSortingContainer}
              items={empty}
              onClick={handleAddColumn}
              placeholder
            >
              + Add column
            </DroppableContainer>
          )}
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
          {activeId
            ? containers.includes(activeId)
              ? renderContainerDragOverlay(activeId)
              : renderSortableItemDragOverlay(activeId)
            : null}
        </DragOverlay>,
        document.body
      )}
      {trashable && activeId && !containers.includes(activeId) ? (
        <Trash id={TRASH_ID} />
      ) : null}
    </DndContext>
    </div>
    <div>
      <h3>MC items state</h3>
      <pre className='m-5'>
      { JSON.stringify(items,null,2) }
      </pre>
      <p>isDragging: {isDragging? 'true':'false'}</p>
    </div>
    <div>
      <h3>MC clonedItems state</h3>
      <pre className='m-5'>
      { JSON.stringify(clonedItems.current,null,2) }
      </pre>
    </div>
    
    </div>
  );

  function renderSortableItemDragOverlay(id: UniqueIdentifier) {
    return (
      <Item
        value={id}
        handle={handle}
        style={getItemStyles({
          containerId: findContainer(id) as UniqueIdentifier,
          overIndex: -1,
          index: getIndex(id),
          value: id,
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

  function renderContainerDragOverlay(containerId: UniqueIdentifier) {
    return (
      <Container
        label={`Column ${containerId}`}
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
            value={item}
            handle={handle}
            style={getItemStyles({
              containerId,
              overIndex: -1,
              index: getIndex(item),
              value: item,
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
  //   setContainers((containers) =>
  //     containers.filter((id) => id !== containerID)
  //   );
  // }

  function handleAddColumn() {
    onAddContainer && onAddContainer()
    // const newContainerId = uuidv4();
    // unstable_batchedUpdates(() => {
    //   setContainers((containers) => [...containers, newContainerId]);
    //   setItems((items) => {
    //     const newItems: StructureItems = {
    //       ...items,
    //       [newContainerId]: [],
    //     }
    //     // onAddColumn && onAddColumn(newItems, clonedItems)
    //     return newItems
    //   });
    // });
  }
}
