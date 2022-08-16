import {TextLeft} from '@styled-icons/bootstrap'

export const eventItemTypes = {
  physical: {
    label: "Physical Event",
    readMoreLabel: "Physical Event",
    icon: TextLeft,
    content: { blocks: [{type:'text'}]}
  },
  virtual: {
    label: "Virtual Event",
    readMoreLabel: 'Virtual Event',
    icon: TextLeft,
    content: { blocks: [{type:'text'}]}
  }
}

