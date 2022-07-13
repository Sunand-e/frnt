export default function BlockWithTitle({title, children}) {

  return (
    <div className="w-full shadow-lg bg-main-semitransparent mb-8">
      <h3 className="bg-main text-white p-2 px-4">{title}</h3>
      <div className="p-4">
        {children}
      </div>
    </div>
  )

}
