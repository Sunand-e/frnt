import { components } from "react-select";

const { Option } = components;

const IconOption = props => (
  <Option {...props} className={`flex bg-main h-10 py-1 space-x-2 text-main-secondary`}>
  {/* <Option {...props}> */}
    { props.data?.icon && <props.data.icon className="h-full text-main-secondary"/> }
    <span className="text-main-secondary">
      {props.data.label}
    </span>
  </Option>
);

export default IconOption
