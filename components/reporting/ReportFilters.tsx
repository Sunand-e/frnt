// import { useRouter } from '../../utils/router';
import { useRouter } from 'next/router';
import GroupSelect from "../groups/inputs/GroupSelect";
import TagSelect from "../tags/inputs/TagSelect";
import CourseSelect from "../courses/inputs/CourseSelect";
import UserSelect from "../users/inputs/UserSelect";
import useGetGroups from '../../hooks/groups/useGetGroups';

const ReportFilters = ({filters=[]}) => {

  const router = useRouter()
  const { groups } = useGetGroups();

  const { 
    user: userId, 
    group: groupId, 
    course: courseId, 
    lesson: lessonId, 
    category: categoryId,
  } = router.query

  const clearFilters = () => {
    router.push({
      query: {
        ...router.query,
        ...filters.reduce((acc,curr)=> (acc[curr]='',acc),{})
      }
    })
  };


  return (
    <div className="flex items-center flex-col sm:flex-row space-x-2">
      {/* <div className="flex flex-col">
        <label className="text-left text-xs font-medium text-gray-500 uppercase">Report Type</label>
        <ReportTypeSelect
          selected={reportType}
          onSelect={(option) => {
            router.push({
              query: { type: option.value }
            });
          }}
        />
      </div> */}
      {groups && filters.includes('group') && (
        <div className="flex flex-col">
          <label className="text-left text-xs font-medium text-gray-500 uppercase">in group</label>
          <GroupSelect
          selected={groupId as string}
          onSelect={group => {
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
            onSelect={user => {
              // alert(JSON.stringify(user,null,2))
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
            onSelect={course => {
              // alert(JSON.stringify(course,null,2))
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
            label="in category"
            selected={categoryId}
            tagType={`category`}
            onSelect={tag => {
              // alert(JSON.stringify(tag,null,2))
              router.push({
                query: { ...router.query, tag: tag?.id }
              });
            }}
          />
        </div>
      )}
      { !!filters.length && filters.length > 1 && (
        <div className="flex flex-col">
          <span className={`h-4`}></span>
          <span
            className={`text-main-secondary hover:text-main p-1 px-3 cursor-pointer`}
            onClick={clearFilters}
          >
            clear filters
          </span>
        </div>
      )}

    </div>
  )
}

export default ReportFilters
