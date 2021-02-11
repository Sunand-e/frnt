export default function Sidebar({children}) {

  return (
    <div className="flex-none flex-col w-3/12 ml-6 shadow-lg bg-main-semitransparent">
      {children}
    </div>
  )

}
