import { gql, useMutation } from '@apollo/client';
import { CreateSection, CreateSectionVariables } from '../../graphql/mutations/section/__generated__/CreateSection';
import { CREATE_SECTION } from '../../graphql/mutations/section/CREATE_SECTION';

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
            __typename: 'ContentItem',
            id: Math.floor(Math.random() * 10000) + '-',
            title: values.title,
            createdAt: '',
            updatedAt: '',
            content: {},
            contentType: null,
            itemType: 'section',
            image: null,
            icon: null,
            prerequisites: null,
            _deleted: false,
            settings: '',
            shared: false,
            mediaItem: null,
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