import { VideoPersonCall } from '@styled-icons/fluentui-system-filled/VideoPersonCall'
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"

export const contentTypes = {
  course: {
    name: 'course',
    pluralKey: 'courses',
    plural: 'courses',
    label: "Course",
    icon: GraduationCap,
    editUrl: 'admin/courses/edit',
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
    icon: GraduationCap,
    editUrl: 'admin/pathways/edit'
  },
  resource: {
    name: 'resource',
    pluralKey: 'resources',
    plural: 'resources',
    label: "Resource",
    icon: GraduationCap,
    editUrl: 'admin/resources/edit'
  },
  virtual: {
    label: "Virtual Event",
    readMoreLabel: "View event details",
    eventModel: "VirtualEvent",
    icon: VideoPersonCall,
    content: { blocks: [{type:'text'}]}
  }
}

