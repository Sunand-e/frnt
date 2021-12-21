import ContentEditor from "../../ContentEditor/ContentEditor"
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
const LessonEditor = ({id}) => {

  const [updateLesson, updatedLesson] = useMutation<UpdateLesson, UpdateLessonVariables>(
    UPDATE_LESSON
  );

  const saveLessonContent = (contentBlocks) => {
    saveLesson({
      contentBlocks
    })
  }
  
  const saveLessonTitle = (title) => {
    saveLesson({
      title
    })
  }

  const saveLesson = ({title=null, contentBlocks=null}) => {

    const cachedLesson = cache.readFragment<ContentFragmentType>({
      id:`ContentItem:${id}`,
      fragment: ContentFragment,
    })
    
    const variables = {
      ...(title && {title}),
      ...(contentBlocks && {content: {
        blocks: contentBlocks 
      }})
    }

    updateLesson({
      variables: {
        id,
        ...variables
      },
      optimisticResponse: {
        updateLesson: {
          __typename: 'UpdateLessonPayload',
          lesson: {
            ...cachedLesson,
            ...variables
          },
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  

  
  const { loading, error, data: {lesson} = {} } = useQuery(
    GET_LESSON,
    {
      variables: {
        id
      }
    }
  );

  currentContentItemVar({
    ...lesson,
    updateFunction: saveLessonContent,
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
    <h1 className="my-3">
    <EasyEdit
        type={Types.TEXT}
        onSave={saveLessonTitle}
        saveButtonLabel="Save"
        cancelButtonLabel="Cancel"
        attributes={{ name: "awesome-input", id: 1}}
        value={lesson.title}
      />

    </h1>
      <BlockEditor />
      {/* <pre>
      {JSON.stringify(currentContentItemVar(),null,2)}
      </pre> */}
    </>
  )
}

export default LessonEditor