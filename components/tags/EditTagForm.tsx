import cache from '../../graphql/cache';
import { TagFragmentFragment } from '../../graphql/generated';
import { TagFragment } from '../../graphql/queries/tags';
import useGetCourses from '../../hooks/courses/useGetCourses';
import useGetPathways from '../../hooks/pathways/useGetPathways';
import useGetResources from '../../hooks/resources/useGetResources';
import useGetTags from '../../hooks/tags/useGetTags';
import useUpdateTag from '../../hooks/tags/useUpdateTag';
import useTenantFeaturesEnabled from '../../hooks/users/useTenantFeaturesEnabled';
import { useRouter } from '../../utils/router';
import { contentTypes } from '../common/contentTypes';
import { tagTypes } from '../common/tagTypes';
import TagContent from './content/TagContent';
import TagForm from './TagForm';
import Tabs from '../common/containers/Tabs';
import { useEffect, useState } from 'react';
const EditTagForm = ({typeName=null}) => {

  const tagType = tagTypes[typeName]
  const router = useRouter()
  const { id } = router.query

  const { courses } = useGetCourses()
  const { resources } = useGetResources()
  const { pathways } = useGetPathways()
  
  const [activeTab, setActiveTab] = useState('courses')

  const { tenantFeaturesEnabled } = useTenantFeaturesEnabled()
  
  const tag = cache.readFragment<TagFragmentFragment>({
    id:`Tag:${id}`,
    fragment: TagFragment
  },true)

  const { updateTag } = useUpdateTag(tag?.id);
  
  const onSubmit = (values) => {
    updateTag(values)
    router.push(tagType.indexUrl)
  }
  
  const getContentTypeTagCount = (connection) => {
    return connection.edges.filter(edge => edge.node.tags.edges.find(({node}) => node.id === tag.id)).length
  }
  
  const tabs = [
    {name: 'courses', title: 'Courses', count: getContentTypeTagCount(courses)},
    {name: 'resources', title: 'Resources', count: getContentTypeTagCount(resources)},
    {name: 'pathways', title: 'Pathways', count: getContentTypeTagCount(pathways)},
  ].filter(tab => tenantFeaturesEnabled(tab.name))

  return tag && (
    <div className='flex space-x-0 flex-col w-full max-w-screen-lg md:flex-row md:space-x-11'>
      <TagForm tag={tag} typeName={tag.tagType} onSubmit={onSubmit} />
    <div className='flex flex-col w-full mt-4 md:mt-0 bg-secondar'>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='mb-4'
      />
      { activeTab === 'courses' && tenantFeaturesEnabled('courses') && <TagContent tag={tag} contentType={contentTypes.course} content={courses} /> }
      { activeTab === 'resources' && tenantFeaturesEnabled('resources') && <TagContent tag={tag} contentType={contentTypes.resource} content={resources} /> }
      { activeTab === 'pathways' && tenantFeaturesEnabled('pathways') && <TagContent tag={tag} contentType={contentTypes.pathway} content={pathways} /> }
    </div>
  </div>
  )
}

export default EditTagForm