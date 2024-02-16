import { components } from "react-select";
import classNames from "../../../../utils/classNames";

const { Option } = components;

const IconOption = props => {

  const textClassName = classNames(
    props.isDisabled ? '' : 'text-main-secondary',
  )

  return (
    <Option {...props} className={`flex bg-main h-10 py-1 space-x-2 text-main-secondary`}>
    {/* <Option {...props}> */}
      { props.data?.icon && <props.data.icon className="h-full text-main-secondary"/> }
      <span className={textClassName}>
        {props.data.label}
      </span>
    </Option>
  );
}
export default IconOption
