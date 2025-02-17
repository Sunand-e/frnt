import useGetCourses from '../../../hooks/courses/useGetCourses';
import CourseActionsMenu from './CourseActionsMenu';
import ContentTable from '../../common/tables/ContentTable';
import { contentTypes } from '../../common/contentTypes';
import { useEffect } from "react";
import { useViewStore } from '../../../hooks/useViewStore';

const CoursesTable = () => {

  const { courses, loading, error, loadMore, hasMore } = useGetCourses();
  const type = contentTypes['course']
  const scrollableRef = useViewStore((state) => state.mainScrollableRef);

  useEffect(() => {
    if (!scrollableRef.current) {
      return;
    }
  
    const handleScroll = () => {
      if (
        scrollableRef.current.scrollTop + scrollableRef.current.clientHeight >=
        scrollableRef.current.scrollHeight - 10
      ) {
        loadMore();
      }
    };
  
    scrollableRef.current.addEventListener("scroll", handleScroll, { passive: true });
  
    return () => {
      scrollableRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [scrollableRef, loadMore, hasMore]);
  

  return (
    <ContentTable content={courses} type={type} loading={loading} error={error} ActionsMenuComponent={CourseActionsMenu} />
  )
}

export default CoursesTable
