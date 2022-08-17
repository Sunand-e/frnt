import { VideoPersonCall } from '@styled-icons/fluentui-system-filled/VideoPersonCall'
import { Event } from '@styled-icons/material-outlined/Event'

export const eventItemTypes = {
  physical: {
    label: "Physical Event",
    readMoreLabel: "View event details",
    eventModel: "PhysicalEvent",
    icon: Event,
    content: { blocks: [{type:'text'}]}
  },
  virtual: {
    label: "Virtual Event",
    readMoreLabel: "View event details",
    eventModel: "VirtualEvent",
    icon: VideoPersonCall,
    content: { blocks: [{type:'text'}]}
  }
}

