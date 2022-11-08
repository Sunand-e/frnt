import Button from '../common/Button';
import { useForm } from 'react-hook-form';
import TextInput from '../common/inputs/TextInput';
import React, { useContext, useEffect } from 'react';
import ImageSelectInput from '../common/inputs/ImageSelectInput';
import SelectInput from '../common/inputs/SelectInput';
import TagSelectInput from '../tags/inputs/TagSelectInput';
import CheckboxInput from '../common/inputs/CheckboxInput';
import { ModalContext } from '../../context/modalContext';
import RTEInput from '../common/inputs/RTEInput';

interface CourseFormValues {
  title: string
  imageId: string
  image: string
  tags: [any]
  accessType: string
  coursePrice: string
  enablePrerequisites: boolean
  disableProgression: boolean
}

const CourseForm = ({course=null, onSubmit, isModal=false, submitButtonText="Submit"}) => {

  const defaultValues = {
    ...course,
    tags: course?.tags?.map(({__typename, image, ...value}) => value) || []
  }
  const { handleModal } = useContext(ModalContext)

  const { register, watch, handleSubmit, control, setFocus, getValues, setValue, formState: { errors } } = useForm<CourseFormValues>({defaultValues});

  useEffect(() => {
    setFocus('title')
  },[])

  const reopenFormInModal = (image) => {
    handleModal({
      title: `Course settings`,
      size: 'lg',
      content: <CourseForm course={{...getValues(), image}} isModal={true} onSubmit={onSubmit} submitButtonText="Save settings" />
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={'flex flex-col items-center space-y-4'}
    >
      <div className='flex space-x-6 max-w-screen-xl'>
        <div className={`${!isModal && 'w-1/2'} flex flex-col space-y-4`}>
          <TextInput
            label="Course name"
            placeholder="Untitled course"
            inputAttrs={register("title", {
              required:"Course name is required"
            })}
          />
          {errors.title && (<small className="text-danger text-red-500">{errors.title.message}</small>)}
          <div className='max-w-5xl shadow bg-main/10'>
            <ImageSelectInput
              // placeholder={'https://picsum.photos/640/360'}
              buttonText="Choose course image"
              className={isModal ? 'max-w-sm' : ''}
              origImage={defaultValues?.image}
              control={control}
              name="imageId"
              onSelect={isModal ? reopenFormInModal : null}
              class
              // inputAttrs={register("image", { required: true })}
            />
          </div>
          <TagSelectInput
            control={control}
            tagType="category"
            label="Categories"
            />
          {/* <SelectInput
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
            /> */}
          {/* <CheckboxInput
            label="Disable lesson progression"
            inputAttrs={register("disableProgression")}
          /> */}
        </div>
        { !isModal && (
          <div className="w-1/2 flex flex-col">
            <RTEInput
              initialValue={course?.content?.description}
              label="Description"
              name="content"
              control={control}
            />
          </div>
        )}
      </div>
      <Button type="submit">{submitButtonText}</Button>
      {/* <p className='text-lg font-bold mt-4'>Create your first course item:</p>
      <AddItemToCourseForm sectionId={123} /> */}
    </form>
  )
}

export default CourseForm
