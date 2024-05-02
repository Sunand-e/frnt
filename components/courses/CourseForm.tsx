import Button from '../common/Button';
import { useForm } from 'react-hook-form';
import TextInput from '../common/inputs/TextInput';
import React, { useContext, useEffect } from 'react';
import ImageSelectInput from '../common/inputs/ImageSelectInput';
import TagSelectInput from '../tags/inputs/TagSelectInput';
import TipTapInput from '../common/inputs/TipTapInput';

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

const CourseForm = ({course=null, onSubmit, showDescription=false, extended=false, submitButtonText="Submit", autoFocus=false}) => {

  const defaultValues = {
    ...course,
    tags: course?.tags?.edges.map(({node}) => {
      const {__typename, image, order, ...value} = node
      return value
    }) || [], 
  }

  const { register, watch, handleSubmit, control, setFocus, formState: { errors } } = useForm<CourseFormValues>({defaultValues});

  useEffect(() => {
    autoFocus && setFocus('title')
  },[])
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={'flex flex-col space-y-4'}
    >
      <div className='flex space-x-6 max-w-screen-xl'>
        <div className={`${!!showDescription && 'w-1/2'} flex flex-col space-y-4`}>
          <TextInput
            label="Course name"
            placeholder="Untitled course"
            inputAttrs={register("title", {
              // required:"Course name is required"
            })}
          />
          {errors.title && (<small className="text-danger text-red-500">{errors.title.message}</small>)}
          <div className='max-w-5xl shadow bg-main/10'>
            <ImageSelectInput
              // placeholder={'https://picsum.photos/640/360'}
              buttonText="Choose course image"
              className={showDescription ? '' : 'max-w-sm'}
              origImage={defaultValues?.image}
              control={control}
              name="imageId"
              class
              // inputAttrs={register("image", { required: true })}
            />
          </div>
          <TagSelectInput
            control={control}
            tagType="category"
            label="Categories"
            isMulti={true}
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
          
      <Button type="submit">{submitButtonText}</Button>
        </div>
        { showDescription && (
          <div className="w-1/2 flex flex-col">
            <TipTapInput
              placeholder={'Enter description here...'}
              editorClasses={'min-h-[20em]'}
              label={`Description`}
              name='description'
              control={control}
              content={course?.content?.description}
            />
            {/* <RTEInput
              initialValue={course?.content?.description}
              label="Description"
              name="content"
              control={control}
            /> */}
          </div>
        )}
      </div>
    </form>
  )
}

export default CourseForm
