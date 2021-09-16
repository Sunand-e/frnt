import type {MutableRefObject} from 'react';

export interface TreeItem {
  id: string;
  children?: TreeItem[];
  collapsed?: boolean;
  type: 'section' | 'lesson' | 'quiz'
}

export type TreeItems = TreeItem[];

export interface FlattenedItem extends TreeItem {
  parentId: null | string;
  depth: number;
  index: number;
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;
