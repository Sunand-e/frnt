import { VideoPersonCall } from '@styled-icons/fluentui-system-filled/VideoPersonCall'
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"

export const contentTypes = {
  course: {
    name: 'course',
    pluralKey: 'courses',
    plural: 'courses',
    label: "Course",
    icon: GraduationCap,
    editUrl: 'admin/courses/edit'
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

