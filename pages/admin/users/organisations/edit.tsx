import Link from 'next/link';
import { ReactNode } from 'react';
import ButtonBack from '../../../../components/common/ButtonBack';
import LoadingSpinner from '../../../../components/common/LoadingSpinner';
import { Dot } from '../../../../components/common/misc/Dot';
import OrganisationForm from '../../../../components/groups/organisations/OrganisationForm';
import useGetGroup from '../../../../hooks/groups/useGetGroup';
import useHeaderButtons from "../../../../hooks/useHeaderButtons";
import usePageTitle from '../../../../hooks/usePageTitle';
import { useRouter } from '../../../../utils/router';
import {ChevronRight} from "@styled-icons/boxicons-regular/ChevronRight";

const AdminOrganisationsEdit = () => {

  useHeaderButtons({
    id: "backToOrganisations",
    component: <ButtonBack text="Back to organisation list" action="/admin/users/organisations" />
  });
  
  
  const router = useRouter()
  const { id } = router.query
  const { group, loading } = useGetGroup(id)
  
  let pageTitle: ReactNode = 'Organisations'

  if(group) {
    pageTitle = (
      <span className='flex items-center space-x-2'>
        <Link href="/admin/users/organisations">
          <span>Organisations</span>
        </Link>
        <ChevronRight size={20} />
        <span>{group.name}</span>
      </span>
    )
  }

  usePageTitle({ title: pageTitle })

  return (
    <>
      { loading ? (
        <LoadingSpinner text={(
          <>
            Loading organisation details
            <Dot>.</Dot>
            <Dot>.</Dot>
            <Dot>.</Dot>
          </>
        )} />
      ) : !!group && (
        <OrganisationForm />
      )}
    </>
  )
}

AdminOrganisationsEdit.capabilities = ['UpdateGroup']
AdminOrganisationsEdit.navState = {
  topLevel: 'users',
  secondary: 'organisations'
}

export default AdminOrganisationsEdit
