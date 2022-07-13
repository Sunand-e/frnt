const NewCourseItem = ({onClick, IconComponent, label}) => {
  return (
    <div 
    onClick={onClick} 
    className={`hover:bg-main/10 cursor-pointer flex h-10 py-1 space-x-2 text-main-secondary items-center`}>
      { IconComponent && <IconComponent className="h-full text-main-secondary"/> }
      <span className="text-main-secondary">
        {label}
      </span>
    </div>
  )
}

export default NewCourseItem
