import { useMutation } from '@apollo/client';
import { CreateSection, CreateSectionVariables } from '../../graphql/mutations/section/__generated__/CreateSection';
import { CREATE_SECTION } from '../../graphql/mutations/section/CREATE_SECTION';
const useCreateSection = ({courseId}) => {
  
  const [createSectionMutation, newSection] = useMutation<CreateSection, CreateSectionVariables>(
    CREATE_SECTION,
  );

  const createSection = (values) => {
    createSectionMutation({
      variables: {
        title: values.title,
        parentIds: [courseId]
      },
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    newSection,
    createSection
  }
}

export default useCreateSection