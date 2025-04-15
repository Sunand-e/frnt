import usePageTitle from '../../hooks/usePageTitle'
import ResourceLibrary from '../../components/resources/ResourceLibrary/ResourceLibrary';

const Library = () => {

  usePageTitle({ title: 'Resource Library' })
  
  return (
    <ResourceLibrary />
  )
}

Library.navState = {
  topLevel: 'library',
  secondary: 'overview'
}

export default Library