import usePageTitle from '../../../hooks/usePageTitle';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import AddTagModal from '../../../components/tags/AddTagModal';
import TagsTable from '../../../components/tags/TagsTable/TagsTable';
import { handleModal } from '../../../stores/modalStore';
import ButtonAdd from '../../../components/common/ButtonAdd';

const AdminCollections = () => {
  
  usePageTitle({ title: 'Collections' })
  
  const handleNewTagButton = (tagType='collection') => {
    handleModal({
      title: `Create a new ${tagType}`,
      size: 'lg',
      content: <AddTagModal type={tagType} />
    })
  }

  useHeaderButtons({
    id: 'createCollection',
    component: <ButtonAdd action={() => handleNewTagButton()} text='Create new collection' />
  })

  
  return (
    <>
    {/* <Button onClick=>Create new tag</Button> */}
    <TagsTable typeName='collection' />
    </>
  )
}

AdminCollections.navState = {
  topLevel: 'collections'
}

export default AdminCollections
