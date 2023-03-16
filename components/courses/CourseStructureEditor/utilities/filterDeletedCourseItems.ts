export function filterDeletedCourseItems(course) {
  return course && ({
    ...course,
    sections: course?.sections.filter(section => !section._deleted).map(section => {
      return ({
        ...section,
        children: section.children.filter(child => !child._deleted)
      })
    }) || []
  })
}