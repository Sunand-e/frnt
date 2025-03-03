import { useRouter } from 'next/router';
import GroupSelect from "../groups/inputs/GroupSelect";
import TagSelect from "../tags/inputs/TagSelect";
import CourseSelect from "../courses/inputs/CourseSelect";
import UserSelect from "../users/inputs/UserSelect";
import useGetGroups from '../../hooks/groups/useGetGroups';
import useTenantFeaturesEnabled from '../../hooks/users/useTenantFeaturesEnabled';
import GlobalFilter from '../common/tables/GlobalFilter';
import { useTableContext } from '../common/tables/tableContext';
import MonthYearFilter from '../common/tables/MonthYearFilter';

const ReportFilters = ({ filters = [] }) => {

  const globalFilter = useTableContext(s => s.globalFilter)
  const setGlobalFilter = useTableContext(s => s.setGlobalFilter)
  const setMonthFilter = useTableContext(s => s.setMonthFilter)
  const setYearFilter = useTableContext(s => s.setYearFilter)

  const router = useRouter()
  const { tenantFeaturesEnabled } = useTenantFeaturesEnabled()
  const { groups } = useGetGroups();

  const {
    user: userId,
    group: groupId,
    course: courseId,
    lesson: lessonId,
    category: categoryId,
  } = router.query

  const cleared = !globalFilter

  const clearFilters = () => {
    setGlobalFilter && setGlobalFilter('')
  };


  return (
    <div className='flex items-center flex-col sm:flex-row gap-3 flex-wrap'>
      {filters.includes('global') && <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />}

      {filters.includes('month') && <MonthYearFilter
        setMonthFilter={setMonthFilter}
        setYearFilter={setYearFilter}
      />}

      {tenantFeaturesEnabled('groups') && groups && filters.includes('group') && (
        <div className="flex flex-col">
          <GroupSelect
            defaultValueId={groupId as string}
            placeholder="All groups"
            onSelect={(group: any) => {
              router.push({
                query: { ...router.query, group: group?.id }
              });
            }}
          />
        </div>
      )}
      {filters.includes('user') && (
        <div className="flex flex-col">
          <label className="text-left text-xs font-medium text-gray-500 uppercase">for user</label>
          <UserSelect
            selected={userId}
            onSelect={(user: any) => {
              router.push({
                query: { ...router.query, user: user?.id }
              });
            }}
          />
        </div>
      )}
      {filters.includes('course') && (
        <div className="flex flex-col">
          <label className="text-left text-xs font-medium text-gray-500 uppercase">in course</label>
          <CourseSelect
            options={courseId}
            onSelect={(course: any) => {
              router.push({
                query: { ...router.query, course: course?.id }
              });
            }}
          />
        </div>
      )}
      {filters.includes('category') && (
        <div className="flex flex-col">
          <TagSelect
            selected={categoryId}
            tagType={`category`}
            onSelect={(tag: any) => {
              router.push({
                query: { ...router.query, tag: tag?.id }
              });
            }}
          />
        </div>
      )}

      {!!filters.length && !cleared && (
        <span className={`text-main-secondary whitespace-nowrap hover:text-main p-1 px-3 cursor-pointer`} onClick={clearFilters}>clear filters</span>
      )}
    </div>
  )
}

export default ReportFilters
