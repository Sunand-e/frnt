import { useCallback, useState } from 'react'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
const CourseMultiLevelSelect = ({data, onChange}) => {
  
  const [selectedCourseIds, setSelectedCourseIds] = useState([])

  const handleChange = (currentNode, selectedNodes) => {
    // currentNode: { label, value, children, expanded, checked, className, ...extraProps })
    let ids = []
    selectedNodes.forEach(node => {
      if(data.some(tag => tag.id === node.value)) {
        ids.push(...node.children.map(child => child.value))
      } else {
        ids.push(node.value)
      }
    })
    // setSelectedCourseIds(ids)

  }

  return (<>
{/* <pre>
{ JSON.stringify(selectedCourseIds,null,2) }
</pre> */}
    <DropdownTreeSelect className='multilevel-select' showPartiallySelected data={data} onChange={handleChange} />
  </>
  )
}

export default CourseMultiLevelSelect