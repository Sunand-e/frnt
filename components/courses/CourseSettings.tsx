import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import useUpdateCourse from '../../hooks/courses/useUpdateCourse';
import useGetUserCourse from '../../hooks/users/useGetUserCourse';
import CheckboxInput from '../common/inputs/CheckboxInput';
import ImageSelectInput from '../common/inputs/ImageSelectInput';
import TextInput from '../common/inputs/TextInput';
import TipTapInput from '../common/inputs/TipTapInput';
import TagSelectInput from '../tags/inputs/TagSelectInput';
import { AnimatePresence, motion } from "framer-motion";
import ScoreFromModuleIdsInput from './inputs/ScoreFromModuleIdsInput';

interface CourseSettingsFormValues {
  title: string
  imageId: string
  image: string
  content: {
    description: JSON
  }
  settings: {
    isScored: Boolean
    hasCertificate: JSON
    passMark: Number
    scoreFromModuleIds: Array<string>
  }
  tags: [any]
  accessType: string
  coursePrice: string
  enablePrerequisites: boolean
  disableProgression: boolean
}

const CourseSettings = ({options={}}) => {

  const router = useRouter()
  const { id } = router.query

  const { courseEdge } = useGetUserCourse(id)
  const course = courseEdge?.node

  const { updateCourse } = useUpdateCourse(id)
  
  const debouncedUpdate = useDebouncedCallback((values) => {
    updateCourse(values);
  }, 500);
  
  const { sections, ...cachedValues } = course
  const defaultValues = {
    ...cachedValues,
    tags: course?.tags?.edges.map(({node}) => {
      const {__typename, image, order, ...value} = node
      return value
    }) || [], 
  }

  const { register, watch, handleSubmit, control, setFocus, formState: { errors } } = useForm<CourseSettingsFormValues>({defaultValues});


  useEffect(() => {
    const subscription = watch((data, options) => {
      if(options.type === 'change') {
        switch(options.name) {
          case 'title':
          case 'content.description':
          case 'settings.passMark': {
            debouncedUpdate(data)
            break;
          }
          default: {
            updateCourse(data)
          }
        }
      }
    })
    return () => subscription.unsubscribe()

  },[watch, updateCourse])

  const isScored = watch('settings.isScored');

  return (
    <div className={`flex flex-col space-y-3 pb-2`}>
      <TextInput
        label="Course name"
        placeholder="Untitled course"
        inputAttrs={{
          ...register("title", {
            required:"Course name is required"
          }),
          // onChange: (e) => debouncedUpdate({title: e.target.value})
        }}
        // onClick
      />
      <div className='max-w-5xl shadow bg-main/10'>
        <ImageSelectInput
          buttonText="Choose course image"
          className={'max-w-sm'}
          origImage={defaultValues?.image}
          control={control}
          name="imageId"
          // onSelect={image => updateCourse({imageId: image.id})}
          // inputAttrs={register("image", { required: true })}
        />
      </div>
      <TagSelectInput
        control={control}
        tagType="category"
        label="Categories"
        // onChange={(tags) => updateCourse({tags})}
      />
      <TipTapInput
        label={`Description`}
        name='content.description'
        control={control}
        content={course?.content?.description}
      />
      <CheckboxInput
        label="Scored course"
        labelClassName='text-sm font-medium'
        inputAttrs={register("settings.isScored")}
        options={[
          { text: 'Yes', value: true },
          { text: 'No', value: false }
        ]}
      />

      <AnimatePresence>
        { isScored && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ScoreFromModuleIdsInput
              control={control}
              label={'Score from:'}
            />
            {/* <TextInput
              label="Pass mark (%)"
              type="number"
              inputAttrs={{
                ...register("settings.passMark", {
                  valueAsNumber: true
                }),
                min: 0,
                max: 100
              }}
            /> */}
          </motion.div>
        )}
      </AnimatePresence>
      
      <CheckboxInput
        label="Award certificate?"
        labelClassName='text-sm font-medium'
        inputAttrs={register("settings.hasCertificate")}
      />
    </div>
  )
}

export default CourseSettings