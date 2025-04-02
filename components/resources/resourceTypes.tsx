import {Video} from '@styled-icons/fluentui-system-filled/Video'
import {Document} from '@styled-icons/fluentui-system-filled/Document'
import {Speaker2} from '@styled-icons/fluentui-system-filled/Speaker2'
import {Link} from '@styled-icons/entypo/Link'

export const resourceTypes = {
  document: {
    titleLabel: "Document name",
    chooseLabel: "Choose a document",
    label: "Document",
    readMoreLabel: 'View document',
    icon: Document,
    content: { blocks: [{type:'text'}]}
  },
  video: {
    titleLabel: "Video title",
    chooseLabel: "Choose a video",
    label: "Video",
    readMoreLabel: 'Watch now',
    icon: Video,
    content: { blocks: [{type:'video'}]}
  },
  audio: {
    titleLabel: "Audio title",
    chooseLabel: "Choose audio file",
    label: 'Audio',
    readMoreLabel: 'Listen now',
    icon: Speaker2,
    content: { blocks: [{type:'audio'}]}
  },
  link: {
    titleLabel: "Link title",
    chooseLabel: "Enter URL",
    label: 'Link',
    readMoreLabel: 'More details',
    icon: Link,
    content: { blocks: [{type:'button'}]}
  },
}

