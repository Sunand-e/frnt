import { VideoPersonCall } from '@styled-icons/fluentui-system-filled/VideoPersonCall'
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import { Flow } from '@styled-icons/fluentui-system-regular/Flow'
import {Library} from "@styled-icons/ionicons-solid/Library"

import { GET_COURSES } from '../../graphql/queries/courses/courses'
import { GET_PATHWAYS, GET_RESOURCES } from '../../graphql/queries/allQueries'
import { GET_CONTENT_ITEMS } from '../../graphql/queries/contentItems/GET_CONTENT_ITEMS'
import { DocumentNode } from 'graphql'
import { OperationVariables } from '@apollo/client'
import { StyledIcon } from '@styled-icons/styled-icon';

export enum ContentTypeStatus {
  NotStarted = 'not_started',
  InProgress = 'in_progress',
  Completed = 'completed',
}

export interface StatusStrings {
  readMoreLabel: string;
  noItemsText: string;
}

export interface ContentType {
  name: string;
  pluralKey: string;
  plural: string;
  label: string;
  pluralLabel: string;
  icon: StyledIcon | null; // Assuming icons are React components, adjust accordingly
  editUrl: string;
  gqlGetQuery: DocumentNode; // Assuming GraphQL queries are of type DocumentNode from 'graphql'
  gqlVariables?: OperationVariables
  isAssignable?: boolean;
  statusStrings?: Record<ContentTypeStatus, StatusStrings>;
}

export interface ContentTypes {
  [key: string]: ContentType;
}

export const contentTypes: ContentTypes = {
  course: {
    name: 'course',
    pluralKey: 'courses',
    plural: 'courses',
    label: "Course",
    pluralLabel: "Courses",
    icon: GraduationCap,
    editUrl: 'admin/courses/edit',
    gqlGetQuery: GET_COURSES,
    isAssignable: true,
    statusStrings: {
      
      not_started: {
        readMoreLabel: 'Start course',
        noItemsText: 'No courses found'
      },
      in_progress: {
        readMoreLabel: 'Continue course',
        noItemsText: 'No courses are currently in progress'
      },
      completed: {
        readMoreLabel: 'Review course',
        noItemsText: 'You have not completed any courses'
      }
    }
  },
  pathway: {
    name: 'pathway',
    pluralKey: 'pathways',
    plural: 'pathways',
    label: "Pathway",
    pluralLabel: "Pathways",
    icon: Flow,
    editUrl: 'admin/pathways/edit',
    gqlGetQuery: GET_PATHWAYS,
    isAssignable: true,
  },
  resource: {
    name: 'resource',
    pluralKey: 'resources',
    plural: 'resources',
    label: "Resource",
    pluralLabel: "Resources",
    icon: Library,
    editUrl: 'admin/resources/edit',
    gqlGetQuery: GET_RESOURCES,
    isAssignable: true,
  },
  content: {
    name: 'content',
    pluralKey: 'contentItems',
    plural: 'content',
    label: "Content",
    pluralLabel: "Contents",
    icon: GraduationCap,
    editUrl: 'admin/contents/edit',
    gqlGetQuery: GET_CONTENT_ITEMS,
    gqlVariables: {
      itemType: ['course', 'pathway', 'resource']
    },
    statusStrings: {
      not_started: {
        readMoreLabel: 'Start content',
        noItemsText: 'No content found'
      },
      in_progress: {
        readMoreLabel: 'Continue content',
        noItemsText: 'No content currently in progress'
      },
      completed: {
        readMoreLabel: 'Review content',
        noItemsText: 'You have not completed any content'
      }
    }
  },
  // virtual: {
  //   label: "Virtual Event",
  //   statusStrings: {
  //     readMoreLabel: "View event details"
  //   },
  //   eventModel: "VirtualEvent",
  //   icon: VideoPersonCall,
  //   content: { blocks: [{type:'text'}]}
  // }
}

