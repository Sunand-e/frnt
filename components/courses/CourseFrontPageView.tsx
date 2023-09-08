import usePageTitle from "../../hooks/usePageTitle";
import useGetUserCourse from "../../hooks/users/useGetUserCourse";
import { useRouter } from "../../utils/router";
import Button from "../common/Button";
import Editor from "../common/inputs/Editor";

const CourseFrontPageView = () => {
  const router = useRouter();
  const { id } = router.query;

  const { courseEdge } = useGetUserCourse(id);
  const course = courseEdge?.node;

  usePageTitle({ 
    title: course?.title,
  })

  const handleGoToModules = () => {
    const firstItemInCourse = course?.sections.find(
      (section) => section.children?.filter(module => module._deleted !== true).length
    )?.children.find(module => module._deleted !== true)
    
    if(firstItemInCourse) {
      router.push({query: {
        ...router.query,
        cid: firstItemInCourse.id
      }})
    }
  }

  const statusButtonTextMap = new Map([
    ['in_progress', 'Continue course'],
    ['not_started', 'Start course'],
    ['completed', 'Review course']
  ])

  const buttonText = statusButtonTextMap.get(courseEdge.status || 'not_started')
  console.log('courseEdge')
  console.log(courseEdge)
  let bgImageCssString = "";
  if (course.settings.frontPage?.bgImageEnabled) {
    const overlayColor = course.settings.frontPage?.overlayColor || 'rgba(0,0,0,0.5)'
    bgImageCssString = `
      linear-gradient(
        ${overlayColor}, 
        ${overlayColor}
      ),
    `;
    bgImageCssString += `url(${course.image?.location})`;
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full min-h-[25rem] flex flex-col items-center justify-center text-white space-y-8 bg-main-secondary"
        style={{
          ...(course?.settings.frontPage?.bgColor && {backgroundColor: course?.settings.frontPage?.bgColor}),
          ...(course?.settings.frontPage?.bgImageEnabled && {
            backgroundImage: bgImageCssString,
          }),
          backgroundPosition: course.settings.frontPage?.backgroundPosition || 'center',
          backgroundSize: 'cover',
        }}
      >
        <h1 className='flex w-full max-w-screen-lg text-4xl'>
          {course.title}
        </h1>
        <div className='w-full max-w-screen-lg'>
          <Button onClick={handleGoToModules}>{buttonText}</Button>
        </div>
      </div>
      <div className='h-full w-full max-w-screen-lg pt-8 pb-14'>
        <Editor
          editable={false}
          content={course?.content?.description}
          editorClass={"my-2"}
        />
      </div>
    </div>
  );
};

export default CourseFrontPageView;
