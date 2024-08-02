import axios from 'axios';
import { useContext } from 'react';
import ButtonBack from '../../../components/common/ButtonBack';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { Dot } from '../../../components/common/misc/Dot';
import UserContent from '../../../components/users/content/UserContent';
import UserGroups from '../../../components/users/groups/UserGroups';
import UserForm from '../../../components/users/UserForm';
import { TenantContext } from '../../../context/TenantContext';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import usePageTitle from '../../../hooks/usePageTitle';
import useGetUser from '../../../hooks/users/useGetUser';
import useIsOrganisationLeader from '../../../hooks/users/useIsOrganisationLeader';
import useTenantFeaturesEnabled from '../../../hooks/users/useTenantFeaturesEnabled';
import useUpdateUser from '../../../hooks/users/useUpdateUser';
import useUpdateUserTenantRoles from '../../../hooks/users/useUpdateUserTenantRoles';
import useUserHasCapability from '../../../hooks/users/useUserHasCapability';
import useUploadAndNotify from '../../../hooks/useUploadAndNotify';
import getJWT from '../../../utils/getToken';
import { useRouter } from '../../../utils/router';

const AdminUsersEdit = () => {
  
  const router = useRouter()
  const { id } = router.query
  const { user, loading, error } = useGetUser(id)

  const tenant = useContext(TenantContext)
  const { userHasCapability } = useUserHasCapability()
  const { tenantFeaturesEnabled } = useTenantFeaturesEnabled()
  const { updateUser } = useUpdateUser(id)
  const { updateUserTenantRoles } = useUpdateUserTenantRoles()
  
  const { isOrganisationLeader } = useIsOrganisationLeader()
  const { uploadFilesAndNotify } = useUploadAndNotify({
    method: "PUT"
  })

  const handleSubmit = ({profile_image, invite, ...values}) => {

    const token = getJWT();

    updateUser(values, () => userHasCapability('UpdateUserTenantRoles') && updateUserTenantRoles({
      userId: id,
      roleIds: values.role_ids
    }))

    if(invite) {
      axios.request({
        method: "post", 
        url: '/api/v1/users/send_invitation',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: { emails: [values.email] }
      })
    }
    if(profile_image) {
      const imageEndpoint = `/api/v1/users/${id}/update_profile_image`
      profile_image instanceof File && uploadFilesAndNotify(imageEndpoint, {profile_image})
    }
    router.push('/admin/users')
  }

  usePageTitle({ title: `Edit User${user ? `: ${user.fullName}` : ''}` })

  useHeaderButtons({
    id: "backToUsers",
    component: <ButtonBack text="Back to user list" action="/admin/users" />
  });

  const showGroups = (
    tenantFeaturesEnabled('groups') && !isOrganisationLeader
  )

  const showOrganisations = (
    tenantFeaturesEnabled('organisations') && !isOrganisationLeader
  )

  return (
    <>
      { loading ? (
        <LoadingSpinner text={(
          <>
            Loading user details
            <Dot>.</Dot>
            <Dot>.</Dot>
            <Dot>.</Dot>
          </>
        )} />
      ) : !!user && (
        <div className='flex space-x-0 flex-col w-full max-w-screen-lg md:flex-row md:space-x-11'>
          {/* <pre>
          { JSON.stringify(id,null,2) }
          { JSON.stringify(user,null,2) }
          </pre> */}
          <UserForm onSubmit={handleSubmit} user={user} />
          <div className='flex flex-col w-full space-y-8 mt-4 md:mt-0'>
            { userHasCapability('SeeGroups', 'tenant') && (<>
              { showGroups && <UserGroups groupTypeName="group" /> }
              { showOrganisations && <UserGroups groupTypeName="organisation" isSingular={true} /> }
            </>)}
            { tenantFeaturesEnabled('courses') && <UserContent contentType="course" />}
            { tenantFeaturesEnabled('resources') && <UserContent contentType="resource" />}
            { tenantFeaturesEnabled('pathways') && <UserContent contentType="pathway" />}
          </div>
        </div>
      )}
    </>
  )
}

AdminUsersEdit.navState = {
  topLevel: 'users',
  secondary: 'users'
}
export default AdminUsersEdit
