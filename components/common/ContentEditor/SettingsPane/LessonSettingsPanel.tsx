import useUpdateLesson from "../../../../hooks/lessons/useUpdateLesson";
import { useRouter } from "../../../../utils/router";
import TextInput from "../../inputs/TextInput";

import { useForm } from 'react-hook-form';
import { useFragment_experimental } from "@apollo/client";
import { LessonFragment } from "../../../../graphql/queries/allQueries";
import CheckboxInput from "../../inputs/CheckboxInput";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

interface LessonSettingsFormValues {
  title: string
}
export const LessonSettingsPanel = () => {

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
  
    const { updateLesson } = useUpdateLesson()
    
    const debouncedUpdate = useDebouncedCallback((values) => {
      updateLesson(contentId)(values);
    }, 500);
    
    const { register, watch, handleSubmit, control, setFocus, formState: { errors } } = useForm<LessonSettingsFormValues>({defaultValues});
  
  
    useEffect(() => {
      const subscription = watch((data, options) => {
        if(options.type === 'change') {
          switch(options.name) {
            case 'title': {
              debouncedUpdate(data)
              break;
            }
            default: {
              updateLesson(contentId)(data)
            }
          }
        }
      })
      return () => subscription.unsubscribe()
  
    },[watch, contentId])
  
    return (
      <form>
        <div className={`flex flex-col space-y-3`}>
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
        </div>
      </form>
    )
  }
  
  export default LessonSettingsPanel