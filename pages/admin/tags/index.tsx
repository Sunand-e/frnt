import { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle';
import Button from '../../../components/Button';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import { ModalContext } from '../../../context/modalContext';
import AddTagModal from '../../../components/admin/tags/AddTagModal';
import TagsTable from '../../../components/admin/tags/TagsTable/TagsTable';

const AdminTags = () => {
  
  usePageTitle({ title: 'Categories' })

  const { handleModal } = useContext(ModalContext);
  
  const handleNewTagButton = (tagType='category') => {
    handleModal({
      title: `Add a new tag`,
      size: 'lg',
      content: <AddTagModal type={tagType} />
    })
  }

  useHeaderButtons([
    ['Add new category', () => handleNewTagButton()]
  ])

  
  return (
    <>
    {/* <Button onClick=>Create new tag</Button> */}
    <TagsTable />
    </>
  )
}

AdminTags.navState = {
  topLevel: 'courses',
  secondary: 'categories'
}

export default AdminTags