import React, { useContext, useEffect, useState } from 'react';
import Button from '../common/Button';
import { useForm } from 'react-hook-form';
import SharedCoursesInput from './inputs/SharedCoursesInput';
import SharedPathwaysInput from './inputs/SharedPathwaysInput';
import SharedResourcesInput from './inputs/SharedResourcesInput';
import { useRouter } from '../../utils/router';
import useShareContentItems from '../../hooks/tenants/useShareContentItems';
import useGetSharedContentItems from '../../hooks/tenants/useGetSharedContentItems';
import useRevokeShareContentItems from '../../hooks/tenants/useRevokeShareContentItems';

interface TenantSharedContentFormValues {
  id?: string | string[]
  sharedCourseIds
  sharedPathwayIds
  sharedResourceIds  
}

const TenantSharedContentForm = () => {

  const router = useRouter()
  const { id } = router.query

  const { shareContentItems } = useShareContentItems()
  const { revokeShareContentItems } = useRevokeShareContentItems()
  const { sharedContentItems } = useGetSharedContentItems(id)

  const [initialIds, setInitialIds] = useState([])

  const defaultValues = {
    id,
    sharedCourseIds: sharedContentItems ? [...sharedContentItems?.courses.edges.map(edge => edge.node.id)]: [],
    sharedResourceIds: sharedContentItems ? [...sharedContentItems?.resources.edges.map(edge => edge.node.id)]: [],
    // sharedPathwayIds: sharedContentItems ? [...sharedContentItems?.pathways.edges.map(edge => edge.node.id)]: [],
  }

  const { handleSubmit: rhfHandleSubmit, formState: { errors }, control, reset } = useForm<TenantSharedContentFormValues>({
    defaultValues
  });

  useEffect(() => {
    reset(defaultValues);
    setInitialIds([
      ...defaultValues.sharedCourseIds,
      ...defaultValues.sharedResourceIds,
      // ...defaultValues.sharedPathwayIds,
    ])
  }, [sharedContentItems]);

  const onSubmit = async (data) => {

    const contentItemIds = [
      ...data.sharedCourseIds,
      ...data.sharedResourceIds,
      // ...data.sharedPathwayIds,
    ]

    // revoke sharing content items which were shared, but are not now
    let revokeIds = initialIds.filter(x => !contentItemIds.includes(x));
    let shareIds = contentItemIds.filter(x => !initialIds.includes(x));

    revokeShareContentItems({
      tenantId: id,
      contentItemIds: revokeIds
    })

    shareContentItems({
      tenantId: id,
      contentItemIds: shareIds
    })
    setInitialIds(contentItemIds)
  }
  
  return (
    <form
      className='h-full w-full flex flex-col space-y-4'
      onSubmit={rhfHandleSubmit(onSubmit)}
    >
      <SharedCoursesInput control={control} />
      <SharedResourcesInput control={control} />
      {/* <SharedPathwaysInput control={control} /> */}
      <Button type="submit">Share content with this tenant</Button>
    </form>
  );
}

export default TenantSharedContentForm
