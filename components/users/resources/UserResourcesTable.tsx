import { useCallback, useContext, useMemo } from "react";
import useGetUser from "../../../hooks/users/useGetUser";
import Table from "../../common/tables/Table";
import { useRouter } from '../../../utils/router';
import ItemWithImage from "../../common/cells/ItemWithImage";
import useEnrolUsersInContent from "../../../hooks/contentItems/useEnrolUsersInContent";
import useUnenrolUserFromContent from "../../../hooks/contentItems/useUnenrolUserFromContent";

const UserResourcesTable = () => {
  
  const router = useRouter()
  const { id } = router.query

  const { loading, error, user } = useGetUser(id)

  const {enrolUsersInContent} = useEnrolUsersInContent()
  const {unenrolUserFromContent} = useUnenrolUserFromContent()

  const handleChangeRole = useCallback((content, role) => {
    if(!user?.id) {
      return false
    }
    enrolUsersInContent({
      userIds: [user.id],
      contentItemIds: [content.node.id],
      roleId: role.id
    })
  }, [user])

  const handleUnenrol = useCallback((content, role) => {
    if(!user?.id) {
      return false
    }
    unenrolUserFromContent({
      userId: user.id,
      contentItemId: content.node.id,
    })
  }, [user])

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return user?.resources.edges.filter(edge => !edge.node._deleted) || []
    },
    [user]
  );
  
  const tableCols = useMemo(() => {
    return [
      {
        header: "Resource",
        accessorFn: row => row.node.title, // accessor is the key in the data
        cell: ({ cell }) => {
          const resource = cell.row.original.node;
          return (
            <ItemWithImage
              title={resource.title}
              image={resource.image}
            />
          )
        }
      },
      // {
      //   header: "Role",
      //   cell: ({ cell }) => {
      //     const content = cell.row.original;
      //     const handleChange = role => handleChangeRole(content, role);
      //     return (
      //       <UserRoleSelectCell onChange={handleChange} cell={cell} roleType={'content_item_role'} />
      //     )
      //   }
      // },
      {
        width: 300,
        id: "Actions",

        cell: ({ cell }) => {
          const values = cell.row.original;
          return (
            <div className="text-right">
              { cell.row.original.groups.edges.length ? (
                <>
                  Enrolled via group:
                  <strong> {cell.row.original.groups.edges.map(edge => edge.node.name).join(', ')}
                  </strong>
                </>
              ) : (
                <a className="text-red-600 hover:text-red-800" href="#" onClick={() => {
                  handleUnenrol(
                    values,
                    null,
                  )
                }}>Unassign resource</a>
              ) }
            </div>
          )
        }
      }
    ]
  }, []);

  return (
    <Table tableData={tableData} tableCols={tableCols} />
  );
}

export default UserResourcesTable