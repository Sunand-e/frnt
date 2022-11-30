import { useContext, useEffect, useState } from 'react'
import usePageTitle from '../../../hooks/usePageTitle';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import { ModalContext } from '../../../context/modalContext';
import AddTagModal from '../../../components/tags/AddTagModal';
import TagsTable from '../../../components/tags/TagsTable/TagsTable';
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
  topLevel: 'categories'
}

export default AdminTags
