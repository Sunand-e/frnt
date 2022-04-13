import Button from '../../Button';
import { useForm } from 'react-hook-form';
import TextInput from '../../common/inputs/TextInput';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import RoleCapabilitiesInput from './inputs/RoleCapabilitiesInput';
import RoleTypeSelect from './inputs/RoleTypeSelect';

interface RoleFormValues {
  name?: string 
  email: string
  roleImage: string
  userRole: string
}

const RoleForm = ({role=null, onSubmit}) => {

  const defaultValues = {
    ...role,
    capabilityIds: role?.capabilities.map(capability => capability.id),
  }
  
  const { register, handleSubmit, control, setFocus } = useForm<RoleFormValues>(
    { defaultValues }
  );

  useEffect(() => {
    setFocus('name')
  },[])

  const buttonText = role ? 'Save changes' : 'Create role'
  
  return (
    <form
      className='h-full w-full max-w-lg flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="Role name"
        placeholder="Role name"
        inputAttrs={register("name", { maxLength: 20 })}
      />
      <RoleTypeSelect control={control} />

      <RoleCapabilitiesInput control={control} />

      <Button type="submit">{buttonText}</Button>
    </form>
  )
}

export default RoleForm