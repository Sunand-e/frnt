import { useContext } from "react";
import { TenantContext } from "../../context/TenantContext";
import useUpdateCourse from "../../hooks/courses/useUpdateCourse";
import { useDebouncedCallback } from "../../hooks/useDebouncedCallback";
import usePageTitle from "../../hooks/usePageTitle";
import useGetUserCourse from "../../hooks/users/useGetUserCourse";
import classNames from "../../utils/classNames";
import { useRouter } from "../../utils/router";
import Button from "../common/Button";
import Editor from "../common/inputs/Editor";

const CourseFrontPageEditor = () => {
  const router = useRouter();
  const { id } = router.query;


  const { courseEdge } = useGetUserCourse(id);
  const course = courseEdge?.node;

  const { updateCourse } = useUpdateCourse(id);
  
  const debouncedUpdate = useDebouncedCallback((values) => {
    updateCourse(values);
  }, 500);

  usePageTitle({ 
    title: course?.title,
  })

  const handleDescriptionChange = (value) => {
    debouncedUpdate({
      content: {
        ...course.content,
        description: value
      } 
    })
  };

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
          onUpdate={handleDescriptionChange}
          content={course?.content?.description}
          editorClass={"my-2"}
        />
      </div>
    </div>
  );
};

export default CourseFrontPageEditor;
