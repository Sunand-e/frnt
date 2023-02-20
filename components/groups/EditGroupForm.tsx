import useGetGroup from '../../hooks/groups/useGetGroup';
import useUpdateGroup from '../../hooks/groups/useUpdateGroup';
import { useRouter } from '../../utils/router';
import GroupForm from './GroupForm';

const EditGroupForm = () => {

  const router = useRouter()
  const { id } = router.query

  const { group } = useGetGroup(id)
  const { updateGroup } = useUpdateGroup(group?.id);

  const onSubmit = (values) => {
    updateGroup(values)
    router.push('/admin/users/groups')
  }

  return group && <GroupForm group={group} onSubmit={onSubmit} />
}

export default EditGroupForm