import { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle';
import Button from '../../../components/Button';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import { ModalContext } from '../../../context/modalContext';
import AddTagModal from '../../../components/admin/tags/AddTagModal';
import TagsTable from '../../../components/admin/tags/TagsTable/TagsTable';
import {Add} from "@styled-icons/fluentui-system-filled/Add";


const AddButton = () => (
  <>
    <span className='hidden lg:block'>Create new category</span>
    <span className='block lg:hidden'><Add  width="20" /></span>
  </>
)

const AdminTags = () => {
  
  usePageTitle({ title: 'Categories' })

  const { handleModal } = useContext(ModalContext);
  
  const handleNewTagButton = (tagType='category') => {
    handleModal({
      title: `Create a new ${tagType}`,
      size: 'lg',
      content: <AddTagModal type={tagType} />
    })
  }

  useHeaderButtons([
    [<AddButton />, () => handleNewTagButton()]
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
