import useHeaderButtons from '../../../hooks/useHeaderButtons';
import EditTagForm from '../../../components/tags/EditTagForm';
import ButtonBack from '../../../components/common/ButtonBack';
import {ChevronRight} from "@styled-icons/boxicons-regular/ChevronRight";
import { useRouter } from 'next/router';
import useGetTag from '../../../hooks/tags/useGetTag';
import { ReactNode } from 'react';
import Link from 'next/link';
import usePageTitle from '../../../hooks/usePageTitle';

const AdminUsersTagsEdit = () => {
 
  const router = useRouter()
  const { id } = router.query
  const { tag } = useGetTag(id)
  
  let pageTitle: ReactNode = 'Categories'

  if(tag) {
    pageTitle = (
      <span className='flex items-center space-x-2'>
        <Link href="/admin/tags">
          <span>Categories</span>
        </Link>
        <ChevronRight size={20} />
        <span>{tag.label}</span>
      </span>
    )
  }

  usePageTitle({ title: `${tag?.label} | Category`, header: pageTitle })
  
  useHeaderButtons({
    id: 'backToTags',
    component: <ButtonBack text='Back to categories list' action='/admin/tags' />,
  })

  return (
    <EditTagForm typeName={ 'category' } />
  )
}

AdminUsersTagsEdit.navState = {
  topLevel: 'categories'
}
export default AdminUsersTagsEdit
