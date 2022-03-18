import { useMutation } from '@apollo/client';
import { SectionFragment } from "../../graphql/queries/allQueries";
import { CreateLesson, CreateLessonVariables } from '../../graphql/mutations/lesson/__generated__/CreateLesson';
import { CREATE_LESSON } from '../../graphql/mutations/lesson/CREATE_LESSON';
import { GetSection, GetSection_section } from '../../graphql/queries/__generated__/GetSection';
import { useEffect, useState } from 'react';

function useCreateLesson(sectionId) {

  const [createLessonMutation, createLessonResponse] = useMutation<CreateLesson, CreateLessonVariables>(
    CREATE_LESSON,
    {
      update(cache, { data: { createLesson } } ) {
        
        const section = cache.readFragment<GetSection_section>({
          id:`ContentItem:${sectionId}`,
          fragment: SectionFragment,
          fragmentName: 'SectionFragment'
        })
        const newSectionData = {
          ...section,
          children: [...section.children, createLesson.lesson]
        }

        cache.writeFragment<GetSection_section>({
          id:`ContentItem:${sectionId}`,
          fragment: SectionFragment,
          fragmentName: 'SectionFragment',
          data: newSectionData
        })
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
    console.log('createLessonResponse')
    console.log(createLessonResponse)
  }, [createLessonResponse])

  return {
    lesson: createLessonResponse.data?.createLesson?.lesson,
    createLesson
  }
}

export default useCreateLesson