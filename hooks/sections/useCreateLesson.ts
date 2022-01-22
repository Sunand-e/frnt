import { useMutation } from '@apollo/client';
import { SectionFragment } from "../../graphql/queries/allQueries";
import { CreateLesson, CreateLessonVariables } from '../../graphql/mutations/lesson/__generated__/CreateLesson';
import { CREATE_LESSON } from '../../graphql/mutations/lesson/CREATE_LESSON';
import { GetSection, GetSection_section } from '../../graphql/queries/__generated__/GetSection';
const useCreateLesson = ({sectionId}) => {
  
  const [createLessonMutation, newLesson] = useMutation<CreateLesson, CreateLessonVariables>(
    CREATE_LESSON,
    {
      update(cache, { data: { createLesson } } ) {
        const sectionData = cache.readFragment<GetSection>({
          id:`ContentItem:${sectionId}`,
          fragment: SectionFragment,
          fragmentName: 'SectionFragment'
        })

        const newSectionData = {
          ...sectionData,
          children: [...sectionData.children, createLesson.lesson]
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
        title: values.title,
        parentIds: [sectionId]        
      },
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    createLesson
  }
}

export default useCreateLesson