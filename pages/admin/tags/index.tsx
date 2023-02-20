import { useContext, useEffect, useState } from 'react'
import usePageTitle from '../../../hooks/usePageTitle';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import AddTagModal from '../../../components/tags/AddTagModal';
import TagsTable from '../../../components/tags/TagsTable/TagsTable';
import {Add} from "@styled-icons/fluentui-system-filled/Add";
import { handleModal } from '../../../stores/modalStore';


const AddButton = () => (
  <>
    <span className='hidden lg:block'>Create new category</span>
    <span className='block lg:hidden'><Add  width="20" /></span>
  </>
)

const AdminTags = () => {
  
  usePageTitle({ title: 'Categories' })
  
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
