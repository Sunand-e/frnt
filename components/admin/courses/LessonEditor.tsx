import { UPDATE_LESSON } from "../../../graphql/mutations/lesson/UPDATE_LESSON"
import { UpdateLesson, UpdateLessonVariables } from "../../../graphql/mutations/lesson/__generated__/UpdateLesson"
import { ContentFragment, GET_LESSON } from "../../../graphql/queries/allQueries"
import { ContentFragment as ContentFragmentType } from '../../../graphql/queries/__generated__/ContentFragment';
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import cache, { currentContentItemVar } from "../../../graphql/cache"
import { useContext, useEffect, useRef, useState } from "react";
// import { ContentContext } from "../../../context/contentContext";
import { useDebouncedCallback } from "use-debounce";
import BlockEditor from "../../ContentEditor/BlockEditor";
import EasyEdit, {Types} from 'react-easy-edit';
import { ContentTitle } from "../../ContentEditor/ContentTitle";
import useUpdateLesson from "../../../hooks/lessons/useUpdateLesson";
const LessonEditor = ({id}) => {

  const {
    lesson,
    loading,
    error,
    updateLessonContent,
    updateLessonTitle
  } = useUpdateLesson(id)
  
  currentContentItemVar({
    ...lesson,
    updateFunction: updateLessonContent,
    updateTitleFunction: updateLessonTitle,
  })
  // const {content, setContent} = useContext(ContentContext)

  // const debouncedContentCallback = useDebouncedCallback((content) => {
  //   saveLesson(content);
  // }, 600);

  // const contentChanged = useRef(false);

  // useEffect(() => {
  //   if (contentChanged.current) {
  //     debouncedContentCallback(content)
  //   }
  //   else contentChanged.current = true;
  // }, [content]);

  return (
    <>
    
      <ContentTitle />
      {/* <EasyEdit
        type={Types.TEXT}
        onSave={saveLessonTitle}
        saveButtonLabel="Save"
        cancelButtonLabel="Cancel"
        attributes={{ name: "awesome-input", id: 1}}
        value={lesson.title}
      /> */}
      <BlockEditor />
      {/* <pre>
      {JSON.stringify(currentContentItemVar(),null,2)}
      </pre> */}
    </>
  )
}

export default LessonEditor