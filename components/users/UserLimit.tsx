export const UserLimit = ({ tenant=null }) => {

  return (
    tenant?.settings.users?.limit && (
      <div className='flex items-center mb-2'>
        <div>
          {`User Limit remaining: `}
          <span className='font-bold text-xl'>{tenant.settings.users.limit_count - tenant.users.totalCount}</span>
          {` (used: `}<span className='font-bold'>{tenant.users.totalCount}</span>{`)`}
        </div>
      </div>
    )
  )
}