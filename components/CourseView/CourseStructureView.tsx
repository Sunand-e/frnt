import Link from "next/link"

const CourseStructureView = ({course}) => {

  return (
    <>
      { course && (
        <ul className="p-4">
          { course.sections.filter(section => section.children.length).map(section => (
            <li key={section.id} className="mb-3">
              <span className="text-lg">{section.title}</span>
              <ul>
                { section.children.map(item => (
                  <li key={item.key}>
                    <Link href={`/course?id=${course.id}&cid=${item.id}`}>
                      <a>
                        <span className="min-w-0 flex-0 text-sm font-medium text-indigo-600">
                          {item.title}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
export default CourseStructureView