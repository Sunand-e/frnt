import usePageTitle from '../../../hooks/usePageTitle';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import AddTagModal from '../../../components/tags/AddTagModal';
import TagsTable from '../../../components/tags/TagsTable/TagsTable';
import { handleModal } from '../../../stores/modalStore';
import ButtonAdd from '../../../components/common/ButtonAdd';

const AdminTags = () => {
  
  usePageTitle({ title: 'Categories' })
  
  const handleNewTagButton = (tagType='category') => {
    handleModal({
      title: `Create a new ${tagType}`,
      size: 'lg',
      content: <AddTagModal type={tagType} />
    })
  }

  useHeaderButtons({
    id: 'createTag',
    component: <ButtonAdd action={() => handleNewTagButton()} text='Create new category' />
  })

  
  return (
    <>
      <TagsTable typeName='category' />
    </>
  )
}

AdminTags.navState = {
  topLevel: 'categories'
}

export default AdminTags
