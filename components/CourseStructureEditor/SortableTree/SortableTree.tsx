import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {
  Announcements,
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
  DragMoveEvent,
  DragEndEvent,
  DragOverEvent,
  LayoutMeasuringStrategy,
  DropAnimation,
  defaultDropAnimation,
  Modifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {
  buildTree,
  flattenTree,
  getProjection,
  getChildCount,
  removeItem,
  removeChildrenOf,
  setProperty,
} from './utilities';
import type {FlattenedItem, SensorContext, TreeItems} from './types';
import {sortableTreeKeyboardCoordinates} from './keyboardCoordinates';
import {TreeItem, SortableTreeItem} from './TreeItem';


const adjustTranslate: Modifier = ({transform}) => {
  return {
    ...transform,
    y: transform.y - 25,
  };
};

const initialItems: TreeItems = [
  {
    id: 'Home',
    type: "lesson",
    children: [],
  },
  {
    id: 'Collections',
    type: 'section',
    children: [
      {id: 'Spring', type: "lesson"},
      {id: 'Summer', type: "lesson"},
      {id: 'Fall', type: "lesson"},
      {id: 'Winter', type: "quiz"},
    ],
  },
  {
    id: 'About Us',
    type: 'quiz',
  },
  {
    id: 'My Account',
    type: 'section',
    children: [
      {id: 'Addresses', type: 'lesson'},
      {id: 'Order History', type: 'quiz'},
    ],
  },
];

const measuring = {
  strategy: LayoutMeasuringStrategy.Always,
  // droppable: {
  // },
};

const dropAnimation: DropAnimation = {
  ...defaultDropAnimation,
  dragSourceOpacity: 0.5,
};

interface SortableTreeProps {
  collapsible?: boolean;
  defaultItems?: TreeItems;
  indentationWidth?: number;
  indicator?: boolean;
  removable?: boolean;
}

export function SortableTree({
  collapsible,
  defaultItems = initialItems,
  indicator,
  indentationWidth = 50,
  removable,
}: SortableTreeProps) {
  const [items, setItems] = useState(() => defaultItems);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState<{
    parentId: string | null;
    overId: string;
  } | null>(null);

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items);
    const collapsedItems = flattenedTree.reduce<string[]>(
      (acc, item) =>
        item.collapsed && item?.children.length ? [...acc, item.id] : acc,
      []
    );

    return removeChildrenOf(
      flattenedTree,
      activeId ? [activeId, ...collapsedItems] : collapsedItems
    );
  }, [activeId, items]);

  const projected =
    activeId && overId
    ? getProjection(
        flattenedItems,
        activeId,
        overId,
        offsetLeft,
        indentationWidth
      )
    : null;

  const sensorContext: SensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft,
  });
  
  const [coordinateGetter] = useState(() =>
    sortableTreeKeyboardCoordinates(sensorContext, indentationWidth)
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  );

  const sortedIds = useMemo(() => flattenedItems.map(({id}) => id), [
    flattenedItems,
  ]);
  const activeItem = activeId
    ? flattenedItems.find(({id}) => id === activeId)
    : null;

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft,
    };
  }, [flattenedItems, offsetLeft]);

  const announcements: Announcements = {
    onDragStart(id) {
      return `Picked up ${id}.`;
    },
    onDragMove(id, overId) {
      return getMovementAnnouncement('onDragMove', id, overId);
    },
    onDragOver(id, overId) {
      return getMovementAnnouncement('onDragOver', id, overId);
    },
    onDragEnd(id, overId) {
      return getMovementAnnouncement('onDragEnd', id, overId);
    },
    onDragCancel(id) {
      return `Moving was cancelled. ${id} was dropped in its original position.`;
    },
  };

  return (
    <DndContext
      announcements={announcements}
      sensors={sensors}
      // modifiers={indicator ? [adjustTranslate] : undefined}
      modifiers={indicator ? [adjustTranslate] : undefined}
      collisionDetection={closestCenter}
      layoutMeasuring={measuring}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map(item => {
          const {id} = item
          return (
            <SortableTreeItem
              key={id}
              id={id}
              value={id}
              depth={id === activeId && projected ? projected.depth : item.depth}
              indentationWidth={indentationWidth}
              indicator={indicator}
              collapsed={Boolean(item.collapsed && item.children?.length)}
              onCollapse={
                collapsible && item.children?.length
                  ? () => handleCollapse(id)
                  : undefined
              }
              onRemove={removable ? () => handleRemove(id) : undefined}
            />
          )
        })}
        {createPortal(
          <DragOverlay dropAnimation={dropAnimation}>
            {activeId && activeItem ? (
              <TreeItem
                depth={activeItem.depth}
                clone
                childCount={getChildCount(items, activeId) + 1}
                value={activeId}
                indentationWidth={indentationWidth}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </SortableContext>
    </DndContext>
  );

  function handleDragStart({active: {id: activeId}}: DragStartEvent) {
    setActiveId(activeId);
    setOverId(activeId);

    const activeItem = flattenedItems.find(({id}) => id === activeId);

    if (activeItem) {
      setCurrentPosition({
        parentId: activeItem.parentId,
        overId: activeId,
      });
    }

    document.body.style.setProperty('cursor', 'grabbing');
  }

  function handleDragMove({delta}: DragMoveEvent) {
    setOffsetLeft(delta.x);
  }

  function handleDragOver({over}: DragOverEvent) {
    setOverId(over?.id ?? null);
  }

  function handleDragEnd({active, over}: DragEndEvent) {
    resetState();

    if (projected && over) {
      const {depth, parentId} = projected;
      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(items))
      );
      const overIndex = clonedItems.findIndex(({id}) => id === over.id);
      const activeIndex = clonedItems.findIndex(({id}) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];

      clonedItems[activeIndex] = {...activeTreeItem, depth, parentId};

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
      const newItems = buildTree(sortedItems);

      setItems(newItems);
    }
  }

  function handleDragCancel() {
    resetState();
  }

  function resetState() {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);
    setCurrentPosition(null);

    document.body.style.setProperty('cursor', '');
  }

  function handleRemove(id: string) {
    setItems((items) => removeItem(items, id));
  }

  function handleCollapse(id: string) {
    setItems((items) =>
      setProperty(items, id, 'collapsed', (value) => {
        console.log(value);
        return !value;
      })
    );
  }

  function getMovementAnnouncement(
    eventName: string,
    activeId: string,
    overId?: string
  ) {
    if (overId && projected) {
      if (eventName !== 'onDragEnd') {
        if (
          currentPosition &&
          projected.parentId === currentPosition.parentId &&
          overId === currentPosition.overId
        ) {
          return;
        } else {
          setCurrentPosition({
            parentId: projected.parentId,
            overId: null,
          });
        }
      }

      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(items))
      );
      const overIndex = clonedItems.findIndex(({id}) => id === overId);
      const activeIndex = clonedItems.findIndex(({id}) => id === activeId);
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);

      const previousItem = sortedItems[overIndex - 1];

      let announcement;
      const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved';
      const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested';

      if (!previousItem) {
        const nextItem = sortedItems[overIndex + 1];
        announcement = `${activeId} was ${movedVerb} before ${nextItem.id}.`;
      } else {
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`;
        } else {
          let previousSibling: FlattenedItem | undefined = previousItem;
          while (previousSibling && projected.depth < previousSibling.depth) {
            const parentId: string | null = previousSibling.parentId;
            previousSibling = sortedItems.find(({id}) => id === parentId);
          }

          if (previousSibling) {
            announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`;
          }
        }
      }

      return announcement;
    }

    return;
  }
}
