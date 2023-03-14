import CourseStructureCached from '../components/courses/CourseStructureEditor/CourseStructureCached'
import CourseStructureEditor from '../components/courses/CourseStructureEditor/CourseStructureEditor'
import SidebarEditableItem from '../components/courses/CourseStructureEditor/SidebarEditableItem'
import { viewVar } from '../graphql/cache'
import TestLayout from '../layouts/TestLayout'

const StructurePage = () => {

  viewVar({isSlimNav: true})

  return (
    <div className='flex w-full justify-between'>
    <CourseStructureEditor renderItem={SidebarEditableItem}/>
    <CourseStructureCached />
    </div>
  )
}

StructurePage.getLayout = page => (
  <TestLayout
    page={page}
  />
)
export default StructurePage