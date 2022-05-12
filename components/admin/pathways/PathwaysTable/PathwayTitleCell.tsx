import PencilIcon from "@heroicons/react/solid/PencilIcon"
import Link from "next/link"

const PathwayTitleCell = ({ cell }) => {

  const href = cell.row.values.id && `/admin/courses/pathways/edit?id=${cell.row.values.id}`
  
  return (
    <>
      <Link href={href}>
        <a className="mt-auto text-center p-2 text-blue-dark font-semibold">{cell.value}</a>
      </Link>
      <PencilIcon className="cursor-pointer text-blue-dark inline w-5 pb-1" onClick={() => alert('a')} />
    </>
  )
}

export default PathwayTitleCell