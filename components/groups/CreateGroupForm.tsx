import useCreateGroup from '../../hooks/groups/useCreateGroup';
import { useRouter } from 'next/router';
import React from "react";
import GroupForm from './GroupForm';

const CreateGroupForm = () => {

  const router = useRouter()
  
  const { createGroup } = useCreateGroup();

  const onSubmit = (values) => {
    createGroup(values)
    router.push('/admin/users/groups')
  }

  return <GroupForm onSubmit={onSubmit} />
}

export default CreateGroupForm
