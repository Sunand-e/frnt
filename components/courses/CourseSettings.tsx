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
import FontFamilySelect from '../common/inputs/FontFamilySelect';
import ColorPickerInput from '../common/ContentEditor/blocks/common/settings/inputs/ColorPickerInput';
import { SwitchInput } from '../common/inputs/SwitchInput';

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
    frontPage: {
      enabled: boolean
      bgImageEnabled: boolean
      overlayColor: string
      bgColor: string
      backgroundPosition: string
    }
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
    settings: {
      ...cachedValues.settings,
      frontPage: {
        overlayColor: 'rgba(0,0,0,0.5)',
        ...cachedValues.settings?.frontPage
      }
    },
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

  const updateFont = (font, target) => {
    if(!['headings', 'body'].includes(target)) {
      return false;
    }
    const fontData = { name: font.value, type: font.type }  
    updateCourse({
      settings: {
        ...course.settings,
        fonts: {
          ...course.settings.fonts,
          [target]: fontData,
        },
        frontPage: {
          ...course.settings.frontPage,
          [target]: fontData,
        }
      }
    })
  }

  const [isScored, fpEnabled, fpBgImageEnabled] = watch([
    'settings.isScored',
    'settings.frontPage.enabled',
    'settings.frontPage.bgImageEnabled'
  ]);
  
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
      <SwitchInput
        name={'settings.frontPage.enabled'}
        control={control}
        label={'Show course front page'}
      />
      { fpEnabled && (
        <>
          <SwitchInput
            name={'settings.frontPage.bgImageEnabled'}
            control={control}
            label={'Front page background image'}
          />
          { fpBgImageEnabled ? (
            <>
              <ColorPickerInput
                label="Overlay color"
                name='settings.frontPage.overlayColor'
                clearOrReset='reset'
                defaultValue='rgba(0,0,0,0.5)'
                control={control}
                showAlpha={true}
              />
              {/* <ReactSelectInput
                control={control}
                menuPlacement={'auto'}
                slim={true}
                className={'text-sm'}
                name={'settings.frontPage.backgroundPosition'}
                label="Background position"
                options={[
                  { label: 'Center', value: 'center' },
                  { label: 'Top', value: 'top' },
                  { label: 'Bottom', value: 'bottom' }
                ]}
              /> */}
            </>
          ) : (
            <ColorPickerInput
              label="Front page background color"
              name='settings.frontPage.bgColor'
              control={control}
            />  
          )}
        </>
      )}
      <TagSelectInput
        control={control}
        tagType="category"
        label="Categories"
        // onChange={(tags) => updateCourse({tags})}
      />
      {/* <TipTapInput
        label={`Description`}
        name='content.description'
        control={control}
        content={course?.content?.description}
      /> */}
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
      <label>
        <span className="text-gray-700 text-sm font-medium">Headings font</span>
        <FontFamilySelect
          value={course.settings.fonts?.headings?.name}
          onChange={font => updateFont(font, 'headings')}
        />
      </label>
      <label>
        <span className="text-gray-700 text-sm font-medium">Body font</span>
        <FontFamilySelect
          value={course.settings.fonts?.body?.name}
          onChange={font => updateFont(font, 'body')}
        />
      </label>
    </div>
  )
}

export default CourseSettings