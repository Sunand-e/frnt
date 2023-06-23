import useGetTags from "../../../hooks/tags/useGetTags"
import Select from "react-select";
import { useController } from "react-hook-form";
import useGetUserCourse from "../../../hooks/users/useGetUserCourse";
import { useRouter } from "../../../utils/router";
import { useState } from "react";

const ScoreFromModuleIdsInput = ({control, label}) => {

  const router = useRouter()
  const { id } = router.query

  const { modules } = useGetUserCourse(id)

  const scoredModules = modules.edges.filter(edge => (
    edge.node.itemType === 'quiz' ||
    edge.node.contentType === 'scorm_assessment'
  )).map(edge => {
    let label = edge.node.title
    if(!label) {
      label = 'Untitled ',
      label += edge.node.itemType === 'quiz' ? 'Quiz' : 'SCORM module'
        'Quiz'
    }
    return { label, value: edge.node.id  }
  })

  // const scoredModules = [1,2,3,4,5]
  const { field } = useController({
    control,
    name: 'settings.scoreFromModuleIds',
  })
  
  const selectedModules = scoredModules.filter(option => field.value?.includes(option.value));

  const selectProps = {
    // isMulti: true,
    options: scoredModules,
    value: selectedModules,
    onChange: val => {
      // console.log(val.map(v => v.value))
      // field.onChange(val.map(v => v.value))
      console.log(val.value)
      field.onChange([val.value])
    },
    getOptionValue: option => option.value ?? option.id,
    className: `w-full`,
    isSearchable: false,
    styles:{ menuPortal: base => ({ ...base, zIndex: 9999 }) },
    ...(typeof window !== 'undefined' ? { menuPortalTarget: document.body } : {})
  }
  return (
    <>
      { scoredModules.length > 0 && (
        <label className={`block z-40`}>
        { label && <span className="text-sm font-medium text-gray-700">{ label }</span> }
        <Select {...selectProps} />
      </label>
      )}
    </>
  )
}

export default ScoreFromModuleIdsInput