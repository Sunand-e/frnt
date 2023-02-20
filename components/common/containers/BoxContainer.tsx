import { StyledIcon } from '@styled-icons/styled-icon';
interface BoxContainerProps {
  title: string,
  button: {
    text: string
    onClick: any,
  } | null,
  icon: StyledIcon | null,
  children: any
}

const BoxContainer = ({title, button=null, icon: IconComponent=null, children}: BoxContainerProps) => {

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
      <div className="bg-main/20 rounded-t-md flex justify-between items-center px-3 py-2">
        <div className="flex text-main-secondary">
          { IconComponent && <IconComponent className="w-7 mr-2" /> }
          <h3>{title}</h3>
        </div>
        {button && <HeaderButton />}
      </div>
      {children}
    </div>
  )
}

export default BoxContainer
