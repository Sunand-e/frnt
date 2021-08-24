import CourseCreateForm from '../../../components/admin/courses/CourseCreateForm';
import PageTitle from '../../../components/PageTitle';
import BlockWithTitle from '../../../components/BlockWithTitle';
import { headerButtonsVar } from '../../../graphql/cache';
import Builder from '../../../components/admin/CourseBuilder/Builder';
import AdminSidebar from "../../../components/admin/CourseBuilder/AdminSidebar";
import SaveButton from "../../../components/admin/CourseBuilder/SaveButton";
const AdminCoursesAdd = () => {
  const data = {
    course: {
      name: 'aaa',
      title: 'bbb',
      content: {},
      sections: []
    }
  }
  return (
    <>
      <PageTitle title="Add new course" />
      <CourseCreateForm />
      <div className="flex p-2">

        <AdminSidebar>

          <SaveButton onClick={() => handleSaveClick()} />

        </AdminSidebar>
      </div>
      
    </>
  )
}

AdminCoursesAdd.navState = {
topLevel: 'courses',
secondary: 'courses'
}

export default AdminCoursesAdd