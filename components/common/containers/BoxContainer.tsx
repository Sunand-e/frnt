const BoxContainer = ({title, button, children}) => {

  const HeaderButton = () => {
    return (
      <a 
        href="#" 
        onClick={button?.onClick}
        className={` text-main hover:text-main-secondary`}
      >
        {button?.text}
      </a>
    )
  }

  return (
    <div className="bg-white shadow-xl rounded-md containerClassname">
      <div className="bg-main/20 rounded-t-md flex justify-between items-center px-4 py-2">
        <h3 className="text-main-secondary">{title}</h3>
        {button && <HeaderButton />}
      </div>
      {children}
    </div>
  )
}

export default BoxContainer
