import PencilIcon from "@heroicons/react/solid/PencilIcon"
import Link from "next/link"

const RoleNameCell = ({ cell }) => {

  const href = cell.row.original.id && `/admin/users/roles/edit?id=${cell.row.original.id}`
  
  return (
    <>
      <Link href={href}>
        <a className="mt-auto text-center p-2 text-blue-dark font-semibold">{cell.value}</a>
      </Link>
      <PencilIcon className="cursor-pointer text-blue-dark inline w-5 pb-1" onClick={() => null} />
    </>
  )
}

export default RoleNameCell