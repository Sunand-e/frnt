import cache from '../../graphql/cache';
import { TagFragmentFragment } from '../../graphql/generated';
import { TagFragment } from '../../graphql/queries/tags';
import useGetCourses from '../../hooks/courses/useGetCourses';
import useGetPathways from '../../hooks/pathways/useGetPathways';
import useGetResources from '../../hooks/resources/useGetResources';
import useGetTags from '../../hooks/tags/useGetTags';
import useUpdateTag from '../../hooks/tags/useUpdateTag';
import { useRouter } from '../../utils/router';
import { contentTypes } from '../common/contentTypes';
import TagContent from './content/TagContent';
import TagForm from './TagForm';

const EditTagForm = () => {

  const router = useRouter()
  const { id } = router.query

  const { tags } = useGetTags()
  const { courses } = useGetCourses()
  const { resources } = useGetResources()
  const { pathways } = useGetPathways()
  
  const tag = cache.readFragment<TagFragmentFragment>({
    id:`Tag:${id}`,
    fragment: TagFragment
  },true)

  const { updateTag } = useUpdateTag(tag?.id);
  
  const onSubmit = (values) => {
    updateTag(values)
    router.push('/admin/tags')
  }

  return tag && (
    <div className='flex space-x-0 flex-col w-full max-w-screen-lg md:flex-row md:space-x-11'>
      <TagForm tag={tag} onSubmit={onSubmit} />
    <div className='flex flex-col w-full space-y-8 mt-4 md:mt-0'>
      <TagContent tag={tag} contentType={contentTypes.course} content={courses} />
      <TagContent tag={tag} contentType={contentTypes.pathway} content={pathways} />
      <TagContent tag={tag} contentType={contentTypes.resource} content={resources} />
    </div>
  </div>
  )
}

export default EditTagForm