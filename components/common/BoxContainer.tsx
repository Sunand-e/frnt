const BoxContainer = ({title, children}) => {
  return (
    <div className="bg-white shadow-xl rounded-md ">
      <h3 className="bg-main/20 rounded-t-md text-main-dark p-2">{title}</h3>
      {children}
    </div>
  )
}

export default BoxContainer