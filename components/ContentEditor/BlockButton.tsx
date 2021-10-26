const BlockButton = ({type, children}) => {
  return (
    <div className="w-1/2 p-4">
      <div className="flex flex-col p-2 text-center bg-white rounded-lg shadow">
        { children }
      </div>
    </div>
  )
}

export default BlockButton