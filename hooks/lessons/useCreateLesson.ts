import { useMutation } from '@apollo/client';
import { SectionFragment } from "../../graphql/queries/allQueries";
import { CreateLesson, CreateLessonVariables } from '../../graphql/mutations/lesson/__generated__/CreateLesson';
import { CREATE_LESSON } from '../../graphql/mutations/lesson/CREATE_LESSON';
import { GetSection, GetSection_section } from '../../graphql/queries/__generated__/GetSection';
import { useEffect } from 'react';

function useCreateLesson(sectionId) {

  const [createLessonMutation, createLessonResponse] = useMutation<CreateLesson, CreateLessonVariables>(
    CREATE_LESSON,
    {
      update(cache, { data: { createLesson } } ) {
        const sectionData = cache.readFragment<GetSection>({
          id:`ContentItem:${sectionId}`,
          fragment: SectionFragment,
          fragmentName: 'SectionFragment'
        })

        const newSectionData = {
          ...sectionData.section,
          children: [...sectionData.section.children, createLesson.lesson]
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
      // optimisticResponse: {
      //   createLesson: {
      //     __typename: 'CreateLessonPayload',
      //     lesson: {
      //       __typename: 'ContentItem',
      //       id: Math.floor(Math.random() * 10000) + '',
      //       title: values.title,
      //       createdAt: '',
      //       updatedAt: '',
      //       content: {},
      //       contentType: null,
      //       itemType: 'lesson',
      //       image: null,
      //       icon: null,
      //       prerequisites: null,
      //       _deleted: false,
      //     },
      //     message: ''
      //   }
      // }
      // refetchQueries: [{ query: GET_COURSE }]
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    createLesson,
    data: createLessonResponse?.data?.createLesson
  }
}

export default useCreateLesson