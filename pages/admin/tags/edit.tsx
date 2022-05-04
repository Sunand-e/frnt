import { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../../../components/Button';
import usePageTitle from '../../../hooks/usePageTitle';
import { ModalContext } from '../../../context/modalContext';
import { useRouter } from '../../../utils/router';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import useGetTag from '../../../hooks/tags/useGetTag';
import GroupUsersInput from '../../../components/admin/groups/inputs/GroupUsersInput';
import TagForm from '../../../components/admin/tags/TagForm';
import useUpdateTag from '../../../hooks/tags/useUpdateTag';


const AdminUsersTagsEdit = () => {
  
  const router = useRouter()
  const { tag, loading, error } = useGetTag(router.query.id)
  const { updateTag } = useUpdateTag(router.query.id)

  const handleSubmit = (values) => {
    updateTag(values)
    router.push('/admin/users/roles')
  }
  usePageTitle({ title: 'Edit Tag' })

  useHeaderButtons([
    ['Back to tags list', '/admin/users/roles']
  ])

  return (
    <>
      { tag &&
        <>
          <h3>
            Editing tag: {tag.name}
          </h3>
          <TagForm onSubmit={handleSubmit} tag={tag} />
        </>
      }
    </>
  )
}

AdminUsersTagsEdit.navState = {
  topLevel: 'users',
  secondary: 'tags'
}
export default AdminUsersTagsEdit