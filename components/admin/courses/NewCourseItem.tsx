const NewCourseItem = ({onClick, IconComponent, label}) => {
  return (
    <div 
    onClick={onClick} 
    className={`hover:bg-main/10 cursor-pointer flex h-10 py-1 space-x-2 text-main-dark items-center`}>
      { IconComponent && <IconComponent className="h-full text-main-dark"/> }
      <span className="text-main-dark">
        {label}
      </span>
    </div>
  )
}

export default NewCourseItem