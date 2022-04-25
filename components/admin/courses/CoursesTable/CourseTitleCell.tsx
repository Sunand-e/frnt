import { PencilIcon } from "@heroicons/react/solid"
import Link from "next/link"
import EasyEdit, {Types} from 'react-easy-edit'
import useCourse from '../../../../hooks/courses/useCourse'
import {Cancel} from '@styled-icons/material-rounded/Cancel'
import {Save} from '@styled-icons/material-rounded/Save'

const CourseTitleCell = ({ cell }) => {

  const href = cell.row.values.id && `/admin/courses/edit?id=${cell.row.values.id}`
  
  const { updateCourse } = useCourse(cell.row.values.id)

  return (
    <>
      {/* <Link href={href}>
        <a className="mt-auto text-center p-2 text-blue-dark font-semibold">{cell.value}</a>
      </Link>
      <PencilIcon className="cursor-pointer text-blue-dark inline w-5 pb-1" onClick={() => alert('a')} /> */}
      <EasyEdit
        type={Types.TEXT}
        onSave={(title) => updateCourse({title})}
        saveButtonLabel={<Save className="w-6"  />}
        cancelButtonLabel={<Cancel className="w-6 text-red-600"  />}
        placeHolder="Section title..."
        attributes={{ name: "awesome-input", id: 1}}
        value= { cell.value }
      />
    </>
  )
}

export default CourseTitleCell