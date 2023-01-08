
import { Download } from '@styled-icons/boxicons-regular/Download'
import { ExternalLinkOutline } from '@styled-icons/evaicons-outline/ExternalLinkOutline'
import ButtonLink from '../common/ButtonLink'

const ResourceActionButton = ({resource}) => {

  const type = resource.contentType
  let text, icon, url

  if(type === 'document' || type === 'audio') {
    text = `Download ${type} file`
    icon = Download
  }
  
  if(type === 'audio') {
    url = resource.audio?.location
  }

  if(type === 'document') {
    url = resource.document?.location
  }

  if(type === 'link') {
    text = `Visit link`
    icon = ExternalLinkOutline
    url = resource?.content?.url
  }
  
  const IconComponent = icon;
  return (
    <ButtonLink target="_blank" className="mb-8" href={url}>
      <span className="flex space-x-2 items-center">
        <IconComponent className="h-7" />
        <span>
          { text }
        </span>
      </span>
    </ButtonLink>
  )
}

export default ResourceActionButton