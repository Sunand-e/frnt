import useUpdateLesson from "../../../../hooks/lessons/useUpdateLesson";
import { useRouter } from "../../../../utils/router";
import TextInput from "../../inputs/TextInput";

import { useForm } from 'react-hook-form';
import { useFragment_experimental } from "@apollo/client";
import { LessonFragment } from "../../../../graphql/queries/allQueries";

interface LessonFormValues {
  title: string
}
export const LessonModulePanel = () => {

  const router = useRouter()
  const { cid: contentId } = router.query

  const { complete, data, missing } = useFragment_experimental({
    fragment: LessonFragment,
    fragmentName: 'LessonFragment',
    from: { id: contentId, __typename: "ContentItem", },
  });
  
  const defaultValues = {
    ...data
  }
  
  const { register, watch, control, setFocus, getValues, setValue, formState: { errors } } = useForm<LessonFormValues>({defaultValues});

  const { updateLesson } = useUpdateLesson()
  
  const handleChangeValue = () => {
    console.log('lesson')
  }
  

  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className={'flex flex-col items-center space-y-4'}
    >
      <TextInput 
        inputAttrs={register("title", {
          required:"Lesson name is required"
        })}
      />      
    </form>
  )
}