export default function AdminSidebar({title, children}) {

  return (
    <div className="w-1/5 shadow-lg bg-grey flex-none">
      <div className="p-4">
        {children}
      </div>
    </div>
  )

}
