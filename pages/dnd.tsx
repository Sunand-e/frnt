import PageTitle from "../components/PageTitle"
import CourseStructureEditor from "../components/CourseStructureEditor/CourseStructureEditor"

const CourseStructure = () => {

  const course = {
    children: [
      {
        id: '1314r1',
        type: 'section',
        title: 'Section 1',
        children: [
          {
            id: '1314r133',
            type: 'lesson',
            title: 'lesson 1'
          },
          {
            id: '1314r13321',
            type: 'lesson',
            title: 'lesson 2'
          }
        ]
      },
      {
        id: '1314r13321qw',
        type: 'section',
        title: 'Section 2',
        children: [
          {
            id: '1333',
            type: 'lesson',
            title: 'lesson 3'
          },
          {
            id: '1333SS',
            type: 'lesson',
            title: 'lesson 4'
          }
        ]
      },
      {
        id: '1333SSDA',
        type: 'lesson',
        title: 'Summary'
      },
      {
        id: '1333SsSDA',
        type: 'quiz',
        title: 'Final Quiz'
      }
    ]
  }

  return (
    <>
      <PageTitle title="Course Structure" />
      <CourseStructureEditor course={course} />
    </>
  )
}

export default CourseStructure