import usePageTitle from "../hooks/usePageTitle";
import Categories from '../components/categories/Categories';

const CategoriesPage = () => {

  usePageTitle({ title: 'Categories' })
  
  return (
    <Categories />
  )
}

CategoriesPage.navState = {
  topLevel: 'categories'
}

export default CategoriesPage
