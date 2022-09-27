import PencilIcon from "@heroicons/react/solid/PencilIcon"
import Link from "next/link"

const PathwayTitleCell = ({ cell }) => {

  const href = cell.row.values.id && `/admin/pathways/edit?id=${cell.row.values.id}`
  
  return (
    <>
      <Link href={href}>
        <a className="mt-auto text-center p-2 text-main-secondary font-semibold">{cell.value}</a>
      </Link>
    </>
  )
}

export default PathwayTitleCell
