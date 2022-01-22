import { useRef, useEffect } from "react";
import { UpdateLesson, UpdateLessonVariables } from "../../graphql/mutations/lesson/__generated__/UpdateLesson";
import { UPDATE_LESSON } from "../../graphql/mutations/lesson/UPDATE_LESSON"
import { ContentFragment, GET_LESSON } from "../../graphql/queries/allQueries"
import { ContentFragment as ContentFragmentType } from '../../graphql/queries/__generated__/ContentFragment';
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import cache, { currentContentItemVar } from "../../graphql/cache"


function useLesson(id) {

  const [updateLesson, updatedLesson] = useMutation<UpdateLesson, UpdateLessonVariables>(
    UPDATE_LESSON
  );

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

  const saveLessonTitle = (title) => {
    saveLesson({
      title
    })
  }

  const saveLessonContent = (contentBlocks) => {
    saveLesson({
      contentBlocks
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

  return {
    lesson,
    loading,
    error,
    saveLessonContent,
    saveLessonTitle
  }
}

export default useLesson