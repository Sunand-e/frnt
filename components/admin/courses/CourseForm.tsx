import Button from '../../Button';
import { useForm } from 'react-hook-form';
import TextInput from '../../common/inputs/TextInput';
import { useEffect } from 'react';
import ImageSelectInput from '../../common/inputs/ImageSelectInput';
import SelectInput from '../../common/inputs/SelectInput';
import TagSelectInput from '../tags/inputs/TagSelectInput';
import CheckboxInput from '../../common/inputs/CheckboxInput';

interface CourseFormValues {
  title: string
  imageId: string
  tags: [any]
  accessType: string
  coursePrice: string
  enablePrerequisites: boolean
  disableProgression: boolean
}

const CourseForm = ({course=null, onSubmit, submitButtonText="Submit"}) => {

  const defaultValues = {
    ...course
  }

  const { register, watch, handleSubmit, control, setFocus } = useForm<CourseFormValues>({defaultValues});

  useEffect(() => {
    setFocus('title')
  },[])

  const watchTags = watch("tags"); // you can supply default value as second argument

  useEffect(() => {
console.log('watchTags')
console.log(watchTags)
  }, [watch("tags")]);

  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="Course name"
        placeholder="Untitled course"
        inputAttrs={register("title", { /*maxLength: 20*/ })}
      />
      <ImageSelectInput
        placeholder={'https://picsum.photos/640/360'}
        buttonText="Choose course image"
        control={control}
        name="imageId"
        // inputAttrs={register("image", { required: true })}
      />
      <TagSelectInput
        control={control}
        tagType="category"
        label="Categories"
      />
      <SelectInput
        label="Course access type"
        options={["Open access", "Assignable", "Paid access"]}
        inputAttrs={register("accessType")}
      />
      <TextInput
        label="Course price"
        placeholder="Untitled course"
        inputAttrs={register("coursePrice")}
      />
      <CheckboxInput
        label="Enable prerequisites"
        inputAttrs={register("enablePrerequisites")}
      />
      {/* <CheckboxInput
        label="Disable lesson progression"
        inputAttrs={register("disableProgression")}
      /> */}
      <Button type="submit">{submitButtonText}</Button>
      {/* <p className='text-lg font-bold mt-4'>Create your first course item:</p>
      <AddItemToCourseForm sectionId={123} /> */}
    </form>
  )
}

export default CourseForm