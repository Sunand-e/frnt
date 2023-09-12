import { gql, useMutation } from '@apollo/client';
import { CreateSection, CreateSectionVariables } from '../../graphql/mutations/section/__generated__/CreateSection';
import { CREATE_SECTION } from '../../graphql/mutations/section/CREATE_SECTION';
import { contentItemDefaults } from '../contentItems/contentItemDefaults';

export const CourseSectionsFragment = gql`
  fragment CourseSectionsFragment on ContentItem {
    sections {
      __typename
      id
      _deleted @client
    }
  }
`

const useCreateSection = ({courseId}) => {
  
  const [createSectionMutation, newSection] = useMutation<CreateSection, CreateSectionVariables>(
    CREATE_SECTION,
    {
      update(cache, { data: { createSection } } ) {
        console.log('createSection.section')
        console.log(createSection.section)
        cache.updateFragment<CourseSectionsFragmentFragment>({
          id:`ContentItem:${courseId}`,
          fragment: CourseSectionsFragment,
          optimistic: true
        }, (data) => {
          const sections = [
            // ...data.lessons.filter(child => child._deleted === false),
            ...data.sections,
            createSection.section
          ]
          console.log('sections')
          console.log(sections)
          return {
            sections
          }
        })
      },
     }
  );

  const createSection = (values) => {
    createSectionMutation({
      variables: {
        title: values.title,
        parentIds: [courseId]
      },

      optimisticResponse: {
        createSection: {
          __typename: 'CreateSectionPayload',
          section: {
            ...contentItemDefaults,
            id: 'temp-' + Math.floor(Math.random() * 10000),
            title: values.title,
            itemType: 'section',

            users: {
              __typename: 'ContentUserConnection',
              totalCount: 0
            },
            tags: [],
            children: [],
            order: 9999321,
          },
          message: ''
        }
      }
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