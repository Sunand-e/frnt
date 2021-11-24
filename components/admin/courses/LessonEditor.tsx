import ContentEditor from "../../ContentEditor/ContentEditor"
import { UPDATE_LESSON } from "../../../graphql/mutations/lesson/UPDATE_LESSON"
import { UpdateLesson, UpdateLessonVariables } from "../../../graphql/mutations/lesson/__generated__/UpdateLesson"
import { ContentFragment } from "../../../graphql/queries/allQueries"
import { ContentFragment as ContentFragmentType } from '../../../graphql/queries/__generated__/ContentFragment';
import { useMutation, useReactiveVar } from "@apollo/client"
import cache from "../../../graphql/cache"
import { useContext, useEffect, useRef, useState } from "react";
// import { ContentContext } from "../../../context/contentContext";
import { useDebouncedCallback } from "use-debounce";
import BlockEditor from "../../ContentEditor/BlockEditor";

const LessonEditor = ({lesson}) => {
  const [updateLesson, updatedLesson] = useMutation<UpdateLesson, UpdateLessonVariables>(
    UPDATE_LESSON
  );
  
  const saveLesson = (contentBlocks) => {
    console.log('saveLesson called')
    const cachedLesson = cache.readFragment<ContentFragmentType>({
      id:`ContentItem:${lesson.id}`,
      fragment: ContentFragment,
    })
    
    updateLesson({
      variables: {
        id: lesson.id,
        content: { blocks: contentBlocks }
      },
      optimisticResponse: {
        updateLesson: {
          __typename: 'UpdateLessonPayload',
          lesson: {
            ...cachedLesson,
            content: {
              blocks: contentBlocks 
            }
          },
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

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
      <BlockEditor blocks={lesson.content?.blocks || []} onUpdate={saveLesson} />
    </>
  )
}

export default LessonEditor