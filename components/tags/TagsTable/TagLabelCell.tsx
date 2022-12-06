import PencilIcon from "@heroicons/react/20/solid/PencilIcon"
import Link from "next/link"

const TagNameCell = ({ cell }) => {

  const href = cell.row.original.id && `/admin/tags/edit?id=${cell.row.original.id}`
  
  return <>
    <Link
      href={href}
      className="mt-auto text-center p-2 text-main-secondary font-semibold">
      {cell.getValue()}
    </Link>
  </>;
}

export default TagNameCell
