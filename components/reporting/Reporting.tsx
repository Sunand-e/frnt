// import { useRouter } from '../../utils/router';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CoursesReportTable from './course/CoursesReportTable';
import CourseUsersReportTable from './course/CourseUsersReportTable';
import LessonUsersReportTable from './course/LessonUsersReportTable';
import GroupsReportTable from './group/GroupsReportTable';
import UserCoursesReportTable from './user/UserCoursesReportTable';
import UserLessonsReportTable from './user/UserLessonsReportTable';
import UsersReportTable from './user/UsersReportTable';

const Reporting = () => {

  const router = useRouter()

  const { 
    user: userId, 
    group: groupId, 
    course: courseId, 
    lesson: lessonId, 
    category: categoryId, 
    type
  } = router.query

  let TableComponent = CoursesReportTable;
  let tableProps = {};
  
  if(type === 'user') {
    TableComponent = UsersReportTable;
  }
  
  if(type === 'group') {
    TableComponent = GroupsReportTable;
  }
  
  if(userId) {
    if(lessonId) {
      TableComponent = () => <p>User's lesson statistics for lesson with id: {lessonId}</p>
    } else if(courseId) {
      TableComponent = UserLessonsReportTable
    } else {
      // cOURSE REPORT FOR USER: ''
      TableComponent = UserCoursesReportTable
    }
  } else {
    if(lessonId) {
      // User REPORT FOR Lesson: ''
      TableComponent = LessonUsersReportTable
    } else if(courseId) {
      // User REPORT FOR Course: ''
      TableComponent = CourseUsersReportTable
    }
  }

  return (
    <>
      { TableComponent && <TableComponent {...tableProps} /> }
    </>
  )
}

export default Reporting
