import Button from '../common/Button';
import { useForm } from 'react-hook-form';
import TextInput from '../common/inputs/TextInput';
import React, { useEffect } from 'react';
import RoleCapabilitiesInput from './inputs/RoleCapabilitiesInput';
import RoleTypeSelect from './inputs/RoleTypeSelect';

interface RoleFormValues {
  name?: string 
  email: string
  roleType: string
}

const RoleForm = ({role=null, onSubmit}) => {

  const defaultValues = {
    ...role,
    capabilityIds: role?.capabilities.map(capability => capability.id),
  }
  
  const { register, handleSubmit, control, setFocus, formState: { errors } } = useForm<RoleFormValues>(
    { defaultValues }
  );

  useEffect(() => {
    setFocus('name')
  },[])

  const buttonText = role ? 'Save changes' : 'Create role'
  
  return (
    <form
      className='h-full w-full max-w-screen-lg flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="Role name"
        placeholder="Role name"
        inputAttrs={register("name", {
          required: "Role name is required",
          maxLength: 20
        })}
      />
      {errors.name && (<small className="text-danger text-red-500">{errors.name.message}</small>)}
      <RoleTypeSelect control={control} />

      <RoleCapabilitiesInput control={control} />

      <Button type="submit">{buttonText}</Button>
    </form>
  )
}

export default RoleForm
