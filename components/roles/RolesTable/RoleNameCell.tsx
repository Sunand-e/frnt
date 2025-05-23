import Link from "next/link"

const RoleNameCell = ({ cell }) => {

  const href = cell.row.original.id && `/admin/users/roles/edit?id=${cell.row.original.id}`
  
  return <>
    <Link
      href={href}
      className="mt-auto text-center p-2 text-main-secondary font-semibold">
      {cell.getValue()}
    </Link>
  </>;
}

export default RoleNameCell
