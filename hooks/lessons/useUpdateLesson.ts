import { UpdateLesson, UpdateLessonVariables } from "../../graphql/mutations/lesson/__generated__/UpdateLesson";
import { UPDATE_LESSON } from "../../graphql/mutations/lesson/UPDATE_LESSON"
import { ContentFragment, GET_LESSON } from "../../graphql/queries/allQueries"
import { ContentFragment as ContentFragmentType } from '../../graphql/queries/__generated__/ContentFragment';
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import cache from "../../graphql/cache"

function useUpdateLesson() {

  const [updateLessonMutation, updateLessonResponse] = useMutation<UpdateLesson, UpdateLessonVariables>(
    UPDATE_LESSON
  );

  const updateLesson = id => async values => {
  // const updateLesson = ({title=null, contentBlocks=null}) => {
    const cachedLesson = cache.readFragment<ContentFragmentType>({
      id:`ContentItem:${id}`,
      fragment: ContentFragment,
      fragmentName: 'ContentFragment',
    })

    /*
     * If the lesson contains a package block, get the scormId
     * and pass it to the mutation as a variable 
     */
    const scormBlock = values.content?.blocks?.find(block => block.type === 'package')
    const scormId = scormBlock?.properties?.moduleId

    await updateLessonMutation({
      variables: {
        id,
        ...values,
        ...(scormId && {scormId})
      },
      optimisticResponse: {
        updateLesson: {
          __typename: 'UpdateLessonPayload',
          lesson: {
            ...cachedLesson,
            ...values
          },
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    updateLesson,
  }
}

export default useUpdateLesson