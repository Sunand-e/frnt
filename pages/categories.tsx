import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from "../hooks/usePageTitle";
import useGetCourses from "../hooks/courses/useGetCourses"
import CourseTabs from '../components/dashboard/CourseTabs';
import Categories from '../components/categories/Categories';
import { useRouter } from '../utils/router';

const CategoriesPage = () => {

  usePageTitle({ title: 'Categories' })
  
  return (
    <>
      <Categories />
    </>
  )
}

CategoriesPage.navState = {
  topLevel: 'courses',
  secondary: 'categories'
}

export default CategoriesPage
