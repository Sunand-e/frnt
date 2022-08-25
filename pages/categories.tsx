import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from "../hooks/usePageTitle";
import useGetCourses from "../hooks/courses/useGetCourses"
import CourseTabs from '../components/dashboard/CourseTabs';
import Catalogue from '../components/catalogue/Catalogue';
import { useRouter } from '../utils/router';

const CataloguePage = () => {

  usePageTitle({ title: 'Catalogue' })
  
  return (
    <>
      <Catalogue />
    </>
  )
}

CataloguePage.navState = {
  topLevel: 'courses',
  secondary: 'categories'
}

export default CataloguePage
