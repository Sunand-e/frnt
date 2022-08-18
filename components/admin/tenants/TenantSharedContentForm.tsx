import React, { useContext } from 'react';
import Button from '../../Button';
import TextInput from '../../common/inputs/TextInput';
import { useForm } from 'react-hook-form';
// import UserRoleSelect from './inputs/UserRoleSelect';
import ColorPickerInput from '../../common/inputs/ColorPickerInput';
import ImageDropzoneInput from '../../common/inputs/ImageDropzoneInput';
import useUploadAndNotify from '../../../hooks/useUploadAndNotify';
import SharedCoursesInput from './inputs/SharedCoursesInput';
import SharedPathwaysInput from './inputs/SharedPathwaysInput';
import SharedResourcesInput from './inputs/SharedResourcesInput';
import { useRouter } from '../../../utils/router';
import useShareContentItems from '../../../hooks/tenants/useShareContentItems';
import { gql, useQuery } from '@apollo/client';

interface TenantSharedContentFormValues {
  id?: string | string[]
  sharedCourseIds
  sharedPathwayIds
  sharedResourceIds  
}


const TENANT_SHARED_ITEMS = gql`
  query GetTenantSharedItems {
    courses {
      edges {
        node {
          fullName
        }
      }
    }
    pathways {
      edges {
        node {
          fullName
        }
      }
    }
    resources {
      edges {
        node {
          fullName
        }
      }
    }

  }
`


const TenantSharedContentForm = () => {

  const router = useRouter()
  const { id } = router.query

  const { shareContentItems } = useShareContentItems()
  
  const { loading, error, data } = useQuery(TENANT_SHARED_ITEMS);

  const defaultValues = {
    id,
    sharedCourseIds: data ? [...data?.courses.edges.map(edge => edge.node.id)]: [],
    sharedResourceIds: data ? [...data?.libraryItems.edges.map(edge => edge.node.id)]: [],
    sharedPathwayIds: data ? [...data?.pathways.edges.map(edge => edge.node.id)]: [],
    }

  const { watch, register, handleSubmit: rhfHandleSubmit, formState: { errors }, control } = useForm<TenantSharedContentFormValues>({
    defaultValues
  });

  const onSubmit = async (data) => {
    const contentItemIds = [
      ...data.sharedCourseIds,
      ...data.sharedResourceIds,
      ...data.sharedPathwayIds,
    ]
    shareContentItems({
      tenantId: id,
      contentItemIds
    })
  }
  
  const terwfds = watch()
  
  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={rhfHandleSubmit(onSubmit)}
    >
      <SharedCoursesInput control={control} />
      <SharedPathwaysInput control={control} />
      <SharedResourcesInput control={control} />
      <Button type="submit">Share content with this tenant</Button>
      <pre>
      { JSON.stringify(terwfds,null,2) }
      </pre>
    </form>
  );
}

export default TenantSharedContentForm
