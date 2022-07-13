import PencilIcon from "@heroicons/react/solid/PencilIcon"
import Link from "next/link"

const LibraryItemTitleCell = ({ cell }) => {

  const href = cell.row.values.id && `/admin/library/edit?id=${cell.row.values.id}`
  
  return (
    <>
      <Link href={href}>
        <a className="mt-auto text-center p-2 text-main-secondary font-semibold">{cell.value}</a>
      </Link>
      <PencilIcon className="cursor-pointer text-main-secondary inline w-5 pb-1" onClick={() => alert('a')} />
    </>
  )
}

export default LibraryItemTitleCell
