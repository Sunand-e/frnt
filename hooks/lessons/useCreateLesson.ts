import { gql, useMutation } from '@apollo/client';
import { SectionFragment } from "../../graphql/queries/allQueries";
import { CreateLesson, CreateLessonVariables } from '../../graphql/mutations/lesson/__generated__/CreateLesson';
import { CREATE_LESSON } from '../../graphql/mutations/lesson/CREATE_LESSON';
import { GetSection, GetSection_section } from '../../graphql/queries/__generated__/GetSection';
import { useEffect, useState } from 'react';
import { SectionChildrenFragmentFragment } from '../../graphql/generated';
import { GET_USER_COURSE } from '../../graphql/queries/users';
import { useRouter } from '../../utils/router';

export const SectionChildrenFragment = gql`
  fragment SectionChildrenFragment on ContentItem {
    children {
      __typename
      id
      _deleted @client
    }
    lessons {
      id
      _deleted @client
    }
  }
`

function useCreateLesson(sectionId) {

  const [createLessonMutation, createLessonResponse] = useMutation<CreateLesson, CreateLessonVariables>(
    CREATE_LESSON,
    {
      update(cache, { data: { createLesson } } ) {

        cache.updateFragment<SectionChildrenFragmentFragment>({
          id:`ContentItem:${sectionId}`,
          fragment: SectionChildrenFragment
        }, (data) => ({
          children: [
            // ...data.children.filter(child => child._deleted === false),
            ...data.children,
            createLesson.lesson
          ],
          lessons: [
            // ...data.lessons.filter(child => child._deleted === false),
            ...data.lessons,
            createLesson.lesson
          ]
        }))
      },
 
    }
  );

  const createLesson = (values) => {
    createLessonMutation({
      variables: {
        ...values,
        parentIds: [sectionId]
      },
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }



  useEffect(() => {
    // console.log('createLessonResponse')
    // console.log(createLessonResponse)
  }, [createLessonResponse])

  return {
    lesson: createLessonResponse.data?.createLesson?.lesson,
    createLesson
  }
}

export default useCreateLesson