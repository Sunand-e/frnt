import { components } from "react-select";

const { Option } = components;

const IconOption = props => (
  <Option {...props} className={`flex bg-main h-10 py-1 space-x-2 text-main-dark`}>
  {/* <Option {...props}> */}
    { props.data?.icon && <props.data.icon className="h-full text-main-dark"/> }
    <span className="text-main-dark">
      {props.data.label}
    </span>
  </Option>
);

export default IconOption