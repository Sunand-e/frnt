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
  
  let pageTitle: ReactNode = 'Collections'

  if(tag) {
    pageTitle = (
      <span className='flex items-center space-x-2'>
        <Link href="/admin/collections">
          <span>Collections</span>
        </Link>
        <ChevronRight size={20} />
        <span>{tag.label}</span>
      </span>
    )
  }

  usePageTitle({ title: pageTitle })
    useHeaderButtons({
    id: 'backToCollections',
    component: <ButtonBack text='Back to collections list' action='/admin/collections' />,
  })

  return (
    <EditTagForm typeName={ 'collection' } />
  )
}

AdminUsersTagsEdit.navState = {
  topLevel: 'collections'
}
export default AdminUsersTagsEdit
