import { OperationVariables } from "@apollo/client";
import { DocumentNode } from "graphql";
import {Library} from "@styled-icons/ionicons-solid/Library"
import {Category} from "@styled-icons/material-rounded/Category"
import {Collections} from '@styled-icons/material/Collections'


enum TagTypeStatus {
  NotStarted = 'not_started',
  InProgress = 'in_progress',
  Completed = 'completed',
}

interface StatusStrings {
  readMoreLabel: string;
  noItemsText: string;
}

interface TagType {
  name: string;
  pluralKey: string;
  label: string;
  heirarchical: boolean;
  icon: React.ComponentType; // Assuming icons are React components, adjust accordingly
  editUrl: string;
  indexUrl: string;
  isAssignable?: boolean;
  statusStrings?: Record<TagTypeStatus, StatusStrings>;
}

interface TagTypes {
  [key: string]: TagType;
}

export const tagTypes: TagTypes = {
  collection: {
    name: 'collection',
    pluralKey: 'collections',
    heirarchical: false,
    label: "Collection",
    icon: Collections,
    indexUrl: '/admin/collections',
    editUrl: '/admin/collections/edit',
    isAssignable: true,
    statusStrings: {
      not_started: {
        readMoreLabel: 'Start collection',
        noItemsText: 'No collections found'
      },
      in_progress: {
        readMoreLabel: 'Continue collection',
        noItemsText: 'No collections are currently in progress'
      },
      completed: {
        readMoreLabel: 'Review collection',
        noItemsText: 'You have not completed any collections'
      }
    }
  },
  category: {
    heirarchical: true,
    name: 'category',
    pluralKey: 'categories',
    label: "Category",
    icon: Category,
    indexUrl: '/admin/tags',
    editUrl: '/admin/tags/edit',
    isAssignable: true,
    statusStrings: {
      not_started: {
        readMoreLabel: 'Start category',
        noItemsText: 'No categories found'
      },
      in_progress: {
        readMoreLabel: 'Continue category',
        noItemsText: 'No categories are currently in progress'
      },
      completed: {
        readMoreLabel: 'Review category',
        noItemsText: 'You have not completed any categories'
      }
    }
  },
}

